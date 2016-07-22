angular
  .module('jsonapi-manager')
  .factory('jamPatch', jamPatch);


function jamPatch() {
  var service = {
    diff: diff,
    apply: apply
  };
  return service;


  function diff(options, reverse) {
    var patches = [];

    if (reverse !== true) {
      generatePataches(angular.copy(options.data), options.oldValue, patches, '');
    } else {
      generatePataches(angular.copy(options.oldValue), options.data, patches, '');
    }
    return patches;
  }



  function generatePataches(newValue, oldValue, patches, path, parentId) {
    var i;
    var j;
    var lengthDiff;
    var oldKey;
    var newKey;
    var deleted;


    var newKeys = getKeys(newValue);
    var oldKeys = getKeys(oldValue);
    var oldLength = oldKeys.length;
    var newLength = newKeys.length;


    // --- Adds  / Removals ---
    // if lengths are different then there was additions/removals

    if (newValue instanceof Array && oldValue instanceof Array && oldLength !== newLength) {
      i = 0;
      lengthDiff = Math.abs(oldLength - newLength);

      while (i < oldLength) {
        oldKey = oldKeys[i];
        oldObj= oldValue[oldKey];
        i += 1;

        // skip to next item if this one no longer exists
        if (oldObj === undefined) { continue; }

        deleted = true; // if oldObj exists in newValue then this will be set to true
        j = 0;
        while (j < newLength) {
          newKey = newKeys[j];
          newObj = newValue[newKey];
          j += 1;

          if (oldObj.id === newObj.id) {
            deleted = false;
            break;
          }
        }


        if (deleted === true) {
          
        }
      }
    }
  }





  // --- Get keys for object or array ---

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
        keys[i] = i.toString();
        i += 1;
      }
      return keys;
    }

    // object
    keys = Object.keys(obj).filter(function (key) {
      return key.indexOf('$$') !== 0;
    });
    return keys;
  }
}
