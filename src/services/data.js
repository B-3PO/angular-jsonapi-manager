/**
  * @ngdoc module
  * @name Manager
  * @description
  * Object returned when you call created
  */
angular
  .module('jsonapi-manager')
  .factory('jamData', jamData);


jamData.$inject = ['jamRequest', 'jamUtil', 'jamJSONAPI'];
function jamData(jamRequest, jamUtil, jamJSONAPI) {
  var service = {
    get: get,
    getById: getById
  };
  return service;



  // get all data based on schema and optional id
  function get(options, callback) {
    jamRequest.get(jamUtil.getCacheBustUrl(options.getUrl, Date.now()), function (error, response) {
      if (error !== undefined) {
        callback(error);
        return;
      }

      options.original = angular.copy(response);
      var parsedJSONAPI = jamJSONAPI.parse(response, options.typeScopes);
      options.data = parsedJSONAPI.data;
      options.oldValue = angular.copy(parsedJSONAPI.data);
      options.typeList = parsedJSONAPI.typeList || {};

      callback(undefined);
    });
  }


  // get data by a single id for top level resource. This will not work if you set am id in the managers options
  function getById(options, id, callback) {
    if (options.id !== undefined) {
      throw Error('jam.getById() can only be called if no id was specified in the menager options');
    }

    var url = jamUtil.createGetUrl(options, id);
    jamRequest.get(jamUtil.getCacheBustUrl(url, Date.now()), function (error, response) {
      if (error !== undefined) {
        callback(error);
        return;
      }

      var combinedResponse = jamJSONAPI.combineData(options.original, response);
      options.original = angular.copy(combinedResponse);
      var parsedJSONAPI = jamJSONAPI.parse(combinedResponse, options.typeScopes);
      options.data = parsedJSONAPI.data;
      options.oldValue = angular.copy(parsedJSONAPI.data);
      options.typeList = parsedJSONAPI.typeList || {};

      callback(undefined);
    });
  }
}
