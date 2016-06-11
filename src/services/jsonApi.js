angular
  .module('jsonApiManager')
  .factory('jamJsonApi', jamJsonApi);


jamJsonApi.$inject = ['jamUtil'];
function jamJsonApi(jamUtil) {
  var getKeys = Object.keys;
  var freeze = Object.freeze;
  var defineProperty = Object.defineProperty;

  var service = {
    parse: parse,
    format: format,
    combineData: combineData
  };
  return service;



  function combineData(oldData, newData, singleResource) {
    var combinedData = {};

    if (oldData === undefined) {
      if (singleResource !== true && !(newData.data instanceof Array)) {
        newData.data = newData.data === null ? [] : [angular.copy(newData.data)];
      }

      return newData;
    }

    // combine data
    if (oldData.data instanceof Array || newData.data instanceof Array) {
      combinedData.data = combineToArray(oldData.data, newData.data);
    } else {
      combinedData.data = combineToObject(oldData.data, newData.data);
    }

    if (singleResource !== true && !(combinedData.data instanceof Array)) {
      combinedData.data = combinedData.data === null ? [] : [angular.copy(combinedData.data)];
    }

    // combine included data
    combinedData.included = combineToArray(oldData.included, newData.included);

    return combinedData;
  }


  function combineToObject(oldData, newData) {
    if (oldData === null) { return newData; }
    if (newData === null) { return oldData; }

    if (oldData.id === newData.id) {
      return newData;
    } else {
      var arr = [];
      arr.push(oldData, newData);
      return arr;
    }
  }


  function combineToArray(oldData, newData) {
    if (oldData === undefined || oldData === null || oldData.length === 0) {
      if (newData === undefined || newData === null) { return []; }
      else { return [].concat(newData); }
    }
    if (newData === undefined || newData === null) { return oldData; }


    var i;
    var combinedArray = [].concat(oldData).concat(newData);
    var index = 0;
    var length = combinedArray.length;

    combinedArray = combinedArray.filter(function (item) {
      index += 1;
      i = index;
      while (i < length) {
        if (item.id === combinedArray[i].id) {
          return false;
        }

        i += 1;
      }

      return true;
    });

    return combinedArray;
  }



  // --- format ---------------------
  // --------------------------------

  function format(data, type, op, constraint, parentId) {
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

    if (constraint !== undefined) {
      obj.meta = {
        constraint: {
          id: parentId,
          resource: constraint
        }
      };
    }

    return obj;
  }





  // --- Parse ----------------------
  // --------------------------------

  function parse(payload, typeScopes) {
    if (payload.data === null || (payload.data instanceof Array && payload.data.length === 0)) {
      return {
        data: payload.data === null ? null : [],
        included: {}
      };
    }

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
    var relationshipKeys;
    var relationshipKey;

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

      // set relationships that are toMany(array) as empty arrays
      jamUtil.defaultRelationships(obj, obj.typescope.relationships);

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
    var relationshipKeys;
    var relationshipKey;
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

      // if no id then assume there is no data
      if (data.id !== undefined) {
        obj.id = data.id;
        defineProperty(obj, 'typescope', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: getTypescope(data.type, typeScopes)
        });

        // set relationships that are toMany(array) as empty arrays
        jamUtil.defaultRelationships(obj, obj.typescope.relationships);

        // link relationships
        getRelationships(obj, data.relationships, payloadIncluded, includes);
      }
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
}
