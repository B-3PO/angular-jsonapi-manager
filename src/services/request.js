angular
  .module('jsonapi-manager')
  .factory('jamRequest', jamRequest);


jamRequest.$inject = ['$http', '$q'];
function jamRequest($http, $q) {
  var service = {
    baseUrl: '',
    headers: {},
    get: get,
    sendBatchItem: sendBatchItem
  };
  return service;



  function get(url, headers) {
    return request({
      method: 'GET',
      url: url,
      headers: headers
    });
  }

  function sendBatchItem(patch) {
    return request({
      method: getMethod(patch.op),
      url: getUrl(patch),
      data: getData(patch)
    });
  }


  function request(options) {
    var requestObj = {
      method: options.method,
      url: service.baseUrl + options.url
    };

    requestObj.headers = options.headers || {};
    angular.extend(requestObj.headers, service.headers);

    if (options.data !== undefined) {
      requestObj.data = options.data;
    }

    return $http(requestObj);
  }




  function getMethod(op) {
    if (op === 'add') { return 'POST'; }
    if (op === 'update' || op === 'relationship') { return 'PATCH'; }
    if (op === 'delete' || op === 'delete-relationship') { return 'DELETE'; }
  }

  function getUrl(patch) {
    if (patch.op === 'add') { return patch.url; }
    if (patch.op === 'delete') { return patch.url+'/'+patch.resource.id; }
    if (patch.op === 'update' || patch.op === 'relationship') { return patch.url+'/'+patch.resource.id; }
    if (patch.op === 'delete-relationship') { return patch.url; }
  }

  function getData(patch) {
    var data;
    if (patch.op === 'add' || patch.op === 'update' || patch.op === 'relationship') {
      data = {
        id: patch.resource.id,
        type: patch.resource.type
      };
      if (patch.resource.attributes && Object.keys(patch.resource.attributes).length) {
        data.attributes = patch.resource.attributes;
      }
      if (patch.resource.relationships && Object.keys(patch.resource.relationships).length) {
        data.relationships = patch.resource.relationships;
      }
    }

    if (patch.op === 'delete-relationship') {
      data = patch.resource.data;
    }

    return {data: data};
  }
}
