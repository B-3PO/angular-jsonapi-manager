angular
  .module('jsonapi-manager')
  .factory('jamUtil', jamUtil);


jamUtil.$inject = [];
function jamUtil() {
  var performance = window.performance ? angular.bind(window.performance, window.performance.now) : Date.now;
  var slice = Array.prototype.slice;

  var service = {
    hashString: hashString,
    getCacheBustUrl: getCacheBustUrl,
    createGetUrl: createGetUrl
  };
  return service;



  // Calculate a 32 bit FNV-1a hash and convert it to hex
  function hashString(str) {
    /*jshint bitwise:false */
    var i = 0;
    var l = str.length;
    var hval = 0x811c9dc5;

    while (i < l) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
      i++;
    }

    return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
  }


  function getCacheBustUrl(url, cb) {
    if (url.indexOf('?') === -1) {
      return url + '?cb=' + cb;
    } else {
      return url + '&cb=' + cb;
    }
  }



  function createGetUrl(options, id) {
    var getUrl = options.url;
    id = options.id || id;

    if (id !== undefined) { getUrl += '/' + id; }
    if (options.include instanceof Array && options.include.length > 0) {
      getUrl += '?include=' + options.include.join(',');
    } else if (typeof options.schema === 'object' && options.schema !== null) {
      getUrl += '?include=' + getAllObjectPaths(options.schema, '').filter(function (arr) {
        return arr.length;
      }).map(function (arr) {
        return arr.join('.');
      }).join(',');
    }

    return getUrl;
  }

  function getAllObjectPaths(obj, parent, arr) {
    if (obj === undefined || obj.relationships === undefined) { return; }
    arr = arr || [];

    var keys = Object.keys(obj.relationships);
    var matchingArr = [];
    var i = 0;
    var length = arr.length;
    while (i < length) {
      if (arr[i][arr[i].length-1] === parent) {
        matchingArr = arr[i];
        break;
      }
      i += 1;
    }

    i = 0;
    length = keys.length;
    while (i < length) {
      arr.push(matchingArr.concat(keys[i]));
      getAllObjectPaths(obj.relationships[keys[i]], keys[i], arr);
      i += 1;
    }

    return arr;
  }
}
