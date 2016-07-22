angular
  .module('jsonApiManager')
  .factory('jamBatch', jamBatch);


jamBatch.$inject = ['jamPatch', 'jamUtil', 'jamRequest', 'jamHistory'];
function jamBatch(jamPatch, jamUtil, jamRequest, jamHistory) {
  var defineProperty = Object.defineProperty;
  var current;
  var queue = [];
  var opFormaters = {
    add: formatAdd,
    remove: formatRemove,
    replace: formatReplace
  };

  var service = {
    add: add
  };
  return service;


  function add(options, callback) {
    var patches = jamPatch.diff(options);
    if (patches.length === 0) { return; }

    var batchItems = patches.reduce(function (arr, patch) {
      var item = opFormaters[patch.op](patch, options);

      if (typeof item === 'object' && item !== null) {
        return arr.concat(item);
      }
    }, []);

    // removed dups created because of memeory referenced values
    removeDuplicates(batchItems);

    // remove refernces to values
    // these are used to create the batch items and are no longer needed
    patches.forEach(function (item) {
      delete item.valueReference;
    });

    var historyID = jamHistory.add(options.managerId, patches);
    var preVersion = jamHistory.getVersion(options.managerId);
    jamHistory.updateVersion(options.managerId);
    options.oldValue = angular.copy(options.data);

    queue.push({
      complete: false,
      running: false,
      batchItems: batchItems,
      patches: patches,
      historyID: historyID,
      previousVersion: preVersion,
      options: options,
      callback: callback
    });
    nextBatch();
  }



  // run next batch
  function nextBatch() {
    // when no current patch exists or the current batch is complete then fire the next batch if one exists
    if ((current === undefined || current.complete === true) && queue.length > 0) {
      runBatch(queue.shift());
    }
  }


  function runBatch(batch) {
    batch.running = true;

    // sort precedence form smallest to largest
    batch.batchItems.sort(function (a, b) {
      return a.precedence - b.precedence;
    });

    runRequests(batch.batchItems, false, function (error) {
      if (error !== undefined) {
        rollback(batch);

        batch.callback({
          code: 3,
          message: 'There was an error processing your batch. Your changes are being reverted',
          httpError: error
        });
        return;
      }

      batch.complete = true;
      batch.callback();
      nextBatch();
    });
  }


  function runRequests(items, reverse, callback) {
    // you have succefeully made it thorugh all requests in batch
    if (items.length === 0) {
      callback(undefined);
      return;
    }

    var errors = [];
    var rollback = false;
    var callcount = 0;
    var counted = 0;
    var precedence = items[0].precedence;

    items.filter(function (item) {
      return item.precedence === precedence;
    }).forEach(function (item) {
      callcount += 1;

      jamRequest.sendBatchItem(item, reverse, function (error, response) {
        if (error !== undefined) {
          rollback = true;
          item.success = false;
          errors.push(error);
        } else { item.success = true; }

        counted += 1;
        if (callcount === counted) {
          // roll back if any call encounters an error
          // NOTE currently no error will be promoted if a call fails on call reversal
          if (reverse === false && rollback === true) {
            callback(errors);
            return;
          }


          // call self and and pass array with only higher priorites
          runRequests(items.filter(function (item) {
            if (reverse === true) {
              return item.precedence < precedence;
            } else {
              return item.precedence > precedence;
            }
          }), reverse, callback);
        }
      });
    });
  }



  // --- Rollback Batch and remove -----
  function rollback(batch) {
    var revertItems = batch.batchItems.filter(function (item) {
      if (item.success === true) {
        return true;
      }
      return false;
    });

    // sort precedence form largest to smallest
    revertItems.sort(function (a, b) {
      return b.precedence - a.precedence;
    });

    runRequests(revertItems, true, function () {
      jamHistory.undo(batch.options, batch.historyID);
      batch.complete = true;
      nextBatch();
    });
  }







  function formatAdd(patch, options) {
    var value;
    var request = [];
    var typescope = jamUtil.getTypeScope(patch.path, patch.type, options.typescopes);

    if (patch.type === undefined || patch.newItem === true) {
      patch.type = typescope.type;
      patch.newItem = true;

      // generate id if none exists
      if (patch.value.id === undefined) { patch.value.id = jamUtil.getId(); }

      // NOTE if the item was created then we need to add a typescope to it
      if (patch.valueReference !== undefined) {
        if (patch.valueReference.id === undefined) { patch.valueReference.id = patch.value.id; }

        // add the typescope
        defineProperty(patch.valueReference, 'typescope', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: typescope
        });
      }

      // set relationships that are toMany(array) as empty arrays
      jamUtil.defaultRelationships(patch.valueReference, patch.valueReference.typescope.relationships);

      // if the item created is not the top layer then add it to the includes
      if (typescope.type !== options.typescopes[0].type) { addInclude(patch.valueReference, options.included); }
    }


    // create value object or assign property
    // patch.singleResource is added if an object is replaced
    if (patch.prop === undefined || patch.singleResource === true) {
      value = patch.value;
    } else {
      value = {};
      value[patch.prop] = patch.value;
    }

    // if item is child of a typescope then treat is as a relationship

    /**
      * TODO figure out how to handle not calling the relationship on add, this setup seems to work
      * NOTE cases to add relationship calls
      * - new item and no constraint
      * - existing item that is toMany(should disallow this)
      * - check for parent id existance(no parent id will exist for top layer object)
      */

    if (patch.parentId !== undefined && typescope.constraint === undefined) {
      request.push({
        op: 'relationship',
        url: typescope.parentScope.url + '/' + patch.parentId + '/relationships/' + typescope.url,
        toMany: typescope.toMany || false,
        data: {
          type: typescope.type,
          id: value.id
        },
        oldData: {
          type: typescope.type,
          id: value.id
        },
        // NOTE set at 1000 with the assumption there will not be scopping that deep
        precedence: 1000 // 1000 for update calls. smallest first
      });
    }


    // create add request
    if (patch.newItem === true) {
      request.push({
        op: 'add',
        url: typescope.url + '/' + value.id,
        type: typescope.type,
        data: value,
        parentId: patch.parentId,
        constraint: typescope.constraint,
        precedence: getPrecedence(typescope, 0) // precedence for add calls. smallest first
      });
    }

    return request;
  }


  function formatRemove(patch, options) {
    var request = [];
    var typescope = jamUtil.getTypeScope(patch.path, patch.type, options.typescopes);


    // TODO figure out casses to send a remove relation request
    // if item is child of a typescope then treat is as a relationship
    if (patch.parentId !== undefined && typescope.constraint === undefined && typescope.toMany === true) {
      request.push({
        op: 'removeRelationship',
        url: typescope.parentScope.url + '/' + patch.parentId + '/relationships/' + typescope.prop + '/' + patch.id,
        data: {
          type: typescope.type,
          id: patch.id
        },
        oldData: {
          type: typescope.type,
          id: patch.id
        },
        // NOTE set at 1000 with the assumption there will not be scopping that deep
        precedence: 1000 // 1000 for update calls. smallest first
      });
    }

    request.push({
      op: 'remove',
      url: typescope.urls + '/' + patch.id,
      oldData: angular.copy(patch.oldData),
      parentId: patch.parentId,
      constraint: typescope.constraint,
      precedence: getPrecedence(typescope, 0) // precedence for add calls. smallest first
    });

    return request;
  }


  function formatReplace(patch, options) {
    var value;
    var oldData;
    var typescope = jamUtil.getTypeScope(patch.path, patch.type, options.typescopes);

    // TODO create better path for single object creation
    // if no typscope exists then we assume the abject is new and will create a add request insteat
    // the case where this will not apply is when adding an existing obj to a new relation
    if (patch.type === undefined && typescope !== undefined) {
      patch.type = typescope.type;
      patch.newItem = true;
      patch.singleResource = true;
      patch.parentId = patch.id;
      return getAddRequest(patch, options);
    }


    // get value as object
    if (patch.prop === undefined || patch.prop === '') {
      value = angular.copy(patch.value);
      oldData = angular.copy(patch.oldData);

    // get value as property
    } else {
      value = {};
      value[patch.prop] = patch.value;
      oldData = {};
      oldData[patch.prop] = patch.oldData;
    }

    // add id to value object
    value.id = patch.id;
    oldData.id = patch.id;

    return {
      op: 'replace',
      url: typescope.url + '/' + patch.id,
      type: patch.type,
      data: value,
      oldData: oldData,
      precedence: 1000 // 1000 for update calls. smallest first
    };
  }





  function addInclude(obj, includes) {
    if (includes[obj.typescope.type] === undefined) {
      includes[obj.typescope.type] = [];
    }

    includes[obj.typescope.type].push(obj);
  }



  // Get precedence based on typescopes
  function getPrecedence(typescope, count) {
    if (typescope === undefined) { return count; }
    var parent = typescope.parentScope;

    while (parent !== undefined) {
      count += 1;
      parent = getScopeParent(parent);
    }

    return count;
  }

  function getScopeParent(typescope) {
    return typescope.parentScope;
  }



  // remove duplicated from request objects
  // duplicates are created because of the object memeory reference
  function removeDuplicates(arr) {
    var i = 1;
    var length = arr.length;

    // sort array on url first and op second
    arr.sort(function (a, b) {
      if (a.url < b.url) { return -1; }
      if (a.url > b.url) { return 1; }
      if (a.op < b.op) { return -1; }
      if (a.op > b.op) { return 1; }
      return 0;
    });

    // remove dups
    while (i < length) {
      if (angular.equals(arr[i-1], arr[i]) === true) {
        arr.splice(i, 1);
      } else {
        i += 1;
      }
    }
  }
}
