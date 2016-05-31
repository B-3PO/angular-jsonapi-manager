/**
  * @ngdoc module
  * @name jsonApiManager
  */
angular
  .module('jsonApiManager', [])
  .provider('jsonApiManager', jsonapiManagerProvider)
  .constant('jamKeys', {
    VERSION_KEY: '_jamVersions',
    STORED_DATA_PREFIX: '_jamData_',
    DEFAULT_DEBOUNCE_TIME: 200
  });



/**
  * @ngdoc provider
  * @name jsonApiManagerProvider
  * @module jsonApiManager
  *
  * @description
  * Edit Base settings for all managers
  */
function jsonapiManagerProvider() {
  var provider = {
    /**
      * @ngdoc property
      * @name jsonApiManagerProvider#baseUrl
      * @module jsonApiManagerProvider
      * @description Set the base url for all calls
      */
    baseUrl: '',

    /**
      * @ngdoc property
      * @name jsonApiManagerProvider#headers
      * @module jsonApiManagerProvider
      * @description Object of base headers to be used on all calls
      */
    headers: undefined,
    $get: ['jamUtil', 'jamManager', 'jamRequest', jsonapiManagerService]
  };
  return provider;




  function jsonapiManagerService(jamUtil, jamManager, jamRequest) {
    jamRequest.baseUrl = provider.baseUrl;

    var service = {
      create: create
    };
    return service;



    function create(options, errorCallback) {
      validateOptions(options);
      setupUrl(options);

      // create hex hash; used to refernce this manger
      options.managerId = jamUtil.hashString(options.url);

      return jamManager.create(options, errorCallback);
    }



    function setupUrl(options) {
      options.getUrl = options.url;
      if (options.id !== undefined) { options.getUrl += '/' + options.id; }
      if (options.include instanceof Array && options.include.length > 0) {
        options.getUrl += '?include=' + options.include.join(',');
      }
    }

    function validateOptions(options) {
      if (typeof options === 'undefined') {
        throw Error('jsonApiManager.create() You must pass in options');
      }

      if (options.url === undefined) {
        throw Error('jsonApiManager.create() requires a "url" options prameter');
      }
    }
  }
}
