angular
  .module('jsonApiManager')
  .factory('jamJsonApi', jamJsonApi);


function jamJsonApi() {
  var getKeys = Object.keys;
  var freeze = Object.freeze;
  var defineProperty = Object.defineProperty;

  var service = {
    parse: parse,
    format: format
  };
  return service;





  // --- format ---------------------
  // --------------------------------

  function format(data, type, op, constrain, parentId) {
    op = op || 'add';
    var obj = {};

    if (op === 'add' || op === 'replace') {
      obj.data = {
        id: data.id,
        type: type,
        attributes: angular.copy(data)
      };

      if (obj.data.attributes.id !== undefined) {
        delete obj.data.attributes.id;
      }

    } else if (op === 'relationship' || op === 'removeRelationship') {
      obj.data = angular.copy(data);
    }

    if (constrain === true) {
      obj.meta = {
        parentId: parentId
      };
    }

    return obj;
  }





  // --- Parse ----------------------
  // --------------------------------


  function parse(payload, typeScopes) {
    var included = organizeIncluded(payload.included, typeScopes);

    return {
      data: buildData(payload.data, payload.included, included, typeScopes),
      included: included
    };
  }


  function organizeIncluded(data, typeScopes) {
    var i;
    var length;
    var included;
    var type;
    var obj;

    if (data === undefined) { return undefined; }

    included = {};
    i = 0;
    length = data.length;

    while (i < length) {
      type = data[i].type;

      if (included[type] === undefined) {
        included[type] = [];
      }

      obj = { id: data[i].id };
      defineProperty(obj, 'typescope', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: getTypescope(type, typeScopes)
      });

      included[type].push(angular.extend(obj, data[i].attributes));

      i++;
    }

    return included;
  }

  function getTypescope(type, typeScopes) {
    if (typeScopes === undefined) { return undefined; }

    var i = 0;
    var length = typeScopes.length;

    while (i < length) {
      if (typeScopes[i].type === type) {
        return typeScopes[i];
      }

      i += 1;
    }

    return undefined;
  }






  // --- Build Data ---------------
  // buildData(payload.data, payload.included, included, typeScopes);
  function buildData(data, payloadIncluded, includes, typeScopes, obj) {
    var popped;
    var isArray = (data instanceof Array);
    if (obj === undefined && isArray === true) {
      obj = [];
    }

    // loop through data array
    if (isArray === true && data.length === 0) { return []; }
    if (isArray === true) {
      popped = data.pop();
      while (popped !== undefined) {
        obj.push(buildData(popped, payloadIncluded, includes, typeScopes));
        popped = data.pop();
      }

    // link object to attrs
    } else {
      obj = data.attributes || {};
      obj.id = data.id;
      defineProperty(obj, 'typescope', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: getTypescope(data.type, typeScopes)
      });

      // link relationships
      getRelationships(obj, data.relationships, payloadIncluded, includes);
    }

    return obj;
  }



  function getRelationships(obj, relationships, payloadIncluded, includes) {
    obj = obj || {};
    relationships = relationships || {};

    getKeys(relationships).forEach(function (key) {
      obj[key] = getRelationship(relationships[key], payloadIncluded, includes);
    });
  }

  function getRelationship(relationship, payloadIncluded, includes) {
    var obj;
    var isArray;
    var origSubObj;

    if (relationship === undefined || relationship.data === undefined) { return undefined; }
    if (relationship.data === null) { return null; }

    isArray = (relationship.data instanceof Array);
    if (isArray === false && getKeys(relationship.data).length === 0) { return {}; }
    if (isArray === true && relationship.data.length === 0) { return []; }

    if (isArray === true) {
      obj = [];
      relationship.data.forEach(function (item) {
        var subobj = getIncluded(item, includes);
        origSubObj = getOriginalIncluded(item, payloadIncluded);
        getRelationships(subobj, origSubObj.relationships, payloadIncluded, includes);
        obj.push(subobj);
      });

    } else {
      obj = getIncluded(relationship.data, includes);
      origSubObj = getOriginalIncluded(relationship.data, payloadIncluded);
      getRelationships(obj, origSubObj.relationships, payloadIncluded, includes);
    }

    return obj;
  }

  function getIncluded(data, includes) {
    var i = 0;
    var includeByType = includes[data.type] || [];
    var length = includeByType.length;

    while (i < length) {
      if (includeByType[i].id === data.id) {
        return includeByType[i];
      }
      i++;
    }

    return null;
  }

  function getOriginalIncluded(data, includes) {
    includes = includes || [];
    var i = 0;
    var length = includes.length;

    while (i < length) {
      if (includes[i].id === data.id && includes[i].type === data.type) {
        return includes[i];
      }
      i++;
    }

    return null;
  }







  // --- Combine Scopes ----------------------

  // TODO how do i add the typscops from the config that do not exist in the jsonapi
  //      this will require relating parent scopes correctly
  function combineTypescopes(main, sub) {
    var i;
    var length = sub.length;

    // overide from user input
    main = main.map(function (item) {
      i = 0;
      while (i < length) {
        if (sub[i].map === item.map && sub[i].type === item.type) {
          freeze(sub[i]);
          return sub[i];
        }

        i += 1;
      }

      freeze(item);
      return item;
    });


    // combine

    if (main.length < sub.length) {
      length = main.length;
      sub.forEach(function (item) {
        var isFound = false;
        i = 0;
        while (i < length) {
          if (main[i].map === item.map && main[i].type === item.type) {
            isFound = true;
            break;
          }

          i += 1;
        }

        if (isFound === false) {
          main.push(item);
        }
      });
    }

    return main;
  }






  // --- Build Scopes ----------------------


  function buildTypescopes(payload) {
    var keys;
    var key;
    var j;
    var relationLength;
    var parentScope;
    var type;
    var i = 0;
    var data = [].concat(payload.data);
    var length = payload.included !== undefined ? payload.included.length : 0;
    var scopes = [];

    // root scope
    scopes.push({
      map: '',
      // TODO if data is an array then loop through it with the assumption that not all the types are the same
      type: data[0].type,
      urls: {
        url: '/' + data[0].type
      }
    });

    // root relations
    keys = Object.keys(data[0].relationships || {});
    key = keys.pop();

    while (key !== undefined) {
      type = getTypeFromRelation(data[0].relationships[key]);

      if (containsScope(scopes, type) === false) {
        parentScope = getScopeByType(scopes, data[0].type);
        scopes.push({
          map: (parentScope.map + '/' + key).replace(/^\//, ''),
          prop: key,
          type: type,
          urls: {
            // TODO can i use prop for the url?
            url: '/' + key
          },
          parentScope: parentScope,
          parentRelationshipMany: (data[0].relationships[key].data instanceof Array)
        });
      }

      key = keys.pop();
    }



    // include relation scopes
    while (i < length) {
      if (payload.included[i].relationships !== undefined) {
        keys = Object.keys(payload.included[i].relationships);
        key = keys.pop();

        while (key !== undefined) {
          type = getTypeFromRelation(payload.included[i].relationships[key]);
          if (containsScope(scopes, type) === false) {
            parentScope = getScopeByType(scopes, payload.included[i].type);
            if (parentScope !== undefined) {
              scopes.push({
                map: (parentScope.map + '/' + key).replace(/^\//, ''),
                prop: key,
                type: type,
                urls: {
                  // TODO can i use prop for the url?
                  url: '/' + key
                },
                parentScope: parentScope,
                parentRelationshipMany: (payload.included[i].relationships[key].data instanceof Array)
              });
            }
          }

          key = keys.pop();
        }
      }

      i += 1;
    }

    return scopes;
  }

  function getTypeFromRelation(relation) {
    if (relation.meta !== undefined && relation.meta.type !== undefined) {
      return relation.meta.type;
    }

    if (relation.data instanceof Array && relation.data.length > 0) {
      return relation.data[0].type;
    } else if (typeof relation.data === 'object' && relation.data !== null) {
      return relation.data.type;
    }
  }

  function getScopeByType(arr, type) {
    var i = 0;
    var length = arr.length;

    while (i < length) {
      if (arr[i].type === type) { return arr[i]; }
      i += 1;
    }

    return undefined;
  }

  function containsScope(arr, type) {
    var i = 0;
    var length = arr.length;

    while (i < length) {
      if (arr.type === type) { return true; }
      i += 1;
    }

    return false;
  }
}
