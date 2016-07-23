angular
  .module('jsonapi-manager')
  .factory('jamPatch', jamPatch);


jamPatch.$inject = ['jamUtil'];
function jamPatch(jamUtil) {
  var keyIndex = 0;
  var service = {
    diff: diff,
    // apply: apply
  };
  return service;


  // returns an array of pathces for adds,removes, and replaces(updates)
  function diff(options, reverse) {
    var patches = [];
    if (reverse === true) {
      generatePataches(options.oldValue, angular.copy(options.data), patches, '', options.typeScopes);
    } else {
      generatePataches(options.data, angular.copy(options.oldValue), patches, '', options.typeScopes);
    }
    // TODO rearange the relationships based on beans implamentation
    return reduceReplaces(patches);
  }




  // by default the patcher will produce individual repalces for each object property
  // this function will combine them into one replace patch
  function reduceReplaces(arr) {
    var idObj = {};
    arr.forEach(function (item) {
      if (item.id === undefined) {
        idObj[nextKey()] = item;
        return;
      }
      if (idObj[item.id] === undefined) {
        idObj[item.id] = item;
        return;
      }
      if (idObj[item.id].op === 'replace') {
        angular.extend(idObj[item.id].attributes, item.attributes);
        angular.extend(idObj[item.id].oldAttributes, item.oldAttributes);
      }
    });
    return Object.keys(idObj).map(function (key) { return idObj[key]; });
  }
  // create dummy keys if no uuid was generated. this is only used internally in this service
  function nextKey() {
    return '' + keyIndex++;
  }



  function generatePataches(newValue, oldValue, patches, path, typeScopeList, parentId) {
    var i;
    var j;
    var isObj;
    var oldKey;
    var newKey;
    var oldSub;
    var newSub;
    var patch;
    var changed;
    var typeScope;
    var relationshipKeys;
    var lengthDiff = 0;
    var oldKeys = getKeys(oldValue);
    var newKeys = getKeys(newValue);
    var oldLength = oldKeys.length;
    var newLength = newKeys.length;
    var newIsArray = newValue instanceof Array;
    var oldIsArray = oldValue instanceof Array;



    // --- deletions ---
    if (oldLength !== newLength) {
      lengthDiff = Math.abs(oldLength - newLength);
      while (i < oldLength) {
        oldKey = oldKeys[i];
        oldSub = oldValue[oldKey];
        i += 1;
        if (!oldSub || typeof oldSub !== 'object' || oldSub.typeScope === undefined) { continue; }
        if (newIsArray && findById(oldSub.id, newValue) !== undefined) {
          oldValue.splice(i, 1); // remove oldValue so it is not looped over again
          i -= 1; // set back the counter because of oldValue removal
          oldLength -= 1; // set back the length because of oldValue removal
          lengthDiff -= 1; // set back the difference length because we know one of the differences is a delete and it has been handled

          patches.push({
            op: 'remove',
            path: path,
            resource: resourceClone(oldSub, path, typeScopeList),
            parentId: parentId
          });
        }
      }
    }



    // --- additions ---
    oldLength = oldKeys.length;
    if (lengthDiff > 0) {
      i = 0;
      while (i < newLength) {
        newKey = newKeys[i];
        newSub = newValue[newKey];
        i += 1;
        j = 0;
        isObj = typeof newSub === 'object' && newSub !== null;
        changed = true;
        while (j < oldLength) {
          oldKey = oldKeys[j];
          oldSub = oldValue[oldKey];
          j += 1;

          // check for added objects by id
          if (newIsArray) {
            if (isObj && typeof oldSub === 'object' && oldSub !== null && newSub.typeScope && newSub.id === oldSub.id) {
              changed = false;
              break;
            }

          // parent are objects to check for added keys
          } else if (newKey === oldKey) {
            changed = false;
            break;
          }
        }


        if (changed === true) {
          // create add if parent is an array
          if (newIsArray) {
            patch = {
              op: 'add',
              path: path,
              // reference: newObj,
              parentId: parentId
            };

            if (newSub.typeScope === undefined) {
              typeScope = jamUtil.getTypeScopeByPath(path, typeScopeList);
              Object.defineProperty(newSub, 'typeScope', {
                enumerable: false,
                configurable: false,
                writable: false,
                value: typeScope
              });
              patch.new = true;
            }

            patch.resource = resourceClone(newSub, path, typeScopeList);
            if (newSub.typeScope.relationships) {
              var relKeys = Object.keys(newSub.typeScope.relationships);
              var relKey = relKeys.pop();
              while (relKey !== undefined) {
                if (newSub[relKey] !== undefined && oldSub[relKey] !== undefined) {
                  generatePataches(newSub[relKey], oldSub[relKey], patches, path + '/' + relKey, typeScopeList, newSub.id);
                }
                relKey = relKeys.pop();
              }
            }

            patches.push(patch);

          // create replace if the parent is an object
          } else {
            patch = {
              op: 'replace',
              path: path,
              id: oldValue.id,
              type: newValue.typeScope.type,
              parentId: parentId,
              attributes: {},
              oldAttributes: {}
            };
            patch.attributes[newKey] = angular.copy(newSub);
            patches.push(patch);
          }
        }
      }
    }



    // --- replaces ----
    // try to get typScope and a list of its relations from parent new value
    // this will onyl exist if the parent is a resource
    typeScope = typeof newValue === 'object' && newValue !== null ? newValue.typeScope : undefined;
    relationshipKeys = typeScope && typeScope.relationships ? Object.keys(typeScope.relationships) : [];

    i = 0;
    while (i < oldLength) {
      oldKey = oldKeys[i];
      oldSub = oldValue[oldKey];
      i += 1;

      // if oldSub is either an array or object
      if (oldIsArray && oldSub) {
        newSub = findById(oldSub.id, newValue); // try to find a matching resource by its id
        if (newSub) {
          generatePataches(newSub, oldSub, patches, path, typeScopeList, oldValue instanceof Array ? parentId : oldValue.id);
        }
      } else {
        // if property is a relationship
        if (relationshipKeys.indexOf(oldKey) !== -1) {
          generatePataches(newValue[oldKey], oldValue[oldKey], patches, oldValue instanceof Array ? path : path + '/' + escapePath(oldKey), typeScopeList, oldValue.id);

        // add miss matches to patch
        } else if (angular.equals(oldSub, newValue[oldKey]) === false) {
          patch = {
            op: 'replace',
            path: path,
            id: oldValue.id,
            type: typeScope.type,
            parentId: parentId,
            attributes: {},
            oldAttributes: {}
          };
          patch.attributes[oldKey] = angular.copy(newValue[oldKey]);
          patch.oldAttributes[oldKey] = angular.copy(oldSub);
          patches.push(patch);
        }
      }
    }
  }




  // find an object by given id or return undefined
  function findById(id, arr) {
    if (id === undefined || !(arr instanceof Array)) { return undefined; }
    var i = 0;
    var length = arr.length;
    while (i < length) {
      if (arr[i] && arr[i].id === id) {
        return arr[i];
      }
      i += 1;
    }
    return undefined;
  }




  // return jsonapi resouce based on changes
  function resourceClone(obj, path, typeScopeList) {
    if (obj.id === undefined) { obj.id = jamUtil.generateUUID(); } // add uuid if none exists. this should onyl apply to newely created resources
    var typeScope = obj.typeScope;
    var typeRelationships = typeScope && typeScope.relationships ? Object.keys(typeScope.relationships) : [];
    var resource = {
      id: obj.id,
      type: typeScope ? typeScope.type : undefined
    };

    // copy attributes
    getKeys(obj).filter(function (key) {
      return typeRelationships.indexOf(key) === -1;
    }).forEach(function (key) {
      if (resource.attributes === undefined) { resource.attributes = {}; }
      // only run copy on objects for performance
      resource.attributes[key] = typeof obj[key] !== 'object' ? obj[key] : angular.copy(obj[key]);
    });

    // copy relationships
    typeRelationships.forEach(function (key) {
      if (obj[key] === undefined) { return; }
      typeScope = jamUtil.getTypeScopeByPath(path+'/'+key, typeScopeList);
      if (resource.relationships === undefined) { resource.relationships = {}; }

      // multiple relationships
      if (obj[key] instanceof Array) {
        resource.relationships[key] = {
          data: obj[key].map(function (item) {
            if (item.id === undefined) { item.id = jamUtil.generateUUID(); } // add uuid if none exists. this should onyl apply to newely created relations
            return {
              id: item.id,
              type: typeScope.type // TODO handle case when no typeScope exists
            };
          })
        };

      // single relationship
      } else {
        if (obj[key].id === undefined) { obj[key].id = jamUtil.generateUUID(); } // add uuid if none exists. this should onyl apply to newely created relations
        resource.relationships[key] = {
          data: {
            id: obj[key].id,
            type: typeScope.type // TODO handle case when no typeScope exists
          }
        };
      }
    });

    return resource;
  }





  // --- Get keys for object or array ---
  // for arrays it will return an array of ints
  // for objects it will filter out `id` and any keys that begin with `$$`(mostly for angular)
  function getKeys(obj) {
    var i;
    var length;
    var keys;

    // array
    if (obj instanceof Array) {
      i = 0;
      length = obj.length;
      keys = new Array(length);
      while (i < length) {
        keys[i] = i;
        i += 1;
      }
      return keys;
    }

    // object
    keys = Object.keys(obj).filter(function (key) {
      return key !== 'id' && key.indexOf('$$') !== 0;
    });
    return keys;
  }


  // --- escpae path ~, / ---
  function escapePath(str) {
    if (str.indexOf('/') === -1 && str.indexOf('~') === -1) {
      return str;
    }
    return str.replace(/~/g, '~0').replace(/\//g, '~1');
  }
}
