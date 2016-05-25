angular
  .module('jsonapiManager')
  .factory('dMBatch', batchService);


batchService.$inject = ['dMJSONPatch', 'dMHistory', 'dMUtil', 'dMRequester'];
function batchService(dMJSONPatch, dMHistory, dMUtil, dMRequester) {
  var defineProperty = Object.defineProperty;

  var current;
  var queue = [];
  var opRequests = {
    add: getAddRequest,
    remove: getRemoveRequest,
    replace: getReplaceRequest
  };




  var service = {
    add: add
  };
  return service;



  function add(options, newValue) {
    var i;
    var length;
    var diff;
    var historyID;
    var patches;
    var updateView = false;
    var requestObjects = [];

    var diffs = dMJSONPatch.diff(options.oldValue, newValue, options.objectId);
    if (diffs.length === 0) { return; }


    i = 0;
    length = diffs.length || 0;

    // get all needed info to create requests
    while (i < length) {
      diff = diffs[i];
      i++;

      // if items are added, update view
      // NOTE This check can go deeper into the patch and see if the item is new or just being added
      // TODO listen to the not above
      if (updateView === false && diff.op === 'add' || (diff.op === 'replace' && diff.type === undefined)) { updateView = true; }
      // TODO  Create a reverse request along side the requests
      requestObjects = requestObjects.concat(opRequests[diff.op](diff, options.typescopes));

      // add to included if it is a new obj that is beign added
      if (diff.op === 'add' && diff.type !== undefined && diff.valueReference.typescope.parentScope !== undefined) {
        dMUtil.addInclude(diff.valueReference, options.included);
      }
    }

    removeDuplicates(requestObjects);


    diffs.forEach(function (item) {
      delete item.valueReference;
    });

    historyID = dMHistory.add(options.urlId, diffs);
    dMHistory.updateVersionDate(options.urlId);
    options.oldValue = angular.copy(newValue);


    queue.push({
      complete: false,
      running: false,
      requests: requestObjects,
      patches: diffs,
      historyID: historyID,
      requestModifiers: options.requestModifiers,
      options: options
    });
    next();

    return updateView;
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





  // run next batch
  function next() {
    // when no current patch exists or the current batch is complete then fire the next batch if one exists
    if ((current === undefined || current.complete === true) && queue.length > 0) {
      runBatch(queue.shift());
    }
  }

  function runBatch(batchItem) {
    batchItem.running = true;

    // sort precedence form smallest to largest
    batchItem.requests.sort(function (a, b) {
      return a.precedence - b.precedence;
    });

    runRequests(batchItem.requests, batchItem.requestModifiers, false, function (error) {
      if (error !== undefined) {
        if (typeof batchItem.options.error === 'function') {
          batchItem.options.error('Error applying changes, data was reverted');
        }
        rollback(batchItem);
        return;
      }

      // TODO mark stored batch as complete. this will be used for offline mode
      batchItem.complete = true;
      next();
    });
  }



  // recursive function that will run untill all request have been made or a call errors
  // the function will callback when done/error
  function runRequests(requests, requestModifiers, reverseItems, callback) {
    var precedence;
    var rollback = false;
    var callcount = 0;
    var counted = 0;

    // you have succefeully made it thorugh all requests in batch
    if (requests.length === 0) {
      callback();
      return;
    }


    precedence = requests[0].precedence;

    requests.filter(function (item) {
      return item.precedence === precedence;
    }).forEach(function (item) {
      callcount += 1;

      dMRequester.send(item, requestModifiers, reverseItems, function (error) {
        if (error !== undefined) {
          rollback = true;
          item.success = false;
        } else { item.success = true; }


        counted += 1;
        if (callcount === counted) {

          // roll back if any call encounters an error
          // NOTE currently no error will be promoted if the process is a rollback(reverseItems)
          if (reverseItems === false && rollback === true) {
            callback(true);
            return;
          }

          // call self and and pass array with only higher priorites
          runRequests(requests.filter(function (item) {
            if (reverseItems === true) {
              return item.precedence < precedence;
            } else {
              return item.precedence > precedence;
            }
          }), requestModifiers, reverseItems, callback);
        }
      });
    });
  }




  // --- Rollback Batch and remove -----
  function rollback(batch) {
    var revertRequests = batch.requests.filter(function (item) {
      if (item.success === true) {
        return true;
      }
      return false;
    });

    // sort precedence form largest to smallest
    revertRequests.sort(function (a, b) {
      return b.precedence - a.precedence;
    });

    runRequests(revertRequests, batch.requestModifiers, true, function () {
      // figure out hoe to revert data. A. rebuild B. remove/update/add
      dMHistory.undo(batch.options, batch.historyID);
      batch.complete = true;
      next();
    });
  }






  // --- Get Add Request ---
  function getAddRequest(diff, typescopes) {
    var createUrl;
    var removeUrl;
    var updateUrl;
    var value;
    var typescope;
    var request = [];


    typescope = dMUtil.getTypeScope(diff.path, diff.type, typescopes);
    if (diff.type === undefined || diff.newItem === true) {
      diff.type = typescope.type;

      // tell request to make an add call along side the relationship calls
      diff.newItem = true;

      // create an id if none exists. this is for newly created items vs items added from current types
      if (diff.value.id === undefined) {
        diff.value.id = dMUtil.getId();
      }

      // if a reference value exists add the typescope
      // there will be a reference value if item is added from memeory
      // NOTE there will be NO reference value if the item is added when data is built from storage. This case will be specific to offline mode
      if (diff.valueReference !== undefined) {
        if (diff.valueReference.id === undefined) { diff.valueReference.id = diff.value.id; }

        // add the typescope
        defineProperty(diff.valueReference, 'typescope', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: typescope
        });
      }
    }


    // create value object
    if (diff.prop === undefined || diff.singleResource === true) {
      value = diff.value;
    } else {
      value = {};
      value[diff.prop] = diff.value;
    }

    // pull url
    if (typescope.parentScope !== undefined) {
      updateUrl = typescope.parentScope.urls.updateUrl || typescope.parentScope.urls.url;
    } else {
      updateUrl = typescope.urls.updateUrl || typescope.urls.url;
    }
    createUrl = typescope.urls.createUrl || typescope.urls.url;
    removeUrl = typescope.urls.removeUrl || typescope.urls.url;



    // if item is child of a typescope then treat is as a relationship
    if (diff.parentId !== undefined) {
      updateUrl += '/' + diff.parentId + '/relationships/' + typescope.prop;

      request.push({
        op: 'relationship', // relationship is a type of update
        url: updateUrl,
        data: {
          type: typescope.type,
          id: value.id
        },
        oldData: {
          type: typescope.type,
          id: value.id
        },
        many: typescope.parentRelationshipMany,
        // NOTE set at 1000 with the assumption there will not be scopping that deep
        precedence: 1000 // 1000 for update calls. smallest first
      });
    }

    // create add request
    if (diff.newItem === true) {
      request.push({
        op: 'add',
        url: createUrl + '/' + value.id,
        type: typescope.type,
        data: value,
        precedence: getPrecedence(typescope, 0) // precedence for add calls. smallest first
      });
    }

    return request;
  }



  // --- Get Remove Request ---
  function getRemoveRequest(diff, typescopes) {
    var typescope = dMUtil.getTypeScope(diff.path, diff.type, typescopes);


    // if item is child of a typescope then treat is as a relationship
    if (diff.parentId !== undefined) {
      return {
        op: 'removeRelationship', // removeRelationship is a type of delete
        url: (typescope.parentScope.urls.deleteUrl || typescope.parentScope.urls.url) + '/' + diff.parentId + '/relationships/' + typescope.prop + '/' + diff.id,
        data: {
          type: typescope.type,
          id: diff.id
        },
        oldData: {
          type: typescope.type,
          id: diff.id
        },
        many: typescope.parentRelationshipMany,
        // NOTE set at 1000 with the assumption there will not be scopping that deep
        precedence: 1000 // 1000 for update calls. smallest first
      };

    } else {

      return {
        op: 'remove',
        url: (typescope.urls.deleteUrl || typescope.urls.url) + '/' + diff.id,
        oldData: angular.copy(diff.oldData),
        parentId: diff.parentId,
        precedence: getPrecedence(typescope, 0) // precedence for add calls. smallest first
      };
    }
  }


  // --- Get Replace Request ---
  function getReplaceRequest(diff, typescopes) {
    var value;
    var oldData;
    var typescope = dMUtil.getTypeScope(diff.path, diff.type, typescopes);
    var updateUrl = (typescope.urls.updateUrl || typescope.urls.url) + '/' + diff.id;

    // TODO create better path for single object creation
    if (diff.type === undefined && typescope !== undefined) {
      diff.type = typescope.type;
      diff.newItem = true;
      diff.singleResource = true;
      diff.parentId = diff.id;
      return getAddRequest(diff, typescopes);
    }


    // get value as object
    if (diff.prop === '') {
      value = angular.copy(diff.value);
      oldData = angular.copy(diff.oldData);

    // get value as property
    } else {
      value = {};
      value[diff.prop] = diff.value;
      oldData = {};
      oldData[diff.prop] = diff.oldData;
    }

    // add id tp value object
    value.id = diff.id;
    oldData.id = diff.id;


    return {
      op: 'update',
      url: updateUrl,
      type: diff.type,
      data: value,
      oldData: oldData,
      precedence: 1000 // 1000 for update calls. smallest first
    };
  }





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
}
