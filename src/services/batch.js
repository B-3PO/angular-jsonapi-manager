angular
  .module('jsonapi-manager')
  .factory('jamBatch', jamBatch);


jamBatch.$inject = ['$q', 'jamPatch', 'jamRequest', 'jamHistory'];
function jamBatch($q, jamPatch, jamRequest, jamHistory) {
  var current;
  var queue = [];

  var service = {
    add: add
  };
  return service;


  function add(options, callback) {
    var patches = jamPatch.diff(options);
    if (patches.length === 0) { return; }
    var historyID = jamHistory.add(options, patches);
    options.oldValue = angular.copy(options.data);
    queue.push({
      complete: false,
      running: false,
      historyID: historyID,
      patches: patches,
      options: options,
      callback: callback
    });
    nextBatchItem();
  }


  // run next batch
  function nextBatchItem() {
    // when no current patch exists or the current batch is complete then fire the next batch if one exists
    if ((current === undefined || current.complete === true) && queue.length > 0) {
      runBatchItem(queue.shift());
    }
  }

  function runBatchItem(item) {
    item.running = true;
    runRequests(item.patches, function (error) {
      if (error === true) {
        console.error('One or more calls failed in a batch. All data has been reverted starting at the fail point and batches waiting have been discarded');
        rollback(item, function () {
          // TODO centralize errros
          item.callback({
            code: 3,
            message: 'There was an error processing your batch. Your changes have been reverted'
          });
          queue = [];
        });
        return;
      }


      item.complete = true;
      item.callback();
      nextBatchItem();
    });
  }



  function runRequests(items, callback) {
    // you have succefeully made it thorugh all requests in batch
    if (items.length === 0) {
      callback(undefined);
      return;
    }

    var callFail = false;
    var promises = [];
    var precedence = items[0].precedence;

    // call all items of the loswest precedence
    items.filter(function (item) {
      return item.precedence === precedence;
    }).forEach(function (patch) {
      promises.push(jamRequest.sendBatchItem(patch).then(function (response) {
        patch.success = true;
      }, function (error) {
        callFail = true;
        patch.success = false;
      }));
    });


    $q.all(promises).then(function () {
      if (callFail === true) {
        callback(true);
        return;
      }

      // run next set of calls with a heigher precedence
      runRequests(items.filter(function (item) {
        return item.precedence > precedence;
      }), callback);
    });
  }


  function rollback(item, callback) {
    // TODO rollback data, including any waiting batches
    jamHistory.undo(item.options, item.historyID);

    runRequests(reversePatches(item.patches), function () {
      item.complete = true;
      callback();
      nextBatchItem();
    });
  }


  // reverse patches and filter out any patches that did not succesfully call to the server
  function reversePatches(patches) {
    var newPatches = [];
    patches.filter(function (patch) {
      return patch.success === true;
    }).forEach(function (patch) {
      var newPatch = {
        op: patch.op,
        path: patch.path,
        precedence: patch.precedence,
      };

      if (patch.op === 'add' || patch.op === 'update') {
        newPatch.resource = {
          id: patch.resource.id,
          type: patch.resource.type
        };
        if (patch.op === 'add') { newPatch.op = 'delete'; }
        if (patch.op === 'update' && Object.keys(patch.resource.oldAttributes).length) {
          newPatch.resource.attributes = patch.resource.oldAttributes;
        }

        if (Object.keys(patch.resource.relationships).length) {
          newPatches.push({
            op: 'delete-relationship',
            path: patch.path,
            precedence: 0,
            resource: {
              relationships: patch.resource.relationships
            }
          });
        }

      } else if (patch.op === 'delete') {
        newPatch.op = 'add';
        newPatch.resource = patch.resource;
      } else if (patch.op === 'delete-relationship') {
        newPatch.op = 'update';
        newPatch.resource = patch.resource;
      }

      newPatches.push(newPatch);
    });
    return newPatches;
  }
}
