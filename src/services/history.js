angular
  .module('jsonApiManager')
  .factory('jamHistory', jamHistory);


jamHistory.$inject = ['jamUtil', 'jamStorage', 'jamKeys', 'jamPatch'];
function jamHistory(jamUtil, jamStorage, jamKeys, jamPatch) {
  var service = {
    add: add,
    undo: undo,
    clear: clear,
    clearVersions: clearVersions,
    getVersion: getVersion,
    newVersion: newVersion,
    updateVersion: updateVersion,
    rollbackToVersion: rollbackToVersion
  };
  return service;


  function add(id, data) {
    var storedItem = jamStorage.get(jamKeys.STORED_DATA_PREFIX + id) || [];
    var date = jamUtil.now();

    storedItem.push({data: data, date: date});
    jamStorage.set(jamKeys.STORED_DATA_PREFIX + id, storedItem);

    return date;
  }



  // clear all previos version data for given manager id
  // this should onyl be run if new info is going to be retrived from the server
  // a new version should be created after this
  function clearVersions(id) {
    jamStorage.remove(jamKeys.VERSION_KEY + id);
  }

  // return last version
  function getVersion(id) {
    var versionData = jamStorage.get(jamKeys.VERSION_KEY + id);
    return versionData ? versionData[versionData.length - 1] : undefined;
  }

  // create and add new version
  function newVersion(id) {
    var versionData = jamStorage.get(jamKeys.VERSION_KEY + id) || [];
    var version = {
      date: jamUtil.now(),
      cb: jamUtil.now()
    };
    versionData.push(version);
    jamStorage.set(jamKeys.VERSION_KEY + id, versionData);
    return version;
  }


  // TODO may want to add another on update so it will be easier to rollback to previus caches
  // find last verion and update its cache buster
  // ypu can also pass in a specific date
  function updateVersion(id, date) {
    var version;
    var versionData = jamStorage.get(jamKeys.VERSION_KEY + id) || [];
    date = date || versionData[versionData.length - 1].date;

    versionData.every(function (item) {
      if (item.data === date) {
        item.date = jamUtil.now();
        version = item;
        return false;
      }
      return true;
    });

    jamStorage.set(jamKeys.VERSION_KEY + id, versionData);
    return version;
  }

  // romove all versions after a certain date
  function rollbackToVersion(id, date) {
    var versionData = jamStorage.get(jamKeys.VERSION_KEY + id) || [];

    // filter out any version greater the set one
    versionData = versionData.filter(function (item) {
      return parseInt(item.date) <= parseInt(date);
    });

    jamStorage.set(jamKeys.VERSION_KEY + id, versionData);
    return versionData[versionData.length - 1];
  }



  function undo(options, date) {
    // extract patches
    var removed = undoHistory(options.managerId, date).map(function (item) {
      return item.data;

    // flatten patches
    }).reduce(function (arr, item) {
      return arr.concat(item);

    // reverse patches
    }).map(function (item) {
      return jamUtil.reversePatch(item);

    // reverse patch order
    }).reverse();
    // apply patched and set oldvalue
    jamPatch.apply(options.data, removed);
    jamUtils.removeIncludes(removed, options.included);
    options.oldValue = angular.copy(options.data);
  }



  // remove item from history based on date
  function undoHistory(id, date) {
    var removed = [];
    var storedItem = jamStorage.get(jamKeys.STORED_DATA_PREFIX + id) || [];

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

    jamStorage.set(jamKeys.STORED_DATA_PREFIX + id, storedItem);
    return removed;
  }



  function clear(id) {
    jamStorage.remove(jamKeys.STORED_DATA_PREFIX + id);
  }
}
