angular
  .module('jsonapiManager')
  .factory('standardJSON', standardJSON);


standardJSON.$inject = ['dMUtil'];
function standardJSON(dMUtil) {
  var defineProperty = Object.defineProperty;

  var service = {
    parse: parse
  };
  return service;






  function parse(payload, typescopes) {
    return walk(payload, '', typescopes);
  }




  function walk(obj, path, typescopes, includes) {
    var key;
    var value;
    var typescope;
    var includedObj;
    var topLayer = false;

    if (includes === undefined) {
      topLayer = true;
      includes = {};
    }

    var i = 0;
    var keys = dMUtil.getKeys(obj);
    var length = keys.length;



    while (i < length) {
      key = keys[i];
      i++;

      value = obj[key];

      if (value !== undefined) {
        if (typeof value === 'object' && value !== null) {
          // assign typescope
          if (!(value instanceof Array)) {
            typescope = dMUtil.getTypeScope(path + '/' + key, undefined, typescopes);

            if (typescope !== undefined) {
              includedObj = getIncluded(value, includes[typescope.type]);

              if (includedObj !== undefined) {
                obj[key] = includedObj;
                value = includedObj;
              } else {
                defineProperty(value, 'typescope', {
                  enumerable: false,
                  configurable: false,
                  writable: false,
                  value: typescope
                });

                if (topLayer === false) {
                  dMUtil.addInclude(value, includes);
                }
              }
            }
          }

          walk(value, path + '/' + escapePath(key), typescopes, includes);
        }
      }
    }


    if (topLayer === true) {
      return {
        data: obj,
        included: includes
      };
    }
  }


  function getIncluded(obj, includes) {
    if (includes === undefined) { return undefined; }

    var i = 0;
    var length = includes.length;

    while (i < length) {
      if (includes[i].id === obj.id) {
        return includes[i];
      }

      i += 1;
    }

    return undefined;
  }



  function escapePath(str) {
    if (str.indexOf('/') === -1 && str.indexOf('~') === -1) {
      return str;
    }

    return str.replace(/~/g, '~0').replace(/\//g, '~1');
  }
}
