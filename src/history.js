angular
  .module('dataManager')
  .factory('dMHistory', dMHistory);


dMHistory.$inject = ['dMStorage', '$dMConstant', 'dMUtil', 'dMJSONPatch'];
function dMHistory(dMStorage, $dMConstant, dMUtil, dMJSONPatch) {
  var service = {
    add: add,
    undo: undo,
    clear: clear,
    updateVersionDate: updateVersionDate
  };
  return service;


  function add(id, data) {
    var storedItem = dMStorage.get($dMConstant.STORED_DATA_PREFIX + id) || [];
    var date = dMUtil.now();

    storedItem.push({data: data, date: date});
    dMStorage.set($dMConstant.STORED_DATA_PREFIX + id, storedItem);

    return date;
  }


  function undo(options, date) {
    // extract patches
    var removed = undoHistory(options.urlId, date).map(function (item) {
      return item.data;

    // flatten patches
    }).reduce(function (arr, item) {
      return arr.concat(item);

    // reverse patches
    }).map(function (item) {
      return dMUtil.reversePatch(item);

    // reverse patch order
    }).reverse();

    // app,y patched and set oldvalue
    dMJSONPatch.apply(options.data, removed);
    options.oldValue = angular.copy(options.data);
  }



  // remove item from history based on date
  function undoHistory(id, date) {
    var removed = [];
    var storedItem = dMStorage.get($dMConstant.STORED_DATA_PREFIX + id) || [];

    if (storedItem.length === 0) { return; }

    // NOTE Should i mark items for undo instead of removing them? The benefit of removing it is memory conservation.
    //      the problem with removing items is not being able to redo
    if (date === undefined) {
      removed = storedItem.splice(storedItem.length - 1, 1);
    } else {
      storedItem = storedItem.filter(function (item) {
        if (item.date === date) {
          removed.push(item);
          return false;
        } else { return true; }
      });
    }

    dMStorage.set($dMConstant.STORED_DATA_PREFIX + id, storedItem);
    return removed;
  }



  function clear(id) {
    dMStorage.remove($dMConstant.STORED_DATA_PREFIX + id);
  }




  // update the date on the last version object
  function updateVersionDate(id, date) {
    var versionKeyData = dMStorage.get($dMConstant.VERSION_KEY) || {};
    if (versionKeyData[id] === undefined) {
      versionKeyData[id] = [];
    }

    var version = versionKeyData[id];

    if (version.length === 0) { return; }

    if (date === undefined) {
      version[version.length - 1].date = dMUtil.now();
    } else {
      version[version.length - 1].date = date;
    }
    dMStorage.set($dMConstant.VERSION_KEY, versionKeyData);
  }
}
