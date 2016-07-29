angular
  .module('jsonapi-manager')
  .factory('jamHistory', jamHistory);


jamHistory.$inject = ['jamStorage', 'jamKeys', 'jamPatch'];
function jamHistory(jamStorage, jamKeys, jamPatch) {
  var service = {
    add: add,
    undo: undo,
    clear: clear
  };
  return service;


  function add(options, data) {
    var storedItem = jamStorage.get(jamKeys.STORED_DATA_PREFIX + options.managerId) || [];
    var date = Date.now();
    storedItem.push({data: data, date: date});
    jamStorage.set(jamKeys.STORED_DATA_PREFIX + options.managerId, storedItem);
    return date;
  }


  function undo(options, date) {
    var removed;
    var storedItem = jamStorage.get(jamKeys.STORED_DATA_PREFIX + options.managerId) || [];
    if (storedItem.length === 0) { return; }

    if (date === undefined) {
      removed = storedItem.splice(storedItem.length - 1, 1)[0];
    } else {
      removed = storedItem.filter(function (item) {
        return item.date === date;
      })[0];
    }
    jamStorage.set(jamKeys.STORED_DATA_PREFIX + options.managerId, storedItem);
    jamPatch.apply(options, removed.data, true);
    options.oldValue = angular.copy(options.data);
  }


  function clear(options) {
    jamStorage.remove(jamKeys.STORED_DATA_PREFIX + options.managerId);
  }
}
