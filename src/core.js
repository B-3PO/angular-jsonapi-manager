/**
  * @ngdoc module
  * @name jsonApiManager
  */
angular
  .module('jsonapi-manager', [])
  .provider('jam', jamProvider)
  .constant('jamKeys', {
    STORED_DATA_PREFIX: '_jamData_'
  });



/**
  * @ngdoc provider
  * @name jamProvider
  * @module jsonapi-manager
  *
  * @description
  * Edit Base settings for all managers
  */
function jamProvider() {
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
    $get: ['jamRequest', 'jamManager', jamService]
  };
  return provider;




  function jamService(jamRequest, jamManager) {
    jamRequest.baseUrl = provider.baseUrl;

    var service = {
      Create: Create
    };
    return service;


    /**
     * @ngdoc method
     * @name jsonApiManager#Create
     * @function
     *
     * @description
     * Create a new manager
     * The manager will allow you to bind properties to data
     * it will get and format date from the server. It will automate calles to the server
     *
     * @param {object} options - object containing options you can set
     * @param {function=} callback - function to be called when manager has completed handshake with server. It will pass back any errors
     * @param {string} options.url - url for the resource
     * @param {id=} options.id - if you want to retrieve a single resource
     * @param {array=} include - Array of string values for the data you want included with resource
     *
     * @return {manager} - json api manager object
     */
    function Create(options, callback) {
      return jamManager.Create(options, callback);
    }
  }
}
