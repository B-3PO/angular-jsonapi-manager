angular
  .module('jsonApiManager')
  .factory('jamUtil', jamUtil);


jamUtil.$inject = ['jamStorage','jamKeys'];
function jamUtil(jamStorage, jamKeys) {
  var performance = window.performance ? angular.bind(window.performance, window.performance.now) : Date.now;
  var slice = Array.prototype.slice;

  var service = {
    now: Date.now,
    hashString: hashString,
    buildTypeScopes: buildTypeScopes,
    getCacheBustUrl: getCacheBustUrl,
    getTypeScope: getTypeScope,
    getId: getId,
    reversePatch: reversePatch,
    getPatches: getPatches
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




  // --- Get Typescope ---

  function getTypeScope(path, type, typescopes) {
    var i = 0;
    var length = typescopes.length;
    path = getTypescopePath(path);

    // try to match path
    while (i < length) {
      if (typescopes[i].map === path) {
        // NOTE do we want to add the type check here
        return typescopes[i];
      }
      i += 1;
    }

    // if not path match then try by type
    if (type !== undefined) {
      i = 0;
      while (i < length) {
        if (typescopes[i].type === type) {
          return typescopes[i];
        }
        i += 1;
      }
    }

    return undefined;
  }
  // return path minus the array ints
  function getTypescopePath(path) {
    return path.split('/').filter(function (item) {
      return isNaN(item);
    }).join('/');
  }




  // --- Revers Patch ----
  function reversePatch(patch) {
    var op = patch.op === 'add' ? 'remove' : patch.op === 'remove' ? 'add' : 'replace';

    if (op === 'remove') {
      return {
        op: op,
        path: patch.path
      };
    } else {
      return {
        op: op,
        path: patch.path,
        value: patch.oldData
      };
    }
  }




  // --- Generate a uuid ----
  function getId() {
    var d = Date.now();
    d += performance();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;
  }



  // --- Get Patches ---
  function getPatches(id) {
    var storedItem = jamStorage.get(jamKeys.STORED_DATA_PREFIX + id) || [];

    if (storedItem.length > 0) {
      return storedItem.map(function (item) {
        return item.data;
      }).reduce(function (arr, item) {
        return arr.concat(item);
      });
    }

    return undefined;
  }





  // --- Build type scopes ---

  function buildTypeScopes(options, structure) {
    var typeScopeList = [];

    var typeScope = Object.freeze({
      map: '',
      type: structure.type,
      url: options.url,
      attrs: angular.copy(structure.attributes),
      relationships: copyRelationships(structure.relationships)
    });

    typeScopeList.push(typeScope);
    parseTypescopes(structure.relationships, '', typeScope, typeScopeList);
    return typeScopeList;
  }

  function copyRelationships(relationships) {
    if (relationships === undefined) { return undefined; }

    var returnObj = {};

    Object.keys(relationships).forEach(function (key) {
      returnObj[key] = {
        type: relationships[key].type,
      };

      if (relationships[key].meta !== undefined) {
        returnObj[key].toMany = relationships[key].meta.toMany || false;
        returnObj[key].constraint = relationships[key].meta.constraint ?  relationships[key].meta.constraint.resource : undefined;
      }
    });

    return returnObj;
  }

  function parseTypescopes(structure, path, parentScope, typeScopeList) {
    if (structure === undefined) { return; }

    var typeObj;
    var typeScope;
    var relationship;
    var keys = Object.keys(structure);
    var key = keys.pop();

    while (key !== undefined) {
      relationship = structure[key];
      typeObj = {
        map: (path + '/' + key).replace(/^\//, ''),
        prop: key,
        type: relationship.type,
        url: key,
        parentScope: parentScope,
        attrs: angular.copy(relationship.attributes),
        relationships: copyRelationships(relationship.relationships)
      };

      if (relationship.meta !== undefined) {
        if (relationship.meta.toMany === true) {
          typeObj.toMany = true;
        }

        if (typeof relationship.meta.constraint === 'object' && relationship.meta.constraint !== null) {
          typeObj.constraint = relationship.meta.constraint.resource;
        }
      }

      typeScope = Object.freeze(typeObj);

      typeScopeList.push(typeScope);
      parseTypescopes(relationship.relationships, path + '/' + key, typeScope, typeScopeList);
      key = keys.pop();
    }
  }
}
