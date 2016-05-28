// TODO look into allowing server to send back ovriding/addtional data that will be added/replace current data


angular
  .module('jsonapiManager', [])
  .provider('jsonapiManager', dataManagerProvider)
  .constant('$dMConstant', {
    DEFAULT_DEBOUNCE_TIME: 500,
    STORED_DATA_PREFIX: '_dMData_',
    VERSION_KEY: '_dMGetVersions_',
    MEMORY_LIMIT: 5000 - 500,
    FOOT_PRINT_ID: '_dMFootprint_',
    TIMESTAMPS_ID: '_dMTimeStamps_',
    STORAGE_SIZE_KEY: '_dMStorageSize_'
  });




/**
  * @name dataManagerProvider
  * @module dataManagerProvider
  *
  *
  * @description
  *
  *
  */
function dataManagerProvider() {

  /**
   * @namespace
   * @property {string} baseURL - Stirng that gets prepended to beging of all urls
   * @property {boolean} postOnly - Use post instead of PUT and DELETE and PATCH
   * @property {boolean} getOnly - use GET instead of HEAD for handshake
   * @property {boolean} jsonapi - use jsonapi for incoming and outgoing payloads
   * @property {string} objectId - property name of id for objs
   */
  var provider = {
    baseURL: '',
    objectId: 'id',
    postOnly: false,
    createPost: false,
    getOnly: false,
    jsonapi: true,
    headers: undefined,
    $get: ['$dMConstant', 'dMUtil', 'dMRequester', '$dataGetter', 'standardJSON', 'jsonapi', 'dMBatch', 'dMJSONPatch', dataManagerService]
  };
  return provider;




  /**
    * @name dataManager
    * @module dataManager
    *
    *
    * @description
    *
    *
    */
  function dataManagerService($dMConstant, dMUtil, dMRequester, $dataGetter, standardJSON, jsonapi, dMBatch, dMJSONPatch) {
    var versionKeyData;
    var objectId = provider.objectId;
    var getOnly = provider.getOnly;
    var postOnly = provider.postOnly;
    var createPost = provider.createPost;
    var jsonapiGlobal = provider.jsonapi;


    // pass params to dMRequester class
    dMRequester.init({
      baseURL: provider.baseURL || '',
      headers: provider.headers
    });



    // --- SERVICE ---
    // ---------------


    var service = {
      create: create
    };
    return service;



    /**
      * @name create
      * @function
      *
      * @description
      *
      * @param {object} options
      * @param {function} callback
      * @return {object}
      */
    function create(options, callback) {
      if (validateOptions(options) !== true) { return; }

      options.callback = callback;

      // setup get url by adding id and includes
      options.getUrl = options.url;
      if (options.id !== undefined) { options.getUrl += '/' + options.id; }
      if (options.include instanceof Array && options.include.length > 0) {
        options.getUrl += '?include=' + options.include.join(',');
      }

      options.urlId = dMUtil.hashString('_get_' + options.getUrl);
      options.jsonapi = options.jsonapi !== undefined ? options.jsonapi : jsonapiGlobal;
      options.requestModifiers = {
        getOnly: options.getOnly !== undefined ? options.getOnly : getOnly,
        postOnly: options.postOnly !== undefined ? options.postOnly : postOnly,
        createPost: options.createPost !== undefined ? options.createPost : createPost,
        jsonapi: options.jsonapi !== undefined ? options.jsonapi : jsonapiGlobal
      };

      setupTypescopes(options);




      /**
        * @name dataController
        * @module dataController
        *
        *
        * @description
        *
        */
      // return data controller
      return (function (opt) {
        return {
          watch: watch,
          get: get,
          getType: getType,
          applyChanges: applyChanges,
          removeChanges: removeChanges
        };


        /**
          * @name watch
          * @function
          *
          * @description
          * start watching data. This will return a function for killing the watcher that has pause, resume and getType methods
          *
          * @param {function} callback
          * @return {function}
          */
          /**
            * @name dataWatch
            * @module dataWatch
            *
            *
            * @description
            *
            */
        function watch(callback) {
          var killed = false;

          getData(function () {
            if (killed === true) {
              if (typeof opt.error === 'function') { opt.error('dataManager: watch was killed before data was fetched'); }
              return;
            }

            initWatcher(opt);
            if (typeof callback === 'function') { callback(opt.data); }
          });

          var killer = function killer() {
            if (opt.watcher !== undefined) { opt.watcher(); }
            killed = true;
            opt = undefined;
          };


          /**
            * @name pause
            * @function
            *
            * @description
            * pause watcher
            */
          killer.pause = function () {
            if (opt.watcher !== undefined) { opt.watcher(); }
          };


          /**
            * @name resume
            * @function
            *
            * @description
            * restart watcher
            */
          killer.resume = function () {
            if (opt.watcher === undefined) {
              // TODO make sure this fires in the correct order
              applyChanges();
              opt.watcher = dMUtil.getWatcher(opt);
            }
          };


          /**
            * @name getType
            * @function
            *
            * @description
            * get type array or type object if id is passe in
            *
            * @param {string} type
            * @param {string} [id]
            * @return {array | object}
            */
          killer.getType = getType;

          return killer;
        }


        function getData(callback) {
          var jsonapiData;

          opt.callback = callback;
          $dataGetter(opt.urlId, opt.getUrl, opt.requestModifiers, function (error, data, patches) {
            if (error !== undefined) {
              if (typeof opt.error === 'function') { opt.error('There was a problem retrieving your data'); }
              return;
            }

            if (opt.jsonapi === true) {
              jsonapiData = jsonapi._internalParse(data, opt.typescopes);
              data = angular.copy(jsonapiData.data);
              opt.typescopes = jsonapiData.typescopes;
            }

            // set original before patches
            opt.original = angular.copy(data);

            // apply patches if given back from data getter
            if (patches !== undefined) {
              dMJSONPatch.apply(data, patches);
            }

            data = standardJSON.parse(data, opt.typescopes);
            opt.data = data.data;
            opt.oldValue = angular.copy(data.data);
            opt.included = data.included;
            callback();
          });
        }



        /**
          * @name get
          * @function
          *
          * @description
          * get data from server/cache
          *
          * @param {function} callback
          */
        function get(callback) {
          getData(function () {
            callback(opt.data);
          });
        }


        /**
          * @name getType
          * @function
          *
          * @description
          * get type array or type object if id is passe in
          *
          * @param {string} type
          * @param {string} [id]
          * @return {array | object}
          */
        function getType(type, id) {
          if (id === undefined) {
            return opt.included[type];
          } else {
            if (type === opt.typescopes[0].type) {
              return getTypeItem(opt.data, id);
            } else {
              return getTypeItem(opt.included[type], id);
            }
          }

          return undefined;
        }

        function getTypeItem(included, id) {
          if (included === undefined) { return undefined; }

          var i = 0;
          var length = included.length;
          while (i < length) {
            if (included[i].id === id) {
              return included[i];
            }

            i += 1;
          }

          return undefined;
        }


        /**
          * @name applyChanges
          * @function
          */
        function applyChanges() {
          handleData(opt, opt.data);
        }


        /**
          * @name removeChanges
          * @function
          *
          * @description
          * revoke current changes. this will callback with the data to the original callback or he passed in callback
          *
          * @param {function} [callback]
          */
        function removeChanges(callback) {
          // TODO check to see if it will be more perforant to reverse patches instead of rebuilding data
          // TODO need to restructure the get type call to rehook the object
          var data = standardJSON.parse(opt.original, opt.typescopes);
          opt.data = data.data;
          opt.oldValue = angular.copy(data.data);
          opt.included = data.included;

          if (typeof callback === 'function') {
            callabck(opt.data);
          } else if (typeof opt.callback === 'function') {
            opt.callback(opt.data);
          }
        }

      }(options));
    }




    function validateOptions(options) {
      if (typeof options === 'undefined') {
        throw new Error('dataManager.create() You must pass in options');
      }

      if (options.url === undefined) {
        throw new Error('dataManager.create() requires a "url" options prameter');
      }

      if (options.postOnly === true && (options.createUrl === undefined || options.updateUrl === undefined || options.deleteUrl === undefined)) {
        throw new Error('dataManager.create() to use "postOnly" you must add the alt urls ("createUrl", "updateUrl", "deleteUrl")');
      }

      // objectId can be set from the provider
      options.objectId = options.objectId || objectId;
      if (options.objectId === undefined) {
        throw new Error('You must provide an "objectId"');
      }

      // TODO : options object validation for relationships

      return true;
    }





    // start watcher and return data
    function initWatcher(options) {
      options.debounce = dMUtil.debounce(handleData, options.delay || $dMConstant.DEFAULT_DEBOUNCE_TIME);
      options.watcher = dMUtil.getWatcher(options);
    }




    function setupTypescopes(options) {
      var scopes = [];
      var typescope = Object.freeze({
        map: '',
        type: options.type,
        urls: {
          url: options.url,
          createUrl: options.createUrl,
          updateUrl: options.updateUrl,
          deleteUrl: options.deleteUrl
        }
      });

      scopes.push(typescope);
      parseTypescopes(options, '', typescope, scopes);
      options.typescopes = scopes;
    }

    function parseTypescopes(opt, path, parentScope, arr) {
      var rel;
      var newScope;
      if (opt.relationships === undefined) { return; }

      rel = opt.relationships.pop();
      while (rel !== undefined) {
        newScope = Object.freeze({
          map: (path + '/' + rel.map).replace(/^\//, ''),
          prop: rel.map,
          type: rel.type,
          urls: {
            url: rel.url,
            createUrl: rel.createUrl,
            updateUrl: rel.updateUrl,
            deleteUrl: rel.deleteUrl
          },
          parentScope: parentScope,
          parentRelationshipMany: rel.many || false
        });

        arr.push(newScope);

        parseTypescopes(rel, path + '/' + rel.map, newScope, arr);
        rel = opt.relationships.pop();
      }
    }

    function handleData(options, newValue) {
      var isUpdate = dMBatch.add(options, newValue);

      // stop watcher from firing if the batch updates the data(ids)
      if (typeof options.watcher === 'function' && isUpdate === true) {
        options.watcher();
        options.watcher = dMUtil.getWatcher(options);
      }

      // update view if the batch updates the data(ids)
      // NOTE Apply seems not to be needed
      if (isUpdate === true) {
        // dMUtil.runApply();
      }
    }
  }
}
