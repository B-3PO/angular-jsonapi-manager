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

      // default relationship object/array
      if (obj.typescope.relationships) {
        relationshipKeys = Object.keys(obj.typescope.relationships);
        relationshipKey = relationshipKeys.pop();
        while (relationshipKey !== undefined) {
          obj[relationshipKey] = obj.typescope.relationships[relationshipKey].toMany === true ? [] : {};
          relationshipKey = relationshipKeys.pop();
        }
      }

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
      obj.id = data.id;
      defineProperty(obj, 'typescope', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: getTypescope(data.type, typeScopes)
      });

      // default relationship object/array
      if (obj.typescope.relationships) {
        relationshipKeys = Object.keys(obj.typescope.relationships);
        relationshipKey = relationshipKeys.pop();
        while (relationshipKey !== undefined) {
          obj[relationshipKey] = obj.typescope.relationships[relationshipKey].toMany === true ? [] : {};
          relationshipKey = relationshipKeys.pop();
        }
      }

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
}
