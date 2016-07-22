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

      // TODO impiment compining data
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
