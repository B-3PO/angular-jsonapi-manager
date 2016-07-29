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
    jamRequest.get(jamUtil.getCacheBustUrl(options.getUrl, Date.now())).then(function (response) {
      options.original = angular.copy(response.data);
      var parsedJSONAPI = jamJSONAPI.parse(response.data, options.typeScopes);
      options.data = parsedJSONAPI.data;
      options.oldValue = angular.copy(parsedJSONAPI.data);
      options.typeList = parsedJSONAPI.typeList || {};
      callback(undefined);
    }, function (error) {
      callback(error);
    });
  }


  // get data by a single id for top level resource. This will not work if you set am id in the managers options
  function getById(options, id, callback) {
    if (options.id !== undefined) {
      throw Error('jam.getById() can only be called if no id was specified in the menager options');
    }

    // TODO make this call add to the original as patches
    // we have to assume updated data can be coming down with this and current patches might be out of date
    var url = jamUtil.createGetUrl(options, id);
    jamRequest.get(jamUtil.getCacheBustUrl(url, Date.now())).then(function (response) {
      var combinedResponse = jamJSONAPI.combineData(options.original, response.data);
      options.original = angular.copy(combinedResponse);
      var parsedJSONAPI = jamJSONAPI.parse(combinedResponse, options.typeScopes);
      options.data = parsedJSONAPI.data;
      options.typeList = parsedJSONAPI.typeList || {};

      var patches = jamUtil.getPatches(options);
      if (patches !== undefined) {
        jamPatch.apply(options, patches);
      }

      options.oldValue = angular.copy(options.data);
      callback(undefined);
    }, function (error) {
      callback(error);
    });
  }
}
