angular
  .module('jsonApiManager')
  .factory('jamPatch', jamPatch);


function jamPatch() {
  var service = {
    diff: diff,
    apply: apply
  };
  return service;


  function diff(options, reverse) {
    var patches = [];

    if (reverse === true) {
      generatePataches(angular.copy(options.data), options.oldValue, patches, '');
    } else {
      generatePataches(angular.copy(options.oldValue), options.data, patches, '');
    }
    return patches;
  }



  function generatePataches(oldValue, newValue, patches, path, parentId) {
    var i;
    var j;
    var lengthDiff;
    var oldKey;
    var newKey;
    var isObj;
    var deleted;
    var newObj;
    var oldObj;
    var key;
    var typescope;
    var prop;

    var newKeys = _objectKeys(newValue);
    var oldKeys = _objectKeys(oldValue);
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
        i += 1;

        oldObj= oldValue[oldKey];
        // skip to next item if this one no longer exists
        if (oldObj === undefined) { continue; }

        isObj = typeof oldObj === 'object' && oldObj !== null;
        deleted = true; // if oldObj exists in newValue then this will be set to true
        j = 0;

        while (j < newLength) {
          newKey = newKeys[j];
          j += 1;

          newObj = newValue[newKey];


          // TODO : fix this if check so if the old length is greater than the new it still checks all items in list for deletion
          //        To replicate this issue add a new object then remove the first object

          // check objects with ids
          if (isObj === true && oldObj.id !== undefined && typeof newObj === 'object' && newObj.id !== undefined) {
            if (oldObj.id === newObj.id) {
              deleted = false;
              break;
            }

          // check for non object values
          // NOTE : these will be assumed to sit nested inside of an object with an id
          } else if (oldObj === null && (typeof newObj === 'object' && newObj !== null)) {
            break;

          } else {
            deleted = false;
          }
        }

        if (deleted === true) {
          lengthDiff -= 1;

          // NOTE : may need to check if is and abject and use delete

          // remove object/key and set the length and counter back
          if (oldValue instanceof Array) {
            oldValue.splice(parseInt(oldKey), 1);
          } else {
            delete oldValue[oldKey];
          }
          oldKeys.splice(i, 1);
          i -= 1;
          oldLength -= 1;


          if (typeof oldObj === 'object' && oldObj !== null) {
            typescope = oldObj.typescope;
          } else if (typescope !== undefined) { typescope = undefined; }


          patches.push({
            op: 'remove',
            path: path + '/' + escapePath(oldKey),
            id: oldObj.id !== undefined ? oldObj.id : undefined,
            type: typescope !== undefined ? typescope.type : undefined,
            oldData: deepClone(oldObj),
            parentId: newValue instanceof Array ? parentId : newValue.id
          });
        }
      }


      // Check for additions
      if (lengthDiff > 0) {
        i = 0;

        while (i < newLength) {
          key = newKeys[i];
          i += 1;

          if (oldValue[key] === undefined) {
            newObj = newValue[key];

            if (newObj instanceof Array) {
              typescope = undefined;
              prop = escapePath(key);
            } else if (typeof newObj === 'object' && newObj !== null) {
              typescope = newObj.typescope;
              prop = undefined;
            } else {
              patches.push({
                op: 'replace',
                path: path + '/' + escapePath(key),
                value: deepClone(newObj),
                valueReference: newObj,
                id: newValue.id !== undefined ? newValue.id : undefined,
                type: newValue.typescope !== undefined ? newValue.typescope.type : undefined,
                prop: escapePath(key),
                oldData: deepClone(oldObj),
                parentId: parentId
              });
              break;
            }

            patches.push({
              op: 'add',
              path: path + '/' + escapePath(key),
              value: deepClone(newObj),
              prop: prop,
              type: typescope !== undefined ? typescope.type : undefined,
              parentId: newValue instanceof Array ? parentId : newValue.id,
              valueReference: newObj
            });
          }
        }
      }
    }


    // --- Replaces---
    // NOTE : if an object is spliced in then middle of an array, this may disrupt the replaces

    i = 0;
    while (i < oldLength) {
      key = oldKeys[i];
      i += 1;

      oldObj = oldValue[key];
      if (newValue[key] !== undefined) {
        newObj = newValue[key];

        if (typeof oldObj === 'object' && oldObj !== null && typeof oldObj === 'object' && oldObj !== null) {
          // if the old value is an array then an aditional recursion will happend so we need to pass througth the previos parentId
          generatePataches(oldObj, newObj, patches, path + '/' + escapePath(key), oldValue instanceof Array ? parentId : oldValue.id);

        // values are not strictly equal
        } else if (oldObj !== newObj) {
          patches.push({
            op: 'replace',
            path: path + '/' + escapePath(key),
            value: deepClone(newObj),
            valueReference: newObj,
            id: newValue.id !== undefined ? newValue.id : undefined,
            type: newValue.typescope !== undefined ? newValue.typescope.type : undefined,
            prop: escapePath(key),
            oldData: deepClone(oldObj),
            parentId: parentId
          });
        }
      }
    }
  }






  // --- Apply Patches -----------


  function apply(data, patches) {
    var patch;
    var path;
    var keys;
    var key;
    var obj;
    var j;
    var keyLength;
    var existingPathFragment;

    var result = false;
    var i = 0;
    var length = patches.length;

    while (i < length) {
      patch = patches[i];
      i += 1;

      path = patch.path || '';
      keys = path.split('/');
      obj = data;
      j = 1;
      keyLength = keys.length;
      existingPathFragment = undefined;


      while (true) {
        key = keys[j];
        j += 1;


        if (obj === undefined) {
          break;
        }


        if (key === undefined && j >= keyLength) {
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

          if (j >= keyLength) {
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

          if (j >= keyLength) {
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
      i += 1;

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
      i += 1;

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
    hashIndex = keys.indexOf('$$hashKey');
    if (hashIndex > -1) { keys.splice(hashIndex, 1); }

    return keys;
  }
}
