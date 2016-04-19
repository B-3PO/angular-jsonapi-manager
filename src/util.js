angular
  .module('dataManager')
  .factory('dMUtil', dMUtil);



dMUtil.$inject = ['dMStorage', '$dMConstant', '$rootScope'];
function dMUtil(dMStorage, $dMConstant, $rootScope) {
  var performance = window.performance ? angular.bind(window.performance, window.performance.now) : Date.now;
  var slice = Array.prototype.slice;

  var service = {
    now: Date.now, // returns the milliseconds elapsed since 1 January 1970 00:00:00 UTC
    hashString: hashString,
    debounce: debounce,
    getKeys: getKeys,
    getTypeScope: getTypeScope,
    getId: getId,
    addInclude: addInclude,
    getWatcher: getWatcher,
    reversePatch: reversePatch,
    runApply: runApply
  };
  return service;





  function reversePatch(patch) {
    var op = patch.op === 'add' ? 'remove' : patch.op === 'remove' ? 'add' : 'replace';

    if (op === 'remove') {
      return {
        op: op,
        path: patch.path
      };
    } else {
      return {
        op: op,
        path: patch.path,
        value: patch.oldData
      };
    }
  }

  // setup watcher and return killer
  function getWatcher(options) {
    return $rootScope.$watch(
      function () {
        return options.data;
      },
      function (newValue, oldValue) {
        // this avoids the initial fireing of the watcher
        if (newValue === oldValue) {
          return;
        }

        options.debounce(options, newValue);
      }, true);
  }


  function runApply() {
    if ($rootScope.$$pahse === null) {
      $rootScope.apply();
    }
  }



  // Calculate a 32 bit FNV-1a hash and convert it to hex
  function hashString(str, asInt) {
    /*jshint bitwise:false */
    var i = 0;
    var l = str.length;
    var hval = 0x811c9dc5;

    while (i < l) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        i++;
    }


    if (asInt === true) { return hval >>> 0; }

    return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
  }


  function debounce(func, wait) {
    var timer;

    return function debounced () {
      var args = slice.call(arguments);

      clearTimeout(timer);
      timer = setTimeout(function () {
        timer = undefined;
        func.apply(this, args);
      }, wait);
    };
  }



  // gets keys for both obj and arr
  function getKeys(obj) {
    var i;
    var length;
    var keys;
    var hashIndex;

    if (obj instanceof Array) {
      i = 0;
      length = obj.length;
      keys = new Array(length);

      while (i < length) {
          keys[i] = i.toString();
          i++;
      }

      return keys;
    }

    keys = Object.keys(obj);

    hashIndex = keys.indexOf('$$hashKey');
    if (hashIndex > -1) { keys.splice(hashIndex, 1); }

    return keys;
  }




  function getTypeScope(path, type, typescopes) {
    var i = 0;
    var length = typescopes.length;
    path = getTypescopePath(path);

    // try to match path
    while (i < length) {
      if (typescopes[i].map === path) {
        // NOTE do i want to add the type check here
        return typescopes[i];
      }

      i++;
    }

    // if not path match then try by type
    if (type !== undefined) {
      i = 0;
      while (i < length) {
        if (typescopes[i].type === type) {
          return typescopes[i];
        }

        i++;
      }
    }

    return undefined;
  }
  // return path minus the arr ints
  function getTypescopePath(path) {
    return path.split('/').filter(function (item) {
      return isNaN(item);
    }).join('/');
  }




  function getId() {
    var d = Date.now();
    d += performance();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;
  }


  function addInclude(obj, includes) {
    if (includes[obj.typescope.type] === undefined) {
      includes[obj.typescope.type] = [];
    }

    includes[obj.typescope.type].push(obj);
  }
}
