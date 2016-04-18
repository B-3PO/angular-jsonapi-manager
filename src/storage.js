angular
  .module('dataManager')
  .provider('dMStorage', storageProvider);



// TODO : look into implamenting storage size checking and auto clearing of data when nearing size limit
//        Currently the standard low point is 5mb except android browser 4.3 which is 2mb
//        Look into the need to check for android 4.3 browser and compensate for the size diff



var VALID_STORAGE_TYPES = ['sessionStorage', 'localStorage'];

/**
  * @name dMStorage
  * @module dMStorage
  *
  *
  * @description
  * Get and store data based on key/value
  * timestamps are stored along side the data based on the given key
  * All timestamps set by set currently use Date.now()
  * This is Where other storage methods can be added
  * Currently: localStorage, sessionStorage
  */


function storageProvider() {
  var storageType = 'localStorage';


  var provider = {
    useStorage: true,
    memoryStore: true, // NOTE this should probably not be an option
    setStorageType: setStorageType,
    $get: ['$window', 'dMLZString', '$dMConstant', storageService]
  };
  return provider;


  /**
   * @name setStorageType
   * @function
   *
   * @description
   * Set storage type
   *
   * @param {string} type - ['localStorage', 'sessionStorage']
   */
  function setStorageType(type) {
    if (VALID_STORAGE_TYPES.indexOf(type) === -1) {
      throw new Error('dMStorage Type: "' + type + '" is not valid. Please use ' + VALID_STORAGE_TYPES.join(' , '));
    }

    storageType = type;
  }




  // --- Service ----------------------------------
  // -----------------------------------------------

  function storageService($window, dMLZString, $dMConstant) {
    // these are used to parse the dates with the reviever function
    var ISO_REG = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    var MS_AJAX_REG = /^\/Date\((d|-|.*)\)[\/|\\]$/;

    var now = Date.now; // returns the milliseconds elapsed since 1 January 1970 00:00:00 UTC
    var storage = $window[storageType];

    var storageSizes;
    var memoryUsed = 0;
    var memoryStorage = {};
    var useMemory = provider.memoryStore;
    var useStorage = testStorage() === true ? provider.useStorage : false;

    // TODO : look into relevence of android browser localstorage size being 2mb. May need to check for that
    var MEMORY_LIMIT = $dMConstant.MEMORY_LIMIT; // KB. This is based on current browser settings
    var FOOT_PRINT_ID = $dMConstant.FOOT_PRINT_ID;
    var TIMESTAMPS_ID = $dMConstant.TIMESTAMPS_ID;
    var STORAGE_SIZE_KEY = $dMConstant.STORAGE_SIZE_KEY;


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
        storage.setItem('_dMTest_', 0);
        storage.removeItem('_dMTest_');
        return true;
      } catch (e) {
        return false;
      }
    }





    /**
     * @name set
     * @function
     *
     * @description
     * add item to storage
     *
     * @param {string} key
     * @param {any} value
     *
     * @return {boolean} - if item was stored
     */
    function set(key, value) {
      if (useMemory === true) { memoryStorage[key] = angular.copy(value); }

      // store item if enabled
      if (useStorage === false) { return true; }
      value = dMLZString.compressToUTF16(JSON.stringify(value));

      // check/set storage
      editStorageSize(function (_storageSizes) {
        _storageSizes[key] = getUTF16Size(value);
      });

      // store value
      storage.setItem(key, value);

      return true;
    }



    /**
     * @name get
     * @function
     *
     * @description
     * get item from storage
     *
     * @param {string} key
     *
     * @return {object} - if item is not found or the passes in timestamp is greater than the stored one return undefined
     */
    function get(key) {
      var item;

      // gdt from memory
      if (useMemory === true) {
        if (memoryStorage[key] === undefined) {
          item = storage.getItem(key);
          if (item === null) { return undefined; }

          memoryStorage[key] = JSON.parse(dMLZString.decompressFromUTF16(item), dateParse);
        }

        return angular.copy(memoryStorage[key]);
      }

      if (useStorage === false) { return undefined; }

      // if no item exists a null is returned
      item = storage.getItem(key);
      if (item === null) { return undefined; }

      return JSON.parse(dMLZString.decompressFromUTF16(item), dateParse);
    }



    /**
     * @name remove
     * @function
     *
     * @description
     * remove item from storage
     *
     * @param {string} key
     *
     * @return {boolean} - returns false if item is not removed because of timestamp
     */
    function remove(key) {
      if (useMemory === true) { memoryStorage[key] = undefined; }
      if (useStorage === true) { storage.removeItem(key); }

      editStorageSize(function (_storageSizes) {
        _storageSizes[key] = '';
      });

      return true;
    }











    // --- Private -----------------------------
    // -----------------------------------------


    function editStorageSize(callback) {
      // get
      getStorageSize();

      // allow modify in callback
      callback(storageSizes);

      // calculate size and store
      calculateTotalSize();
      storage.setItem(STORAGE_SIZE_KEY, dMLZString.compressToUTF16(JSON.stringify(storageSizes)));
    }

    function calculateTotalSize() {
      var i;
      var keys;
      var length;

      memoryUsed = 0;

      if (storageSizes === undefined) { return; }

      keys = Object.keys(storageSizes);
      i = 0;
      length = keys.length || 0;

      while (i < length) {
        memoryUsed += storageSizes[keys[i]];
        i++;
      }


      if ((memoryUsed / 1024) > MEMORY_LIMIT) {
        // TODO Figure out what to do when memeory limit is reached
      }

      // console.log('Memory in KB', (memoryUsed / 1024));  // KB
    }



    function getStorageSize() {
      if (storageSizes === undefined) {
        storageSizes = storage.getItem(STORAGE_SIZE_KEY);
        if (storageSizes !== null) { storageSizes = JSON.parse(dMLZString.decompressFromUTF16(storageSizes)); }
        else storageSizes = {};
      }
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


    // used to calculate size of compressed lz-string
    function getUTF16Size(string) {
      var c;
      var kilobyte = 1024;
      var n = 0;
      var length = string.length;
      var utf16length = 0;

      while (n < length) {
        c = string.charCodeAt(n);
        n++;

        if (c < 128) {
          utf16length += 2;
        } else if ((c > 127) && (c < 2048)) {
          utf16length += 2;
        } else {
          utf16length += 3;
        }
      }

      return utf16length;

      // console.log(utf16length); // bytes
      // console.log((utf16length / kilobyte));  // KB
    }

  }

}
