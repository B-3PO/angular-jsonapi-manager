angular
  .module('jsonapi-manager')
  .factory('jamPatch', jamPatch);


jamPatch.$inject = ['jamUtil'];
function jamPatch(jamUtil) {
  var getKeys = Object.keys;
  var reversePatchFuncs = {
    update: reverseUpdate,
    add: reverseAdd,
    delete: reverseDelete,
    relationship: reverseRelationship,
    'delete-relationship': reverseDeleteRelationship
  };

  var service = {
    diff: diff,
    apply: apply
  };
  return service;



  // --- Diff ---------------------------------------
  // ------------------------------------------------


  function apply(options, patches, reverse) {
    if (reverse === true) {
      patches = reversePatches(patches);
    }

    var i = 0;
    var length = patches.length;
    while (i < length) {
      if (options.data instanceof Array) {
        applyArray(options.data, patches[i], '', options);
      } else {
        applyObject(options.data, patches[i], '', options);
      }
      i += 1;
    }
  }


  function applyArray(data, patch, path, options) {
    var i;
    var length;

    if (patch.path === path) {
      if (patch.op === 'add') {
        applyAddPath(patch, data, path, options);
        applyRelationships(data, patch, options.typeList);
        return true;

      // find and splice out resource
      } else if (patch.op === 'delete') {
        applyArrayDeletePatch(data, patch, options);
        return true;
      }
    }

    // run patch apply on objects
    i = 0;
    length = data.length;
    while (i < length) {
      if (applyObject(data[i], patch, path, options) === true) { return true; }
      i += 1;
    }
  }

  function applyObject(data, patch, path, options) {
    if (typeof data !== 'object' || data === null || data.id === undefined) { return; }
    path = formatPath(path, data.id);
    if (patch.path === path) {
      if (patch.op === 'update' && patch.resource.id === data.id) {
        applyUpdatePatch(data, patch);
        applyRelationships(data, patch, options.typeList);
        return true;
      } else if (patch.op === 'relationship' && patch.resource.id === data.id) {
        applyRelationships(data, patch, options.typeList);
        return true;
      } else if (patch.op === 'delete' && patch.resource.id === data.id) {
        console.error('how did i get here', patch);
        // applyDeletePatch(data, patch, options);
        // return true;
      }
    }



    var nextPath;
    var keys = getFilteredKeys(data);
    var key = keys.pop();
    while (key !== undefined) {
      nextPath = formatPath(path, key);

      if (patch.path === nextPath && patch.op === 'delete-relationship') {
        applyDeleteRelationshipsPatch(data, patch, options);
        return true;
      }

      if (data[key] instanceof Array) {
        if (applyArray(data[key], patch, nextPath, options) === true) { return true; }
      } else {
        if (applyObject(data[key], patch, nextPath, options) === true) { return true; }
      }

      key = keys.pop();
    }
  }



  function applyDeletePatch(data, patch, options) {

  }

  function applyUpdatePatch(data, patch) {
    if (patch.resource.attributes && getKeys(patch.resource.attributes).length) {
      angular.merge(data, patch.resource.attributes);
    }
  }

  function applyDeleteRelationshipsPatch(data, patch, options) {
    var key = patch.path.split('/').pop();
    if (patch.resource.data instanceof Array) {
      if (data[key] === undefined) { return; }
      patch.resource.data.forEach(function (patchData) {
        var i = 0;
        var length = data[key].length;
        while (i < length) {
          if (data[key][i].id === patchData.id) {
            data[key].splice(i, 1);
            return;
          }
          i += 1;
        }
      });
    } else {
      data[key] = null;
      checkForRemovalFromTypeList(patch.resource.data.id, patch.resource.data.type, options);
    }
  }

  function checkForRemovalFromTypeList(id, type, options) {
    var i;
    var length;

    if (traverseForResource(options.data, id, type) !== true) {
      i = 0;
      length = options.typeList[type].length;
      while (i < length) {
        if (options.typeList[type][i].id === id) {
          options.typeList[type].splice(i, 1);
          return;
        }
        i += 1;
      }
    }
  }

  function applyArrayDeletePatch(data, patch, options) {
    var i = 0;
    var length = data.length;
    while (i < length) {
      if (data[i].id === patch.resource.id) {
        data.splice(i, 1);
        checkForRemovalFromTypeList(patch.resource.id, patch.resource.type, options);
        return;
      }
      i += 1;
    }
  }

  function applyAddPath(patch, data, path, options) {
    var obj = angular.copy(patch.resource.attributes);
    obj.id = patch.resource.id;
    Object.defineProperty(obj, 'typeScope', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: jamUtil.getTypeScopeByPath(path, options.typeScopes)
    });
    options.typeList[patch.resource.type].push(obj);
    data.push(obj);
  }

  function applyRelationships(data, patch, typeList) {
    var relKeys = getKeys(patch.resource.relationships || {});
    relKeys.forEach(function (key) {
      if (patch.resource.relationships[key].data instanceof Array) {
        data[key] = data[key] || [];
        patch.resource.relationships[key].data.forEach(function (sub) {
          data[key].push(findById(sub.id, typeList[sub.type]));
        });
      } else {
        data[key] = findById(patch.resource.relationships[key].data.id, typeList[patch.resource.relationships[key].data.type]);
      }
    });
  }


  function reversePatches(patches) {
    return patches.map(function (patch) {
      return reversePatchFuncs[patch.op](patch);
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []);
  }

  function reverseUpdate(patch) {
    var newPatch = angular.copy(patch);
    newPatch.resource.attributes = patch.resource.oldAttributes;
    newPatch.resource.oldAttributes = patch.resource.attributes;
    return newPatch;
  }

  function reverseAdd(patch) {
    patch.op = 'delete';
    return patch;
  }

  function reverseDelete(patch) {
    patch.op = 'add';
    return patch;
  }

  function reverseRelationship(patch) {
    var newPatches = [];

    getKeys(patch.resource.relationships).forEach(function (key) {
      if (patch.resource.relationships[key].data instanceof Array) {
        patch.resource.relationships[key].data.forEach(function (sub) {
          newPatches.push({
            op: 'delete-relationship',
            path: patch.path+'/'+key,
            url: patch.url+'/'+patch.resource.id+'/relationships/'+key,
            resource: {
              id: sub.id,
              type: sub.type,
              data: [{
                id: sub.id,
                type: sub.type
              }]
            }
          });
        });
      } else {
        newPatches.push({
          op: 'delete-relationship',
          path: patch.path+'/'+key,
          url: patch.url+'/'+patch.resource.id+'/relationships/'+key,
          resource: {
            id: patch.resource.relationships[key].data.id,
            type: patch.resource.relationships[key].data.type,
            data: patch.resource.relationships[key].data
          }
        });
      }
    });
    return newPatches;
  }

  function reverseDeleteRelationship(patch) {
    var splitUrl = patch.url.split('/');
    var url = splitUrl.shift();
    var id = splitUrl.shift();
    var key = splitUrl.pop();
    var newPatch = {
      op: 'relationship',
      path: patch.path.split('/').shift(),
      url: patch.url.split('/').shift(),
      resource: {
        id: id,
        // type: jamUtil.getTypeScopeByPath(patch.path, typeScopeList),
        relationships: {}
      }
    };
    newPatch.resource.relationships[key] = {
      data: patch.resource.data
    };
    return newPatch;
  }










  // --- Diff ---------------------------------------
  // ------------------------------------------------


  function diff(options) {
    var patches = [];
    generatePataches(options.data, options.oldValue, patches, '', options);
    patches = reducePatches(patches, options.data);
    return patches;
  }


  function reducePatches(patches, data) {
    var obj = {};
    patches.forEach(function (patch) {
      if (obj[patch.resource.id] === undefined) {
        obj[patch.resource.id] = patch;
      } else {
        // combine updates
        if (patch.op === 'update' && obj[patch.resource.id].op === 'update') {
          angular.extend(obj[patch.resource.id].resource.attributes, patch.resource.attributes);
          angular.extend(obj[patch.resource.id].resource.oldAttributes, patch.resource.oldAttributes);

        // combine relationships
        } else if (patch.op === 'relationship' && obj[patch.resource.id].op === 'relationship') {
          angular.merge(obj[patch.resource.id].resource.relationships, patch.resource.relationships);

        // combine relationships
        } else if (patch.op === 'delete-relationship' && obj[patch.resource.id].op === 'delete-relationship') {
          angular.merge(obj[patch.resource.id].resource.data, patch.resource.data);

        // combine a match of update and relationship
        } else if ((patch.op === 'update' || patch.op === 'relationship') && (obj[patch.resource.id].op === 'update' || obj[patch.resource.id].op === 'relationship')) {
          if (obj[patch.resource.id].op === 'update') {
            obj[patch.resource.id].resource.relationships = patch.resource.relationships;
          } else {
            patch.resource.relationships = obj[patch.resource.id].resource.relationships;
            obj[patch.resource.id] = patch;
          }

        // combine add with relationships
        } else if ((patch.op === 'add' || patch.op === 'relationship') && (obj[patch.resource.id].op === 'add' || obj[patch.resource.id].op === 'relationship')) {
          if (obj[patch.resource.id].op === 'add') {
            obj[patch.resource.id].resource.relationships = patch.resource.relationships;
          } else {
            patch.resource.relationships = obj[patch.resource.id].resource.relationships;
            obj[patch.resource.id] = patch;
          }
        }
      }
    });
    // convert object to array
    return getKeys(obj).map(function (key) { return obj[key]; });
  }


  function generatePataches(newValue, oldValue, patches, path, options, parent) {
    if (oldValue instanceof Array) {
      diffArray(newValue, oldValue, patches, path, options, parent);
    } else {
      diffObj(newValue, oldValue, patches, path, options, parent);
    }
  }


  // expects an array of resource objects
  function diffArray(newValue, oldValue, patches, path, options, parent) {
    var oldSub;
    var newSub;
    var newLength;
    var typeScope;
    var match;
    var i = 0;
    var oldLength = oldValue.length;

    // deletes
    while (i < oldLength) {
      oldSub = oldValue[i];
      i += 1;
      if (!oldSub || typeof oldSub !== 'object' || oldSub.id === undefined) { continue; }
      typeScope = oldSub.typeScope || jamUtil.getTypeScopeByPath(path, options.typeScopes);
      if (typeScope === undefined) {
        console.error('Cannot find matching typeScope for resource');
        continue;
      }

      // cannot find matching resource in new data, create delete patch
      if (findById(oldSub.id, newValue) === undefined) {
        patches.push(createDeletePatch(oldSub, path, typeScope, options, parent));
        i -= 1;
        oldLength -= 1;
        oldValue.splice(i, 1);
      }
    }


    // aditions
    i = 0;
    newLength = newValue.length;
    oldLength = oldValue.length;
    while (i < newLength) {
      newSub = newValue[i];
      i += 1;
      if (!newSub || typeof newSub !== 'object') { continue; }
      // if no typeScope exists then try to find a match
      if (newSub.typeScope === undefined) {
        typeScope = jamUtil.getTypeScopeByPath(path, options.typeScopes);
        if (typeScope !== undefined) {
          setupNewResource(newSub, typeScope);
          diffNewResource(newSub, patches, path, options);
          diffObj(newSub, null, patches, path, options, parent);
        } else {
          console.error('Cannot find matching typeScope for resource');
        }
      } else if (parent && findById(newSub.id, oldValue) === undefined) {
        patches.push(createAddRelationshipPatch(newSub, path, parent));
      }
    }


    // recusive check
    i = 0;
    while (i < oldLength) {
      oldSub = oldValue[i];
      i += 1;

      // only run on existing resource objects
      if (!oldSub || typeof oldSub !== 'object') { continue; }
      match = findById(oldSub.id, newValue);
      if (match !== undefined) {
        generatePataches(match, oldSub, patches, path, options, parent);
      }
    }
  }


  function diffNewResource(obj, patches, path, options) {
    var keys = getFilteredKeys(obj);
    var key = keys.pop();
    var relKeys = obj.typeScope.relationships ? getKeys(obj.typeScope.relationships) : [];

    while (key !== undefined) {
      // check for chanes in relationships
      if (relKeys.indexOf(key) !== -1) {
        generatePataches(obj[key], obj[key] instanceof Array ? [] : null, patches, (path+'/'+obj.id+'/'+key).replace(/^\//, ''), options, obj);
      }
      key = keys.pop();
    }
  }



  function diffObj(newValue, oldValue, patches, path, options, parent) {
    var key;
    var relKeys;
    var newSub;
    var oldSub;
    var newKeys;
    var oldKeys;

    // add
    if (!oldValue && newValue) {
      patches.push(createAddPatch(newValue, path, newValue.typeScope));
      if (parent) {
        patches.push(createAddRelationshipPatch(newValue, path, parent));
      }
      return;
    // delete
    } else if (!newValue && oldValue) {
      patches.push(createDeletePatch(oldValue, path, jamUtil.getTypeScopeByPath(path, options.typeScopes), options, parent));
      return;
    }

    newKeys = newValue ? getFilteredKeys(newValue) : [];
    oldKeys = oldValue ? getFilteredKeys(oldValue) : [];
    if (oldKeys.length < newKeys.length) {
      // TODO figure out how to handle this situation
      // should i allow this or should i require the allowed attrs to be in the schema
      console.error('Unexpected addition of properties to resource. No updates will be sent to the server for these changes');
    }

    key = oldKeys.pop();
    relKeys = newValue.typeScope.relationships ? getKeys(newValue.typeScope.relationships) : [];
    while (key !== undefined) {
      oldSub = oldValue[key];
      newSub = newValue[key];

      // check for chanes in relationships
      if (relKeys.indexOf(key) !== -1) {
        generatePataches(newSub, oldSub, patches, (path+'/'+newValue.id+'/'+key).replace(/^\//, ''), options, newValue);

      // if previous resource exists and items do not match
      } else if (oldSub !== newSub || angular.equals(oldSub, newSub) === false) {
        patches.push(createUpdatePatch(newValue, newSub, oldSub, key, path));
      }
      key = oldKeys.pop();
    }
  }



  function setupNewResource(obj, typeScope) {
    if (obj.id === undefined) { obj.id = jamUtil.generateUUID(); } // add uuid if none exists. this should onyl apply to newely created resources
    Object.defineProperty(obj, 'typeScope', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: typeScope
    });
  }

  function createUpdatePatch(obj, newValue, oldValue, key, path) {
    var patch = {
      op: 'update',
      path: (path+'/'+obj.id).replace(/^\//, ''),
      url: obj.typeScope.url,
      resource: {
        id: obj.id,
        type: obj.typeScope.type,
        attributes: {},
        oldAttributes: {}
      }
    };
    patch.resource.attributes[key] = typeof newValue !== 'object' ? newValue : angular.copy(newValue);
    patch.resource.oldAttributes[key] = typeof oldValue !== 'object' ? oldValue : angular.copy(oldValue);
    return patch;
  }

  function createAddRelationshipPatch(obj, path, parent) {
    var key = path.split('/').pop();
    var patch = {
      op: 'relationship',
      path: path.replace('/'+key, ''),
      url: parent.typeScope.url,
      resource: {
        id: parent.id,
        type: parent.typeScope.type,
        relationships: {}
      }
    };
    patch.resource.relationships[key] = {data: {
      id: obj.id,
      type: obj.typeScope.type
    }};
    if (parent.typeScope.relationships[key].meta.toMany) {
      patch.resource.relationships[key].data = [patch.resource.relationships[key].data];
    }
    return patch;
  }

  function createAddPatch(obj, path, typeScope) {
    return {
      op: 'add',
      path: path,
      url: typeScope.url,
      resource: convertToResource(obj, typeScope)
    };
  }
  function createDeletePatch(obj, path, typeScope, options, parent) {
    if (parent) {
      var key = path.split('/').pop();
      var patch = {
        op: 'delete-relationship',
        path: path,
        url: formatPath(parent.typeScope.url, parent.id) + '/relationships/' + key,
        resource: {
          id: obj.id,
          type: typeScope.type,
          data: {
            id: obj.id,
            type: typeScope.type,
          }
        }
      };
      if (parent[key] instanceof Array) {
        patch.resource.data = [patch.resource.data];
      }
      return patch;
    } else {
      return {
        op: 'delete',
        path: path,
        url: typeScope.url,
        inUse: traverseForResource(options.data, obj.id, typeScope.type) === true,
        resource: convertToResource(obj, typeScope)
      };
    }
  }

  function convertToResource(obj, typeScope) {
    return {
      id: obj.id,
      type: typeScope.type,
      attributes: copyAttributes(obj, typeScope),
      relationships: copyRelationships(obj, typeScope)
    };
  }

  function copyAttributes(obj, typeScope) {
    var attrs = {};
    var relationshipKeys = typeScope.relationships ? getKeys(typeScope.relationships) : [];
    getFilteredKeys(obj).forEach(function (key) {
      if (relationshipKeys.indexOf(key) === -1) {
        attrs[key] = typeof obj[key] !== 'object' ? obj[key] : angular.copy(obj[key]);
      }
    });
    return attrs;
  }

  function copyRelationships(obj, typeScope) {
    var rel = {};
    var relationshipKeys = typeScope.relationships ? getKeys(typeScope.relationships) : [];
    getFilteredKeys(obj).forEach(function (key) {
      if (relationshipKeys.indexOf(key) !== -1) {
        if (obj[key] instanceof Array) {
          rel[key] = {data: []};
          obj[key].forEach(function (sub) {
            rel[key].data.push({
              id: sub.id,
              type: typeScope.relationships[key].type
            });
          });
        } else {
          rel[key] = {
            data: {
              id: obj[key].id,
              type: typeScope.relationships[key].type
            }
          };
        }
      }
    });
    return rel;
  }







  // --- Private ----------------------



  function traverseForResource(data, id, type) {
    var i;
    var length;
    var keys;
    var key;
    var found = false;

    if (data instanceof Array) {
      i = 0;
      length = data.length;
      while (i < length) {
        if (traverseForResource(data[i], id, type) === true) {
          found = true;
          break;
        }
        i += 1;
      }
    } else if (typeof data === 'object' && data !== null) {
      if (data.typeScope && data.typeScope.type === type && data.id === id) {
        found = true;
        return found;
      }

      keys = getFilteredKeys(data);
      key = keys.pop();
      while (key !== undefined) {
        if (traverseForResource(data[key], id, type) === true) {
          found = true;
          break;
        }
        key = keys.pop();
      }
    }

    return found;
  }


  // ket object keys. filter out `id` and any property that starts with `$$`
  function getFilteredKeys(obj) {
    return getKeys(obj).filter(function (key) {
      return key !== 'id' && key.indexOf('$$') !== 0;
    });
  }

  // find an object by given id or return undefined
  function findById(id, arr) {
    if (id === undefined || !(arr instanceof Array)) { return undefined; }
    var i = 0;
    var length = arr.length;
    while (i < length) {
      if (arr[i] && arr[i].id === id) { return arr[i]; }
      i += 1;
    }
    return undefined;
  }

  // append to path and make sure the first charater is not `/`
  function formatPath(base, addition) {
    return (base+'/'+addition).replace(/^\//, '');
  }

}
