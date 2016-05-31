angular
  .module('jsonApiManager')
  .factory('jamHandshaker', jamHandshaker);


jamHandshaker.$inject =['jamRequest', 'jamHistory', 'jamKeys', 'jamUtil'];
function jamHandshaker(jamRequest, jamHistory, jamKeys, jamUtil) {
  var service = {
    synchronize: synchronize
  };
  return service;



  function synchronize(options, callback) {
    var handshakeHeaders;
    var url = options.url;
    var version = jamHistory.getVersion(options.managerId);

    // if no version exists then data must have been cleared
    // Remvoe any info to be safe and create a new version
    // this will garentee we get new data from server
    if (version === undefined) {
      jamHistory.clear(options.managerId);
      version = jamHistory.newVersion(options.managerId);
    }

    if (version !== undefined) {
      handshakeHeaders = {
        'jam-handshake': true,
        'jam-version': version.date
      };
    } else {
      handshakeHeaders = {
        'jam-handshake': true
      };
    }

    jamRequest.head(url, handshakeHeaders, function (error, response, headers) {
      if (error !== undefined) {
        callback({
          code: '1',
          message: 'jsonApiManager was not able to complete handshake',
          httpError: error
        });
        return;
      }

      var isVersioning = headers('jam-versioning') === 'true' ? true : false;
      var getUpdate = isVersioning === false ? true : headers('jam-no-updates') === 'true' ? false : true;

      // if ther is no versioning or there are updates, then clear history
      // also create a new version for cache busting
      if (getUpdate === true) {
        jamHistory.clearVersions(options.managerId);
        jamHistory.newVersion(options.managerId);
        jamHistory.clear(options.managerId);
      }

      options.isVersioning = isVersioning; // tell manager there is no versioning
      options.getNewData = getUpdate; // tell manager it needs to get new data
      getStructure(options, callback);
    });
  }




  function getStructure(options, callback) {
    var versionCacheBust = jamHistory.getVersion(options.managerId);

    jamRequest.get(jamUtil.getCacheBustUrl(options.getUrl, versionCacheBust.cb), {'jam-get-structure': true}, function (error, response, headers) {
      if (error !== undefined) {
        callback({
          code: '2',
          message: 'jsonApiManager was not able to get data structur',
          httpError: error
        });
        return;
      }
      options.typescopes = jamUtil.buildTypeScopes(options, response);
      callback(undefined);
    });
  }
}
