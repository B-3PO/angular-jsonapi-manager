/**
  * @ngdoc module
  * @name Manager
  * @description
  * Object returned when you call created
  */
angular
  .module('jsonApiManager')
  .factory('jamManager', jamManager);


jamManager.$inject =['jamHandshaker', 'jamRequest', 'jamUtil', 'jamJsonApi', 'jamStorage', 'jamKeys', 'jamBatch', 'jamHistory', 'jamPatch'];
function jamManager(jamHandshaker, jamRequest, jamUtil, jamJsonApi, jamStorage, jamKeys, jamBatch, jamHistory, jamPatch) {
  var service = {
    create: create
  };
  return service;



  function create(options, errorCallback) {
    var manager = constructManager(options);

    // maek handshake with server and get structure data to build typescopes
    jamHandshaker.synchronize(options, function (error) {
      if (error !== undefined) {
        errorCallback(error);
        options.errored = true;
        return;
      }

      options.ready = true;
      manager.$$init();
    });

    return manager;
  }


  function constructManager(options) {
    var inited = false;
    var waitingToGet = false;
    var dataRetrieved = false;
    var watingGetCallback;
    var watchers = {};
    var watcherId = 1;

    var bindings = [];


    var service = {
      $$init: init,
      get: get,
      bind: bind,
      unbind: unbind,
      registerScope: registerScope,
      applyChanges: applyChanges,
      removeChanges: removeChanges,
      watch: watch,
      destroy: destroy
    };
    return service;



    function init() {
      // defualt the data and includes so bindings can run
      options.data = options.id ? {} : [];
      options.oldValue = options.id ? {} : [];
      options.included = {};

      inited = true;
      if (waitingToGet === true) {
        get(watingGetCallback);
        waitingToGet = false;
      } else {
        updateAllBindings();
      }
    }





    // --- Get Data -----

    /**
     * @ngdoc method
     * @name Manager#get
     * @function
     *
     * @description
     * get data from server
     * if you call this more than once it will only get new data
     *
     * @param {function=} callback - function to be called when data is recieved. It will pass back any errors
     */
    function get(callback) {
      callback = callback || angular.noop;

      if (inited === false) {
        waitingToGet = true;
        watingGetCallback = callback;
        return;
      }

      if (dataRetrieved === false) {
        getData(callback);
      } else {
        reGet(callback);
      }
    }


    function getData(callback, _typscopes) {
      var url = options.getUrl;
      var version = jamHistory.getVersion(options.managerId); // version is handled during handshake

      jamRequest.get(jamUtil.getCacheBustUrl(options.getUrl, version.cb + '_data'), function (error, response) {
        if (error !== undefined) {
          callback(error);
          options.errored = true;
          return;
        }

        dataRetrieved = true;
        if (_typscopes !== undefined) {
          options.typescopes = _typscopes;
          jamHistory.clear(options.managerId);
        }
        options.original = angular.copy(response);
        var parsedJsonApi = jamJsonApi.parse(response, options.typescopes);


        if (options.getNewData === false) {
          var patches = jamUtil.getPatches(options.managerId);
          if (patches !== undefined) {
            jamPatch.apply(parsedJsonApi.data, patches);
          }
        }

        options.data = parsedJsonApi.data;
        options.oldValue = angular.copy(parsedJsonApi.data);
        options.included = parsedJsonApi.included || {};

        options.ready = true;
        updateAllBindings();

        callback(undefined, options.data);
      });
    }


    // make head call to se if ther is new data from server
    // only make get call if server is not versioning or the server specifies that it has new data
    function reGet(callback) {
      jamHandshaker.recheck(options, function (error, newData, typescopes) {
        if (error !== undefined) {
          errorCallback(error);
          options.errored = true;
          return;
        }

        if (newData === true) {
          getData(callback, typescopes);
        } else {
          callback(undefined, options.data);
        }
      });
    }






    // --- Bind variables ----

    /**
     * @ngdoc method
     * @name Manager#bind
     * @function
     *
     * @description
     * Bind data to property of an object
     * You can optionally pass in a type to get all of a given type
     * You can optionally pass in a id to get one of a given type
     *
     * @param {object} object - object that you will bind properties to. This will most likley be the scope or controller
     * @param {string} property - string name of property to set variable on
     * @param {string=} type - Pass in type name to get all of that type
     * @param {string=} id - pass in an id to get a single object of a given type
     */
    function bind(obj, property, type, id) {
      if (typeof obj !== 'object' || obj === null) {
        throw Error('jsonApipManager.bind() requires a object to be passed in as the first parameter');
      }

      if (typeof property !== 'string') {
        throw Error('jsonApipManager.bind() requires a property name to be passed as the secons parameter');
      }

      var binding = {
        obj: obj,
        property: property,
        type: type,
        id: id
      };
      bindings.push(binding);

      if (inited) {
        updateBinding(binding);
      }
    }


    function unbindAll() {
      var i = 0;
      var length = bindings.length;

      while (i < length) {
        // set bound property to undefined
        bindings[i].obj[bindings[i].property] = undefined;
        bindings[i] = undefined;
        i += 1;
      }

      bindings = [];
    }





    /**
     * @ngdoc method
     * @name Manager#unbind
     * @function
     *
     * @description
     * Unbind an entire object or a specific property
     *
     * @param {object} object - object that you will bind properties to. This will most likley be the scope or controller
     * @param {string} property - string name of property to set variable on
     */
    function unbind(obj, property) {
      var i = 0;
      var length = bindings.length;

      while (i < length) {
        if (bindings[i].obj === obj && (property === undefined || bindings[i].property === property)) {
          // set bound property to undefined
          bindings[i].obj[bindings[i].property] = undefined;
          bindings[i] = undefined;

          // remove from bindings list
          bindings.splice(i, 1);
          length -= 1;
          i -= 1;
        }
        i += 1;
      }
    }



    function updateAllBindings() {
      var i = 0;
      var length = bindings.length;

      while (i < length) {
        // remove binding if it cannot be updated
        if (updateBinding(bindings[i]) === false) {
          bindings.splice(i, 1);
          length -= 1;
          i -= 1;
        }
        i += 1;
      }
    }


    function updateBinding(binding) {
      // if the passed in object have been indefined kick back false
      if (binding.obj === undefined) { return false; }

      if (binding.type !== undefined) {
        binding.obj[binding.property] = getBindingType(binding);
      } else {
        binding.obj[binding.property] = options.data;
      }

      return true;
    }


    function getBindingType(binding) {
      var typeList = getByType(binding.type);

      if (binding.id === undefined) {
        return typeList;
      }

      return getTypeById(typeList, binding.id);
    }


    function getByType(type) {
      // if the type is the main type then return the full data
      if (type === options.typescopes[0].type) {
        return options.data;
      }

      return options.included[type];
    }


    function getTypeById(typeList, id) {
      typeList = typeList || [];

      var i = 0;
      var length = typeList.length;

      while (i < length) {
        if (typeList[i].id === id) {
          return typeList[i];
        }

        i += 1;
      }
    }






    // --- apply changes ----

    /**
     * @ngdoc method
     * @name Manager#applyChanges
     * @function
     *
     * @description
     * Submit any changed made to server
     *
     * @param {function=} callback - function to be called when changes are applied. It will pass back any errors
     */
    // will callback on complete and pass in error if one exists
    function applyChanges(callback) {
      jamBatch.add(options, function (error) {
        // TODO check to see if bindings need to be updated
        updateAllBindings();
        if (typeof callback === 'function') { callback(error); }
      });
    }



    /**
     * @ngdoc method
     * @name Manager#removeChanges
     * @function
     *
     * @description
     * remove any changes made tht have not been submitted by applyChanges
     */
    function removeChanges() {
      var patches = jamPatch.diff(options, true);
      if (patches.length > 0) {
        jamPatch.apply(options.data, patches);
        updateAllBindings();
      }
    }



    /**
     * @ngdoc method
     * @name Manager#registerScope
     * @function
     *
     * @description
     * Pass in a scope and an array of any other object you bound data to, and they will automatically be unbound when scope is destroyed
     *
     * @param {scope} scope - scope that will be watched for destroy
     * @param {array} boundObjects - pass in any other bound object(Like the controller) to unbind on scope destroy
     * @param {boolean=} removeChanges - By default when the scope is destroyed all changes not applied will get removed. Pass in false to not remove changes
     */
    function registerScope(scope, boundObjects, _removeChanges) {
      if (typeof scope !== 'object' || scope === null || scope.$watch === undefined) {
        throw Error('Must pass in a scope object');
      }

      boundObjects = boundObjects || [];

      scope.$on('$destroy', function () {
        unbind(scope);
        // call unbind indirectly so the second param of forEach does not get passed
        boundObjects.forEach(function (obj) { unbind(obj); });
        if (_removeChanges !== false) { removeChanges(); }
      });
    }




    /**
     * @ngdoc method
     * @name Manager#watch
     * @function
     *
     * @description
     * Create a watcher to have changes automatically applied. You can only have one watcher at a time
     *
     * @param {scope=} scope - pass in a scope to have watcher killed on scope destroy
     *
     * @return {function} - A function that will kill the watcher when called
     */
    function watch(scope) {
      if (options.watcher !== undefined) {
        throw Error('You can only have one watcher at a time');
      }

      if (typeof options.debounce !== 'function') {
        options.debounce = jamUtil.debounce(applyChanges, options.delay || jamKeys.DEFAULT_DEBOUNCE_TIME);
      }

      options.watcher = jamUtil.getWatcher(options);

      if (scope) {
        scope.$on('$destroy', function () {
          if (options === undefined || options.watcher === undefined) { return; }
          options.watcher();
          options.watcher = undefined;
        });
      }

      return function () {
        if (options === undefined || options.watcher === undefined) { return; }
        if (scope) { scope.$off('$destroy', options.watcher); }
        options.watcher();
        options.watcher = undefined;
      };
    }


    /**
     * @ngdoc method
     * @name Manager#destroy
     * @function
     *
     * @description
     * Kill any watcher, unbind all data, set data to undefined
     */
    function destroy() {
      if (options.watcher !== undefined) { options.watcher(); }
      unbindAll();
      options = undefined;
    }
  }
}
