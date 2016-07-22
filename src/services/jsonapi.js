angular
  .module('jsonapi-manager')
  .factory('jamJSONAPI', jamJSONAPI);


jamJSONAPI.$inject = ['jamUtil'];
function jamJSONAPI(jamUtil) {
  var getKeys = Object.keys;
  var freeze = Object.freeze;
  var defineProperty = Object.defineProperty;

  var service = {
    parse: parse,
    combineData: combineData
  };
  return service;



  function parse(payload, typeScopes) {
    var typeList = {};
    var parsedData = buildData(payload.data, payload.included, typeScopes, typeList);
    return {
      data: parsedData,
      typeList: typeList
    };
  }



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
        if (item.id === combinedArray[i].id) {
          return false;
        }

        i += 1;
      }

      return true;
    });

    return combinedArray;
  }





  function buildData(data, included, typeScopes, destType, destData) {
    var newObj;
    var keys;
    var key;
    var i;
    var length;
    var includeItem;


    if (data instanceof Array) {
      destData = [];
      var item = data.pop();
      while (item !== undefined) {
        buildData(item, included, typeScopes, destType, destData);
        item = data.pop();
      }

    } else if (typeof data === 'object') {
      newObj = data === null ? null : getResource(data, destType, typeScopes);
      if (destData instanceof Array) {
        destData.push(newObj);
      } else {
        destData = newObj;
      }

      if (data && newObj && data.relationships) {
        keys = Object.keys(data.relationships);
        key = keys.pop();
        while (key !== undefined) {
          if (data.relationships[key].data instanceof Array) {
            newObj[key] = []; // defualt value
            i = 0;
            length = data.relationships[key].data.length;
            while (i < length) {
              includeItem = getInclude(data.relationships[key].data[i], included, destType);
              buildData(includeItem, included, typeScopes, destType, newObj[key]);
              i += 1;
            }

          } else {
            newObj[key] = null; // defualt value
            includeItem = getInclude(data.relationships[key].data[i], included, destType);
            buildData(includeItem, included, typeScopes, destType, newObj[key]);
          }
          key = keys.pop();
        }
      }
    }

    return destData;
  }





  // gets include resource from typelist and if not found then it will pull it from the raw data
  function getInclude(obj, included, typeList) {
    if (!obj && !included) { return undefined; }
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
  function getResource(obj, typeList, typeScopes) {
    if (obj === null) { return null; }
    if (obj.typeScope !== undefined) { return obj; };

    var newObj;
    var typeObj = findInTypeList(obj, typeList);
    if (typeObj !== undefined) { return typeObj; }

    if (typeList[obj.type] === undefined) { typeList[obj.type] = []; }
    newObj = obj.attributes;
    newObj.id = obj.id;

    // add typeScope here
    defineProperty(newObj, 'typeScope', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: gettypeScope(obj.type, typeScopes)
    });

    typeList[obj.type].push(newObj);
    return newObj;
  }


  function gettypeScope(type, typeScopes) {
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



  function findInTypeList(obj, typeList) {
    if (!typeList || !typeList[obj.type] || !obj) { return undefined; }

    typeList = typeList[obj.type];
    var i = 0;
    var length = typeList.length;
    while (i < length) {
      if (typeList[i].id === obj.id) {
        return typeList[i];
      }
      i += 1;
    }

    return undefined;
  }
}
