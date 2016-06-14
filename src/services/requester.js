angular
  .module('jsonApiManager')
  .factory('jamRequest', jamRequest);


jamRequest.$inject = ['$http', 'jamUtil', 'jamJsonApi'];
function jamRequest($http, jamUtil, jamJsonApi) {
  var service = {
    baseUrl: '',
    headers: {},
    head: head,
    get: get,
    sendBatchItem: sendBatchItem
  };
  return service;



  function head(url, headers) {
    var callback = arguments[arguments.length - 1];

    if (url.indexOf('?') === -1) {
      url += '?cb=' + jamUtil.now();
    } else {
      url += '&cb=' + jamUtil.now();
    }

    request({
      method: 'HEAD',
      url: url,
      headers: headers,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }

  function get(url, headers) {
    var callback = arguments[arguments.length - 1];

    request({
      method: 'GET',
      url: url,
      headers: headers,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }






  // --- Send Batch items to server ----

  function sendBatchItem(item, reverse, callback) {
    var op = getOP(item.op, reverse, item.singleResource);

    request({
      method: getMethod(op),
      url: item.url,
      data: getData(item, op, reverse),
      callback: callback
    });
  }

  // reverse op if reverse true else returns op
  // this is for rolling back changes
  function getOP(op, reverse, singleResource) {
    if (reverse === true) {
      if (op === 'add' || (op === 'replace' && singleResource === true)) { return 'remove'; }
      else if (op === 'remove') { return 'add'; }
      else if (op === 'removeRelationship') { return 'relationship'; }
      else if (op === 'relationship') { return 'removeRelationship'; }
    }

    if (op === 'replace' && singleResource === true) { return 'add'; }
    return op;
  }

  // use the correct method based on the operation
  function getMethod(op) {
    if (op === 'add') { return 'PUT'; }
    if (op === 'replace') { return 'PUT'; } // TODO change to POST
    if (op === 'remove' || op === 'removeRelationship') { return 'DELETE'; }
    if (op === 'relationship') { return 'POST'; }
  }

  // format and use the correct data based on the operation
  function getData(item, op, reverse) {
    var data;

    if (op === 'remove') { return undefined; }

    if (op === 'relationship' || op === 'removeRelationship') {
      if (reverse === true) {
        // nest data in array of the relationship is toMany
        data = item.toMany ? [].concat(item.oldData) : item.oldData;
        return jamJsonApi.format(data, item.type, op);
      }

      // nest data in array of the relationship is toMany
      data = item.toMany ? [].concat(item.data) : item.data;
      return jamJsonApi.format(data, item.type, op);
    }

    if (reverse === true) { return jamJsonApi.format(item.oldData, item.type, op, item.constraint, item.parentId); }
    return jamJsonApi.format(item.data, item.type, op, item.constraint, item.parentId);
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
