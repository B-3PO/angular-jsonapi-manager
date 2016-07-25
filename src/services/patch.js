angular
  .module('jsonapi-manager')
  .factory('jamPatch', jamPatch);


jamPatch.$inject = ['jamUtil'];
function jamPatch(jamUtil) {
  var getKeys = Object.keys;

  var service = {
    diff: diff,
    // apply: apply
  };
  return service;


  // returns an array of pathces for adds,removes, and replaces(updates)
  function diff(options) {
    var patches = [];
    generatePataches(options.data, options.oldValue, patches, '', options.typeScopes);

    // TODO rearange the relationships based on beans implamentation
    console.log(patches);
    return reducePatches(patches, options.data);
  }


  function traverse(data, id, type) {
    var i;
    var length;
    var keys;
    var key;
    var found = false;

    if (data instanceof Array) {
      i = 0;
      length = data.length;
      while (i < length) {
        if (traverse(data[i], id, type) === true) {
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
        if (traverse(data[key], id, type) === true) {
          found = true;
          break;
        }
        key = keys.pop();
      }
    }

    return found;
  }


  function reducePatches(patches, data) {
    var obj = {};
    patches.forEach(function (patch) {
      if (patch.resource.id === undefined) {
        console.error('Patch does not contain an `id`');
        return;
      }

      // check to see if resource is attached to anything else and remove patch, if not a relationship patch
      if (patch.op === 'delete' && !Object.keys(patch.resource.relationships).length && traverse(data, patch.resource.id, patch.resource.type) === true) {
        return;
      }

      // add patch if it does not exist
      if (obj[patch.resource.id] === undefined) {
        obj[patch.resource.id] = patch;
        return;
      }

      if (obj[patch.resource.id].op === patch.op) {
        if (patch.op === 'update' || patch.op === 'delete') {
          extendResource(obj[patch.resource.id].resource, patch.resource);
        } else {
          // NOTE this may not apply to deletions
          console.error('Cannot combine 2 patched of the same operation whe the operation is not `update` or `delete`');
        }
      } else if ((obj[patch.resource.id].op === 'add' || obj[patch.resource.id].op === 'update') && (patch.op === 'update' || patch.op === 'add')) {
        obj[patch.resource.id].op = 'add';
        extendResource(obj[patch.resource.id].resource, patch.resource);
      } else {
        console.error('Not sure how i got here');
      }
    });
    // convert object to array
    return getKeys(obj).map(function (key) { return obj[key]; });
  }

  function extendResource(dest, src) {
    // attributes
    var keys = getKeys(src.attributes);
    var key = keys.pop();
    while (key !== undefined) {
      dest.attributes[key] = src.attributes[key];
      key = keys.pop();
    }

    // old attributes
    keys = getKeys(src.oldAttributes);
    key = keys.pop();
    while (key !== undefined) {
      dest.oldAttributes[key] = src.oldAttributes[key];
      key = keys.pop();
    }

    // relationships
    keys = getKeys(src.relationships);
    key = keys.pop();
    while (key !== undefined) {
      if (dest.relationships[key] === undefined) {
        dest.relationships[key] = angular.copy(src.relationships[key]);
      } else if (dest.relationships[key].data instanceof Array) {
        dest.relationships[key].push(src.relationships[key].data[0]);
      } else {
        console.error('Cannot combine relationships that are objects(single relationship)');
      }
      key = keys.pop();
    }
  }



  // this function expects to onyl receive resoure objects or arrays containing resource objects
  function generatePataches(newValue, oldValue, patches, path, typeScopeList, parent) {
    if (oldValue instanceof Array) {
      diffArray(newValue, oldValue, patches, path, typeScopeList, parent);
    } else {
      diffObj(newValue, oldValue, patches, path, typeScopeList, parent);
    }
  }


  // expects an array of resource objects
  function diffArray(newValue, oldValue, patches, path, typeScopeList, parent) {
    var j;
    var newSub;
    var oldSub;
    var match;
    var typeScope;
    var patch;
    var resourceKey;
    var i = 0;
    var diffLength = 0;
    var oldLength = oldValue.length;
    var newLength = newValue.length;


    // TODO implament deletions

    diffLength = Math.abs(newLength - oldLength);
    if (diffLength > 0) {
      while (i < oldLength) {
        oldSub = oldValue[i];
        i += 1;
        if (!oldSub || typeof oldSub !== 'object') { continue; }
        // if no typeScope exists then try to find a match
        typeScope = jamUtil.getTypeScopeByPath(path, typeScopeList);
        if (typeScope === undefined) {
          console.error('Cannot find matching typeScope for resource');
          continue;
        }

        // cannot find matching resource in new data, create delete patch
        if (findById(oldSub.id, newValue) === undefined) {
          createDeletePatch(oldSub, patches, path, typeScope, parent);
          diffLength -= 1;
          i -= 1;
          oldLength -= 1;
          oldValue.splice(i, 1);
        }
      }
    }

    // aditions
    if (diffLength > 0) {
      i = 0;
      oldLength = oldValue.length
      while (i < newLength) {
        newSub = newValue[i];
        i += 1;
        if (!newSub || typeof newSub !== 'object') { continue; }

        // if no typeScope exists then try to find a match
        if (newSub.typeScope === undefined) {
          // if no typeScope then assume the resource is new
          if (jamUtil.getTypeScopeByPath(path, typeScopeList) !== undefined) {
            // create id and attach typeScope
            createAddPatch(newSub, oldSub, patches, path, typeScopeList, parent);
          } else {
            console.error('Cannot find matching typeScope for resource');
          }

        // if parent exists and a matching item cannot be found in the old data
        } else if (parent && findById(newSub.id, oldValue) === undefined) {
          createRelationshipPatch('update', newSub.id, newSub.typeScope.type, patches, path, parent);
        }
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
        generatePataches(match, oldSub, patches, path, typeScopeList, parent);
      }
    }
  }


  function diffObj(newValue, oldValue, patches, path, typeScopeList, parent) {
    var i;
    var newSub;
    var oldSub;
    var oldKeys;
    var key;
    var relKeys;
    var patch;


    if (newValue === null && oldValue !== null) {
      createDeletePatch(oldValue, patches, path, jamUtil.getTypeScopeByPath(path, typeScopeList), parent);
      return;
    } else if (newValue !== null && oldValue === undefined) {
      createAddPatch(newValue, oldValue, patches, path, typeScopeList, parent);
      return;
    }

    oldKeys = getFilteredKeys(oldValue);
    if (oldKeys.length < getFilteredKeys(newValue).length) {
      // TODO figure out how to handle this situation
      // should i allow this or should i require the allowed attrs to be in the schema
      console.error('Unexpected addition of properties to resource. No updates will be sent to the server for these changes');
    }
    key = oldKeys.pop();
    relKeys = newValue.typeScope.relationships ? getKeys(newValue.typeScope.relationships) : [];
    while (key !== undefined) {
      oldSub = oldValue[key];
      newSub = newValue[key];

      if (relKeys.indexOf(key) !== -1) {
        generatePataches(newSub, oldSub, patches, path+'/'+key, typeScopeList, newValue);
      } else if (oldSub !== newSub || angular.equals(oldSub, newSub) === false) {
        createUpdatePatch(newValue, key, newSub, oldSub, patches, path, parent);
      }

      key = oldKeys.pop();
    }
  }


  function convertToResource(obj, path, typeScopeList) {
    var typeScope = obj.typeScope ? obj.typeScope : jamUtil.getTypeScopeByPath(path, typeScopeList);
    var typeRelationships = typeScope.relationships ? getKeys(typeScope.relationships) : [];
    var resource = createBaseResource(obj.id, typeScope.type);

    // copy attributes. getFilteredKeys will filter out `id` and properties with `$$`
    getFilteredKeys(obj).filter(function (key) {
      return typeRelationships.indexOf(key) === -1;
    }).forEach(function (key) {
      // only run copy on objects for performance
      resource.attributes[key] = typeof obj[key] !== 'object' ? obj[key] : angular.copy(obj[key]);
    });

    return resource;
  }


  function createDeletePatch(oldSub, patches, path, typeScope, parent) {
    patches.push(createPatch('delete', path, createBaseResource(oldSub.id, typeScope.type), parent));
    if (parent) {
      createRelationshipPatch('delete', oldSub.id, typeScope.type, patches, path, parent);
    }
  }

  // create patch fore new item and ckeck its relationships.
  function createAddPatch(newSub, oldSub, patches, path, typeScopeList, parent) {
    if (newSub.id === undefined) { newSub.id = jamUtil.generateUUID(); } // add uuid if none exists. this should onyl apply to newely created resources
    Object.defineProperty(newSub, 'typeScope', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: jamUtil.getTypeScopeByPath(path, typeScopeList)
    });


    // run gen patches on relationships that exist
    if (newSub.typeScope.relationships) {
      getKeys(newSub.typeScope.relationships).forEach(function (key) {
        if (newSub[key] === undefined) { return; }
        var many = newSub.typeScope.relationships[key].meta.toMany;
        generatePataches(newSub[key], many ? [] : null, patches, path+'/'+key, typeScopeList, newSub);
      });
    }
    patches.push(createPatch('add', path, convertToResource(newSub, path, typeScopeList), parent));

    // create relationship update for new items added to parents
    if (parent) {
      createRelationshipPatch('update', newSub.id, newSub.typeScope.type, patches, path, parent);
    }
  }

  // create update patch fro relationships
  function createRelationshipPatch(op, id, type, patches, path, parent) {
    var resourceKey = path.split('/').pop();
    var resource = createBaseResource(parent.id, parent.typeScope.type);
    resource.relationships[resourceKey] = {
      data: {
        id: id,
        type: type
      }
    };
    // convert to array if toMany relationship
    if (parent[resourceKey] instanceof Array) {
      resource.relationships[resourceKey].data = [resource.relationships[resourceKey].data];
    }
    patches.push(createPatch(op, path.slice(0, path.lastIndexOf('/')), resource));
  }

  // create update patch for attributes
  function createUpdatePatch(newValue, key, newSub, oldSub, patches, path, parent) {
    var resource = createBaseResource(newValue.id, newValue.typeScope.type);
    resource.attributes[key] = typeof newSub !== 'object' ? newSub : angular.copy(newSub);
    resource.oldAttributes[key] = typeof oldSub !== 'object' ? oldSub : angular.copy(oldSub);
    patches.push(createPatch('update', path, resource, parent));
  }


  // patch format
  function createPatch(op, path, resource, parent) {
    return {
      op: op,
      path: path,
      resource: resource,
      parent: !parent ? {} : {
        id: parent.id,
        type: parent.typeScope.type
      }
    };
  }

  // shell of the resource objec used for all patches
  function createBaseResource(id, type) {
    return {
      id: id,
      type: type,
      attributes: {},
      oldAttributes: {},
      relationships: {}
    };
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


  // ket object keys. filter out `id` and any property that starts with `$$`
  function getFilteredKeys(obj) {
    return getKeys(obj).filter(function (key) {
      return key !== 'id' && key.indexOf('$$') !== 0;
    });
  }

  // --- escpae path ~, / ---
  function escapePath(str) {
    if (str.indexOf('/') === -1 && str.indexOf('~') === -1) {
      return str;
    }
    return str.replace(/~/g, '~0').replace(/\//g, '~1');
  }
}
