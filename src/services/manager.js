/**
  * @ngdoc module
  * @name Manager
  * @description
  * Object returned when you call created
  */
angular
  .module('jsonapi-manager')
  .factory('jamManager', jamManager);


jamManager.$inject = ['$q', 'jamUtil', 'jamData', 'jamPatch'];
function jamManager($q, jamUtil, jamData, jamPatch) {
  var service = {
    Create: Create
  };
  return service;



  function Create(options) {
    validateOptions(options);
    options = angular.copy(options); // copy so options cannot be manipulated from experior
    buildOptions(options);
    return constructManager(options);
  }




  // -- Cerate and return manager -----
  function constructManager(options) {
    var inited = false;
    var initDefer = $q.defer();
    var bindings = [];

    var manager = {
      get: get,
      getById: getById,
      bind: bind,
      unbind: unbind,
      registerScope: registerScope,
      destroy: destroy,
      applyChanges: applyChanges,
      removeChanges: removeChanges
    };
    init();
    return manager;


    function init() {
      // defualt the data and includes so bindings can run
      options.data = options.id ? {} : [];
      options.oldValue = options.id ? {} : [];
      options.typeList = {};

      // if schema is passed in then build scopes of that
      if (options.schema) {
        options.typeScopes = buildtypeScopes(options.schema);
        // convert scopes from object and feeze the objects so they cannot be manipulated
        options.typeScopes = Object.keys(options.typeScopes).map(function (key) {
          Object.freeze(options.typeScopes[key]);
          return options.typeScopes[key];
        });

        inited = true;
        initDefer.resolve(); // resolve the promise so gets can run
      } else {
        // call for schema
      }
    }



    /**
     * @ngdoc method
     * @name Manager#get
     * @function
     *
     * @description
     * get data from server
     *
     * @param {function=} callback - function to be called when data is recieved. It will pass back any errors
     */
    function get(callback) {
      initDefer.promise.then(function () { // resolves after scopes have been built
        jamData.get(options, function (error) {
          if (error === undefined) { updateAllBindings(); }
          if (typeof callback === 'function') { callback(error); }
        });
      });
    }


    /**
     * @ngdoc method
     * @name Manager#getById
     * @function
     *
     * @description
     * get data from server by specific id and add it to current data
     *
     * @param {string} id - uid of the specific resource
     * @param {function=} callback - function to be called when data is recieved. It will pass back any errors
     */
    function getById(id, callback) {
      initDefer.promise.then(function () { // resolves after scopes have been built
        jamData.getById(options, id, function (error) {
          if (error === undefined) { updateAllBindings(); }
          if (typeof callback === 'function') { callback(error); }
        });
      });
    }




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
      console.log(jamPatch.diff(options));
      // jamBatch.add(options, function (error) {
      //   // TODO check to see if bindings need to be updated
      //   updateAllBindings();
      //   if (typeof callback === 'function') { callback(error); }
      // });
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
      // var patches = jamPatch.diff(options, true);
      // if (patches.length > 0) {
      //   // TODO check to see if bindings need to be updated
      //   jamPatch.apply(options.data, patches);
      //   updateAllBindings();
      // }
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
        throw Error('jam.bind() requires a object to be passed as the first parameter');
      }
      if (typeof property !== 'string') {
        throw Error('jam.bind() requires `property` attribute as the second parameter');
      }

      var binding = {
        obj: obj,
        property: property,
        type: type,
        id: id
      };
      bindings.push(binding);
      if (inited === true) { updateBinding(binding); }
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
      var typeList = options.typeList[binding.type];
      if (binding.id === undefined) { return typeList; }
      return getTypeById(typeList, binding.id);
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


    /**
     * @ngdoc method
     * @name Manager#registerScope
     * @function
     *
     * @description
     * Pass in a scope and an array of any other object you bound data to, and they will automatically be unbound when scope is destroyed
     *
     * @param {scope} scope - scope that will be watched for destroy
     * @param {boolean=} removeChanges - By default when the scope is destroyed all changes not applied will get removed. Pass in false to not remove changes
     * @param {array|object} boundObjs - pass in any other bound object(Like the controller) to unbind on scope destroy
     */
    function registerScope(scope, _removeChanges, boundObjs) {
      if (typeof scope !== 'object' || scope === null || scope.$watch === undefined) {
        throw Error('Must pass in a scope object');
      }

      boundObjs = boundObjs ? [].concat(boundObjs) : [];
      scope.$on('$destroy', function () {
        unbind(scope);
        // call unbind indirectly so the second param of forEach does not get passed
        boundObjs.forEach(function (obj) { unbind(obj); });
        if (_removeChanges !== false) { removeChanges(); }
      });
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
      unbindAll();
      options = undefined;
    }

  }





  // --- buidl typeScopes based on schema
  function buildtypeScopes(schema, path, parent, obj) {
    obj = obj || {};
    path = path || '';

    // create base type object if none exists
    if (obj[schema.type] === undefined) {
      obj[schema.type] = {
        type: schema.type,
        url: path,
        maps: [],
        parents: []
      };
      if (schema.meta) { obj[schema.type].meta = angular.copy(schema.meta); }
    }

    // add map to typeScope. this is used to find the correct typescope bassed on the objects properties
    obj[schema.type].maps.push(parent === undefined ? '' : (parent.maps[parent.maps.length-1] + '/' + path).replace(/^\//, ''));

    // if parent scope exists then make refernces to and from it
    if (parent) {
      obj[schema.type].parents.push(parent);
      // add typeScope to parent scopes relationships
      if (parent.relationships === undefined) { parent.relationships = {}; }
      parent.relationships[path] = obj[schema.type];
    }

    // run on all relationships
    if (schema.relationships) {
      var keys = Object.keys(schema.relationships);
      var key = keys.pop();
      while (key !== undefined) {
        buildtypeScopes(schema.relationships[key], key, obj[schema.type], obj);
        key = keys.pop();
      }
    }

    return obj;
  }



  function buildOptions(options) {
    // main get url bassed on schema and optional passed in id
    options.getUrl = jamUtil.createGetUrl(options);
    // create hex hash. used to refernce this manger
    options.managerId = jamUtil.hashString(options.getUrl);
  }


  function validateOptions(options) {
    if (typeof options !== 'object' || options === null) {
      throw Error('jam.Create() expcts a paramter `options` of type `object`');
    }
    if (options.url === undefined) {
      throw Error('jam.Create() `options` requires a `url` propert');
    }
  }
}
