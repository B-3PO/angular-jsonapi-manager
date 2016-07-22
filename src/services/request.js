angular
  .module('jsonapi-manager')
  .factory('jamRequest', jamRequest);


jamRequest.$inject = ['$http'];
function jamRequest($http) {
  var service = {
    baseUrl: '',
    headers: {},
    get: get
  };
  return service;



  function get(url, headers) {
    var callback = arguments[arguments.length - 1];

    request({
      method: 'GET',
      url: url,
      headers: headers,
      callback: typeof callback === 'function' ? callback : undefined
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

    $http(requestObj).success(function (response, status, headers) {
      if (typeof options.callback === 'function') { options.callback(undefined, response, headers); }
    }).error(function (response, status) {
      if (typeof options.callback === 'function') { options.callback({response: response, status: status}); }
    });
  }
}
