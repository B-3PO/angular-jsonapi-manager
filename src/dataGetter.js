angular
  .module('dataManager')
  .factory('$dataGetter', dataGetter);



dataGetter.$inject = ['requester', 'dMStorage', 'dMUtil', '$dMConstant', 'dMHistory'];
function dataGetter(requester, dMStorage, dMUtil, $dMConstant, dMHistory) {

  return function get(urlId, url, requestModifiers, callback) {
    handShake(urlId, url, requestModifiers, function (error, isVersioning, getUpdate, postUpdate, response) {
      if (error !== undefined) {
        callback(true);
        return;
      }

      // --- decide where to get data from based on the headers sent back ---

      // server is not involved in versioning or server opted out
      if (isVersioning === false) {
        if (response === undefined || response === null || response === '') {
          getNewData(urlId, url, requestModifiers, callback);
        } else {
          callback(undefined, response);
        }

      // the server is playing along with versioning
      } else {
        // get new data, remove history
        if (getUpdate === true) {
          getNewData(urlId, url, requestModifiers, callback);

        // get current data if it exists and apply+send updates to server
        } else if (postUpdate === true) {
          // TODO implement this for offline mode. currently forcing new data get
          getNewData(urlId, url, requestModifiers, callback);

        // get current data and keep history
        } else {
          getCurrentData(urlId, url, requestModifiers, callback);
        }
      }
    });
  };




  function handShake(urlId, url, requestModifiers, callback) {
    var handshakeHeaders;
    var version = getLastVersionKey(urlId);
    var hasVersion = version !== undefined;


    if (hasVersion === true) {
      handshakeHeaders = {
        'd-m-handshake': true,
        'd-m-version': version.date
      };
    } else {
      handshakeHeaders = {
        'd-m-handshake': true
      };
    }

    if (url.indexOf('?') === -1) {
      url += '?cb=' + dMUtil.now();
    } else {
      url += '&cb=' + dMUtil.now();
    }

    requester.head(url, handshakeHeaders, requestModifiers, function (error, response, headers) {
      if (error !== undefined) {
        callback(true);
        return;
      }

      var isVersioning = headers('d-m-versioning') === 'true' ? true : false;
      var getUpdate = headers('d-m-get-update') === 'true' ? true : false;
      var postUpdate = headers('d-m-post-update') !== null ? parseInt(headers('d-m-post-update')) : false;

      callback(undefined, isVersioning, getUpdate, postUpdate, response);
    });
  }






  // create new version and get data
  function getNewData(urlId, url, requestModifiers, callback) {
    var newVersion = dMUtil.hashString(url + dMUtil.now().toString());

    requester.get(url, false, newVersion, requestModifiers, function (error, response) {
      if (error !== undefined) {
        callback(true);
        return;
      }


      // dump history
      dMHistory.clear(urlId);

      setVersionKey(urlId, newVersion);
      callback(undefined, response);
    });
  }


  // get last version and get data
  function getCurrentData(urlId, url, requestModifiers, callback) {
    var version = getLastVersionKey(urlId);

    // if no version ws found then get new data
    if (version === undefined) {
      getNewData(urlId, url, requestModifiers, callback);
      return;
    }
    
    requester.get(url, false, version.key, requestModifiers, function (error, response) {
      if (error !== undefined) {
        callback(true);
        return;
      }

      var patches = getPatches(urlId);
      callback(undefined, response, patches);
    });
  }

  function getPatches(id) {
    var storedItem = dMStorage.get($dMConstant.STORED_DATA_PREFIX + id) || [];

    if (storedItem.length > 0) {
      return storedItem.map(function (item) {
        return item.data;
      }).reduce(function (arr, item) {
        return arr.concat(item);
      });
    }

    return undefined;
  }







  // This will return either the last version object from an id or undefined
  function getLastVersionKey(id) {
    var versionKeyData = dMStorage.get($dMConstant.VERSION_KEY) || {};
    return versionKeyData[id] === undefined || versionKeyData[id].length === 0 ? undefined : versionKeyData[id][versionKeyData[id].length-1];
  }


  // add new version object to version array
  function setVersionKey(id, key) {
    var versionKeyData = dMStorage.get($dMConstant.VERSION_KEY) || {};
    if (versionKeyData[id] === undefined) {
      versionKeyData[id] = [];
    }

    versionKeyData[id].push({key: key, date: dMUtil.now()});
    dMStorage.set($dMConstant.VERSION_KEY, versionKeyData);
  }
}
