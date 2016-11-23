angular
  .module('jsonapi-manager')
  .factory('jamUtil', jamUtil);


var uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;


jamUtil.$inject = ['jamStorage', 'jamKeys'];
function jamUtil(jamStorage, jamKeys) {
  var performance = window.performance ? angular.bind(window.performance, window.performance.now) : Date.now;
  var slice = Array.prototype.slice;

  var service = {
    hashString: hashString,
    getCacheBustUrl: getCacheBustUrl,
    createGetUrl: createGetUrl,
    getTypeScopeByPath: getTypeScopeByPath,
    generateUUID: generateUUID,
    defaultRelationships: defaultRelationships,
    getPatches: getPatches
  };
  return service;



  // --- Get Patches ---
  function getPatches(options) {
    var storedItem = jamStorage.get(jamKeys.STORED_DATA_PREFIX + options.managerId) || [];

    if (storedItem.length > 0) {
      return storedItem.map(function (item) {
        return item.data;
      }).reduce(function (arr, item) {
        return arr.concat(item);
      });
    }

    return undefined;
  }


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

  // adds a cash buster param to a given url and value
  function getCacheBustUrl(url, cb) {
    if (url.indexOf('?') === -1) {
      return url + '?cb=' + cb;
    } else {
      return url + '&cb=' + cb;
    }
  }


  // builds url with ids and includes
  function createGetUrl(options, id) {
    var paths;
    var getUrl = options.url;
    id = options.id || id;

    if (id !== undefined) { getUrl += '/' + id; }
    if (options.include instanceof Array && options.include.length > 0) {
      getUrl += '?include=' + options.include.join(',');
    } else if (typeof options.schema === 'object' && options.schema !== null) {
      paths = getAllObjectPaths(options.schema, '');
      if (paths instanceof Array) {
        getUrl += '?include=' + paths.filter(function (arr) {
          return arr.length;
        }).map(function (arr) {
          return arr.join('.');
        }).join(',');
      }
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




  // find typeScope by an objects nested path from the root object
  function getTypeScopeByPath(path, typeScopes) {
    var i = 0;
    var length = typeScopes.length;
    path = getTypescopePath(path);

    // try to match path
    while (i < length) {
      if (typeScopes[i].maps.indexOf(path) > -1) {
        // NOTE do we want to add the type check here. is it possible to have a path match that does not apply to the scope path
        return typeScopes[i];
      }
      i += 1;
    }
    return undefined;
  }
  // return path minus the array ints
  function getTypescopePath(path) {
    return path.split('/').filter(function (str) {
      return !uuidPattern.test(str);
    }).join('/');
  }




  // --- Generate a uuid (v4) ----
  function generateUUID() {
    var d = Date.now();
    d += performance();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;
  }



  // --- Default relationships ---
  // default relationship data to either and empty array for multi resource, or null for single resource
  function defaultRelationships(obj, typeScope) {
    var relationshipKeys;
    var key;

    // default relationship object/array
    if (typeScope.relationships) {
      relationshipKeys = Object.keys(typeScope.relationships);
      key = relationshipKeys.pop();

      while (key !== undefined) {
        if (typeScope.relationships[key].meta && typeScope.relationships[key].meta.toMany === true && obj[key] === undefined) {
          obj[key] = [];
        } else {
          obj[key] = null;
        }
        key = relationshipKeys.pop();
      }
    }
  }
}
