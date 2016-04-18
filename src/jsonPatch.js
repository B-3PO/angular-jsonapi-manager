angular
  .module('dataManager')
  .factory('dMJSONPatch', jsonPatchService);



/**
  * @name dMJSONPatch
  * @module dMJSONPatch
  *
  *
  * @description
  * JSON Patch functions for creating and applyin patches
  * http://tools.ietf.org/html/rfc6902
  *
  */
function jsonPatchService() {
  var arrOps;
  var objOps;
  var beforeDict = [];


  var service = {
    diff: diff,
    apply: apply
  };
  return service;




  /**
    * @name getDiff
    * @function
    *
    * @description
    * Get patches
    *
    * @param {array | object} tree1 - old value
    * @param {array | object} tree2 - new vlaue
    * @param {array} additions - array of paths to add to request object
    *
    * @return {array} - array of patches
    */
  function diff(tree1, tree2, objectId) {
    var patches = [];
    generatePataches(angular.copy(tree1), tree2, patches, '', objectId);

    return patches;
  }




  /**
    * @name apply
    * @function
    *
    * @description
    * Apply Patches
    *
    * @param {array || object} tree - value
    * @param {array} patches
    *
    * @return {boolean} - if updates where made
    */
  function apply(tree, patches) {
    var path;
    var keys;
    var key;
    var obj;
    var keyLength;
    var t;
    var existingPathFragment;
    var patch;

    var result = false;
    var i = 0;
    var length = patches.length;

    while (i < length) {
      patch = patches[i];
      i++;


      // Find the object

      path = patch.path || '';
      keys = path.split('/');
      obj = tree;
      t = 1;
      keyLength = keys.length;
      existingPathFragment = undefined;

      while (true) {
        key = keys[t];
        t++;


        if (key === undefined && t >= keyLength) {
          if (patch.op === 'replace') {
            result = rootReplace(obj, patch.value, patch.path);
          } else if (patch.op === 'add') {
            result = rootAdd(obj, patch.value);
          } else if (patch.op === 'remove') {
            result = rootRemove(obj);
          }

          break;
        }


        if (obj instanceof Array) {
          if (key === '-') {
            key = obj.length;
          } else {
            key = parseInt(key, 10);
          }

          if (t >= keyLength) {
            if (patch.op === 'replace') {
              result = arrReplace(obj, key, patch.value);
            } else if (patch.op === 'add') {
              result = arrAdd(obj, key, patch.value);
            } else if (patch.op === 'remove') {
              result = arrRemove(obj, key);
            }

            break;
          }

        } else {
          if (key && key.indexOf('~') !== -1) {
            key = key.replace(/~1/g, '/').replace(/~0/g, '~'); // un-escape chars
          }

          if (t >= keyLength) {
            if (patch.op === 'replace') {
              result = objAddReplace(obj, key, patch.value);
            } else if (patch.op === 'add') {
              result = objAddReplace(obj, key, patch.value);
            } else if (patch.op === 'remove') {
              result = objRemove(obj, key);
            }

            break;
          }
        }
        
        obj = obj[key];

      }
    }


    return result;

  }






  // --- root functions -------

  function rootAdd(obj, value) {
    var i = 0;
    var keys = _objectKeys(value);
    var length = keys.length;
    rootRemove(obj);

    while (i < length) {
      key = keys[i];
      i++;

      obj[key] = value[key];
    }

    return true;
  }

  function rootRemove(obj) {
    var i = 0;
    var keys = _objectKeys(obj);
    var length = keys.length;

    while (i < length) {
      key = keys[i];
      i++;

      objRemove(obj, key);
    }

    return true;
  }

  function rootReplace(obj, value, path) {
    apply(obj, [
      { op: "remove", path: path }
    ]);

    apply(obj, [
      { op: "add", path: path, value: value }
    ]);

    return true;
  }



  // --- obj functions -------

  function objAddReplace(obj, key, value) {
    obj[key] = value;
    return true;
  }

  function objRemove(obj, key) {
    delete obj[key];
    return true;
  }


  // -- array functions ---

  function arrAdd(arr, i, value) {
    arr.splice(i, 0, value);
    return true;
  }

  function arrRemove(arr, i) {
    arr.splice(i, 1);
    return true;
  }

  function arrReplace(arr, i, value) {
    arr[i] = value;
    return true;
  }








  // --- Gerneate patches -----------------

  function generatePataches(mirror, obj, patches, path, objectId, parentId) {
    var key;
    var oldKey;
    var newKey;
    var newValue;
    var oldValue;
    var typescope;
    var deleted;
    var isObj;
    var prop;
    var i;
    var j;

    var newKeys = _objectKeys(obj);
    var oldKeys = _objectKeys(mirror);

    var changed = false;
    var lengthDiff = 0;
    var oldLength = oldKeys.length;
    var newLength = newKeys.length;



    // --- Adds  / Removals ---

    // if lengths are different then there was additions/removals
    if (oldLength !== newLength) {
      lengthDiff = Math.abs(oldLength - newLength);

      // Check for removals
      i = 0;
      while (i < oldLength) {
        oldKey = oldKeys[i];
        i++;

        oldValue = mirror[oldKey];
        isObj = typeof oldValue === 'object';

        deleted = true;
        j = 0;
        while (j < newLength) {
          newKey = newKeys[j];
          j++;
          newValue = obj[newKey];


          // TODO : fix this if check so if the old length is greater than the new it still checks all items in list for deletion
          //         To replicate this issue add a new object then remove the first object


          // ignore non existant old values
          if (oldValue === undefined) {
            deleted = false;

          // check objects with ids
          } else if (isObj === true && oldValue[objectId] !== undefined && typeof newValue === 'object' && newValue[objectId] !== undefined) {
            if (oldValue[objectId] === newValue[objectId]) {
              deleted = false;
              break;
            }

          // check for non object values
          // NOTE : these will be assumed to sit nested inside of an object with an id
          } else {
            if (oldValue === newValue) {
              deleted = false;
              break;
            }
          }
        }

        if (deleted === true) {
          lengthDiff--;

          // NOTE : may need to check if is and abject and use delete

          // remove object/key and set the length and counter back
          mirror.splice(parseInt(oldKey), 1);
          oldKeys.splice(i, 1);
          i--;
          oldLength--;

          if (typeof oldValue === 'object' && oldValue !== null) {
            typescope = oldValue.typescope;
          } else if (typescope !== undefined) { typescope = undefined; }

          patches.push({
            op: 'remove',
            path: path + '/' + escapePath(oldKey),

            id: oldValue[objectId] !== undefined ? oldValue[objectId] : undefined,
            type: typescope !== undefined ? typescope.type : undefined,
            // TODO should i save type map also?
            oldData: deepClone(oldValue),
            parentId: parentId
          });

          // patches.push({
          //   patch: {
          //     op: 'remove',
          //     path: path + '/' + escapePath(oldKey)
          //   },
          //   request: {
          //     id: oldValue[objectId] !== undefined ? oldValue[objectId] : undefined,
          //     typescope: typescope,
          //     parentId: parentId,
          //     oldData: oldValue
          //   }
          // });
        }
      }

      // Check for additions
      if (lengthDiff > 0) {
        i = 0;

        while (i < newLength) {
          key = newKeys[i];
          i++;

          if (mirror[key] === undefined) {
            newValue = obj[key];
            if (typeof newValue === 'object' && newValue !== null) {
              typescope = newValue.typescope;
              prop = undefined;
            } else {
              typescope = undefined;
              prop = escapePath(key);
            }


            patches.push({
              op: 'add',
              path: path + '/' + escapePath(key),
              value: deepClone(newValue),

              prop: prop,
              type: typescope !== undefined ? typescope.type : undefined,
              parentId: parentId,
              valueReference: newValue
            });

            // patches.push({
            //   patch: {
            //     op: 'add',
            //     path: path + '/' + escapePath(key),
            //     value: deepClone(newValue)
            //   },
            //   request: {
            //     prop: prop,
            //     parentId: parentId,
            //     typescope: typescope,
            //     value: newValue
            //   }
            // });
          }
        }
      }
    }



    // --- Replaces---
    // NOTE : if an object is spliced in then middle of an array, this may disrupt the replaces

    i = 0;
    while (i < oldLength) {
      key = oldKeys[i];
      i++;

      oldValue = mirror[key];

      if (obj[key] !== undefined) {
        newValue = obj[key];

        // check to see if both vlues are objects.
        // null counts as an object so check for it seperatly
        if (typeof oldValue === 'object' && oldValue !== null && typeof newValue === 'object' && newValue !== null) {
          generatePataches(oldValue, newValue, patches, path + '/' + escapePath(key), objectId, mirror[objectId]);

        // values are not strictly equal
        } else if (oldValue !== newValue) {
          changed = true;

          patches.push({
            op: 'replace',
            path: path + '/' + escapePath(key),
            value: deepClone(newValue),

            id: obj[objectId] !== undefined ? obj[objectId] : undefined,
            type: obj.typescope !== undefined ? obj.typescope.type : undefined,
            prop: escapePath(key),
            oldData: deepClone(oldValue)
          });


          // patches.push({
          //   patch: {
          //     op: 'replace',
          //     path: path + '/' + escapePath(key),
          //     value: deepClone(newValue)
          //   },
          //   request: {
          //     prop: escapePath(key),
          //     id: obj[objectId] !== undefined ? obj[objectId] : undefined,
          //     typescope: obj.typescope,
          //     oldData: deepClone(oldValue)
          //   }
          // });
        }

      // property removed
      } else {
        // NOTE is this needed?
        // deleted = true;
        // patches.push({op: 'remove', path: path + '/' + escapePath(key)});
      }
    }
  }




  // --- escpae path ~, / ---

  function escapePath(str) {
    if (str.indexOf('/') === -1 && str.indexOf('~') === -1) {
      return str;
    }

    return str.replace(/~/g, '~0').replace(/\//g, '~1');
  }



  // --- Deep Clone using JSON ---

  function deepClone(obj) {
    if (typeof obj === 'object') {
      // NOTE may need to add a date reciever
      return JSON.parse(JSON.stringify(obj));
    } else {
      return obj; //no need to clone primitives
    }
  }




  // --- Get keys for object or array ---

  function _objectKeys(obj) {
    var i;
    var length;
    var keys;
    var hashIndex;

    if (obj instanceof Array) {
      i = 0;
      length = obj.length;
      keys = new Array(length);

      while (i < length) {
          keys[i] = i.toString();
          i++;
      }

      return keys;
    }

    keys = Object.keys(obj);


    // TODO : Look into stripping these before passing object into parser
    // Excludes hash key generated from angular
    hashIndex = keys.indexOf('$$hashKey');
    if (hashIndex > -1) { keys.splice(hashIndex, 1); }

    return keys;
  }
}
