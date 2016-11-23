angular
  .module('jsonapi-manager')
  .factory('jamJSONAPI', jamJSONAPI);


jamJSONAPI.$inject = ['jamUtil'];
function jamJSONAPI(jamUtil) {
  var getKeys = Object.keys;
  var defineProperty = Object.defineProperty;

  var service = {
    parse: parse,
    combineData: combineData
  };
  return service;


  // takes jsonapi data and returns a plain javascirpt object with all includes memory referenced.
  // It also returns a object that its keys are types and they contain arrays of all resources of that type. These are the same objects in the data
  function parse(payload, typeScopes) {
    var typeList = {};
    var parsedData = buildData(payload.data, payload.included, typeScopes, typeList, '');
    return {
      data: parsedData,
      typeList: typeList
    };
  }


  // combine 2 sets of raw jsonapi data
  function combineData(oldData, newData) {
    var combinedData = {};

    // palce data in an array and pass it back if no old data exists
    if (oldData === undefined) {
      newData.data = newData.data === null ? [] : [angular.copy(newData.data)];
      return newData;
    }
    combinedData.data = combineToArray(oldData.data, [newData.data]);
    combinedData.included = combineToArray(oldData.included, newData.included);

    return combinedData;
  }
  // create one deduped array of jsonapi resources
  // objects can be passed in, they will be combined into an array
  function combineToArray(oldData, newData) {
    if (!oldData || !oldData.length) {
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
        if (item.id === combinedArray[i].id) { return false; }
        i += 1;
      }
      return true;
    });

    return combinedArray;
  }




  // return an object or array containing a nested object built from jsonapi data
  function buildData(data, included, typeScopes, destType, path, destData) {
    var newObj;
    var keys;
    var key;
    var i;
    var length;
    var includeItem;

    // if data is an array pass the sub abjects back in
    if (data instanceof Array) {
      destData = [];
      var item = data.pop();
      while (item !== undefined) {
        buildData(item, included, typeScopes, destType, path, destData);
        item = data.pop();
      }

    } else if (typeof data === 'object') {
      // add resouce
      newObj = data === null ? null : getResource(data, destType, typeScopes, path);
      if (destData instanceof Array) {
        destData.push(newObj);
      } else {
        destData = newObj;
      }

      // default all relationships and pass them back in for processing
      if (data && newObj && data.relationships) {
        keys = getKeys(data.relationships);
        key = keys.pop();
        while (key !== undefined) {
          if (data.relationships[key].data instanceof Array) {
            newObj[key] = []; // defualt value
            i = 0;
            length = data.relationships[key].data.length;
            while (i < length) {
              includeItem = getInclude(data.relationships[key].data[i], included, destType);
              buildData(includeItem, included, typeScopes, destType, path+'/'+key, newObj[key]);
              i += 1;
            }

          } else {
            newObj[key] = null; // defualt value
            includeItem = getInclude(data.relationships[key].data[i], included, destType);
            buildData(includeItem, included, typeScopes, destType, path+'/'+key, newObj[key]);
          }
          key = keys.pop();
        }
      }
    }

    return destData;
  }





  // gets include resource from typelist and if not found then it will pull it from the raw data
  function getInclude(obj, included, typeList) {
    if (!obj || !included) { return undefined; }
    var typeObj = findInTypeList(obj, typeList);
    if (typeObj !== undefined) { return typeObj; }

    var i = 0;
    var length = included.length;
    while (i < length) {
      if (included[i].type === obj.type && included[i].id === obj.id) {
        return included[i];
      }
      i += 1;
    }

    return undefined;
  }


  // gets resource from typelist or creates one and ads it to the type list and add a typeScope to it
  function getResource(obj, typeList, typeScopes, path) {
    if (obj === null) { return null; }
    if (obj.typeScope !== undefined) { return obj; }

    var newObj;
    var typeScope;
    var typeObj = findInTypeList(obj, typeList);
    // if typeObj exists then we will pass that same one back. This means objects used more than once are the same objects
    if (typeObj !== undefined) { return typeObj; }

    if (typeList[obj.type] === undefined) { typeList[obj.type] = []; }
    newObj = obj.attributes;
    newObj.id = obj.id;
    typeScope = getTypeScope(obj.type, typeScopes);
    jamUtil.defaultRelationships(newObj, typeScope);

    // add typeScope
    defineProperty(newObj, 'typeScope', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: typeScope
    });

    typeList[obj.type].push(newObj);
    return newObj;
  }


  // get typeScope by type name
  function getTypeScope(type, typeScopes) {
    if (typeScopes === undefined) { return undefined; }

    // try to match path
    var i = 0;
    var length = typeScopes.length;
    while (i < length) {
      if (typeScopes[i].type === type) { return typeScopes[i]; }
      i += 1;
    }
    return undefined;
  }


  // try to find a type by id, otherwise return undefined
  function findInTypeList(obj, typeList) {
    if (!obj || !typeList || !typeList[obj.type]) { return undefined; }

    typeList = typeList[obj.type];
    var i = 0;
    var length = typeList.length;
    while (i < length) {
      if (typeList[i].id === obj.id) { return typeList[i]; }
      i += 1;
    }
    return undefined;
  }
}
