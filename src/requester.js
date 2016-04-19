angular
  .module('dataManager')
  .factory('requester', requesterService);



requesterService.$inject = ['$http', 'jsonapi'];
function requesterService($http, jsonapi){
  var baseURL;
  var validator;
  var headers;




  var service = {
    init: init,
    addHeaders: addHeaders,

    send: send,
    get: get,
    head: head,
  };
  return service;






  function init(options) {
    baseURL = options.baseURL;
    validator = options.validator;
    headers = options.headers;
  }


  function addHeaders(_headers) {
    headers = headers || {};
    headers = angular.extend(headers, _headers);
  }



  function head(url, _headers, modifiers) {
    var callback = arguments[arguments.length - 1];
    modifiers = modifiers || {};

    request({
      method: modifiers.getOnly === true ? 'GET' : 'HEAD',
      url: url,
      headers: _headers,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }


  function get(url, _headers, version, modifiers) {
    var callback = arguments[arguments.length - 1];
    modifiers = modifiers || {};

    request({
      method: 'GET',
      url: url,
      headers: _headers,
      version: version,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }


  function send(item, requestModifiers, reverse, callback) {
    var method;
    var op = getOP(item.op, reverse, item.singleResource);
    var isJSONAPI = requestModifiers.jsonapi === true;


    if (op === 'add') {
      // TODO add option to allow this to be post. (seperate from postOnly)
      method = requestModifiers.postOnly === true || requestModifiers.createPost === true ? 'POST' : 'PUT';
    } else if (op === 'update' || op === 'relationship') {
      method = requestModifiers.postOnly === true ? 'POST' : 'PUT';
    } else if (op === 'remove' || op === 'removeRelationship') {
      method = requestModifiers.postOnly === true ? 'POST' : 'DELETE';
    }


    request({
      method: method,
      url: item.url,
      data: getData(item, op, reverse, isJSONAPI),
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

  function getData(item, op, reverse, isJSONAPI) {
    // TODO do i need to do special formatting on non jsonapi calls?

    if (op === 'remove') {
      return undefined;
    } else {
      if (reverse === true) {
        return isJSONAPI === true ? jsonapi.format(item.oldData, item.type, op) : item.oldData;
      } else {
        return isJSONAPI === true ? jsonapi.format(item.data, item.type, op) : item.data;
      }
    }
  }




  function request(requestOptions) {
    var requestObj;
    var url = requestOptions.url;

    if (requestOptions.version !== undefined) {
      if (url.indexOf('?') > -1) { url += '&dm_v='; }
      else { url += '?dm_v='; }

      url += requestOptions.version;
    }


    requestObj = {
      method: requestOptions.method
    };

    if (url.indexOf('http') === -1) { requestObj.url = baseURL + url; }
    else { requestObj.url = url; }


    // add headers from local options
    if (requestOptions.headers !== undefined && requestOptions.headers !== false) {
      requestObj.headers = requestObj.headers || {};
      angular.extend(requestObj.headers, requestOptions.headers, headers || {});
    }


    if (requestOptions.data !== undefined) {

      // fix for angular sutomatically setting header to plain test for deletes
      if (requestObj.method === 'DELETE') {
        if (requestObj.headers === undefined) { requestObj.headers = {}; }
        requestObj.headers['Content-Type'] = 'application/json;charset=utf-8';
      }

      requestObj.data = requestOptions.data;
    }


    // headers: { 'Accept-Encoding': 'gzip' }})
    $http(requestObj)
      .success(function (response, status, headers) {
        if (status === 200) {

          // run custom data validator
          if (typeof validator === 'function' && validator(response) === false) {
            if (typeof requestOptions.callback === 'function') {
              requestOptions.callback(true);
              return;
            }
          }

          if (typeof requestOptions.callback === 'function') { requestOptions.callback(undefined, response, headers); }

        } else {
          if (typeof requestOptions.callback === 'function') { requestOptions.callback(true); }
        }
      })
      .error(function (response, status) {
        if (typeof requestOptions.callback === 'function') { requestOptions.callback(true); }
      });
  }
}
