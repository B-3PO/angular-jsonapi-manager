angular
  .module('jsonapi-manager')
  .factory('jamBatch', jamBatch);


jamBatch.$inject = ['jamPatch'];
function jamBatch(jamPatch) {
  var current;
  var queue = [];


  var service = {
    add: add
  };
  return service;




  function add(options, callback) {
    var patches = jamPatch.diff(options);
    if (patches.length === 0) { return; }

    // TODO create precedence based on resouce relationships

    options.oldValue = angular.copy(options.data);
    queue.push({
      complete: false,
      running: false,
      patches: patches,
      options: options,
      callback: callback
    });
    nextBatch();
  }


  // run next batch
  function nextBatch() {
    // when no current patch exists or the current batch is complete then fire the next batch if one exists
    if ((current === undefined || current.complete === true) && queue.length > 0) {
      runBatchItem(queue.shift());
    }
  }

  function runBatchItem(item) {
    item.running = true;
    runRequests(item.patches, callback)
  }



  function runRequests(items, callback) {
    // you have succefeully made it thorugh all requests in batch
    if (items.length === 0) {
      callback(undefined);
      return;
    }
  }
}
