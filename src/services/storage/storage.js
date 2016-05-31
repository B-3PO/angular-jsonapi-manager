angular
  .module('jsonApiManager')
  .service('jamStorage', jamStorage);



jamStorage.$inject = ['$window', 'jamLZString'];
function jamStorage($window, jamLZString) {
  // these are used to parse the dates with the reviever function
  var ISO_REG = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  var MS_AJAX_REG = /^\/Date\((d|-|.*)\)[\/|\\]$/;

  var now = Date.now; // returns the milliseconds elapsed since 1 January 1970 00:00:00 UTC
  var memoryStorage = {};
  var storage = $window.localStorage;
  var isStorageAvailable = testStorage();

  var service = {
    set: set,
    get: get,
    remove: remove
  };
  return service;



  // test if local storage exists
  function testStorage() {
    if (storage === undefined) { return false; }

    try {
      storage.setItem('_jamTest_', 0);
      storage.removeItem('_jamTest_');
      return true;
    } catch (e) {
      return false;
    }
  }


  function set(key, value) {
    memoryStorage[key] = angular.copy(value);

    // store item if enabled
    if (isStorageAvailable === false) { return true; }
    value = jamLZString.compressToUTF16(JSON.stringify(value));

    // store value
    storage.setItem(key, value);

    return true;
  }


  function get(key) {
    var item;

    // gdt from memory
    if (memoryStorage[key] === undefined) {
      if (isStorageAvailable === false) { return undefined; }
      item = storage.getItem(key);
      if (item === null) { return undefined; }

      memoryStorage[key] = JSON.parse(jamLZString.decompressFromUTF16(item), dateParse);
    }

    return angular.copy(memoryStorage[key]);
  }


  function remove(key) {
    memoryStorage[key] = undefined;
    if (isStorageAvailable === true) { storage.removeItem(key); }

    return true;
  }




  // reviver for json parse
  // this function converts dates an sparse arrays
  function dateParse(key, value) {
    var a;
    var b;

    // parse dates
    if (typeof value === 'string') {

      // attemp to parse iso
      a = ISO_REG.exec(value);
      if (a !== null) {
        return new Date(value);
      }

      // attemp to parse ms ajax
      a = MS_AJAX_REG.exec(value);
      if (a !== null) {
        b = a[1].split(/[-+,.]/);
        return new Date(b[0] ? +b[0] : 0 - +b[1]);
      }
    }

    return value;
  }

}
