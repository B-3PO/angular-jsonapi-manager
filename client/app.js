angular
  .module('dataManagerApp', [
    'ngRoute',
    'dataManager'
  ])
  .config(configApp);


configApp.$inject = ['$routeProvider', 'dataManagerProvider', 'dMStorageProvider'];
function configApp($routeProvider, dataManagerProvider, dMStorageProvider) {
  // dMStorageProvider.useStorage = false;
  dataManagerProvider.headers = {
    'X-BYPASS-ADMIN-VENUE': 156,
    'X-SESSION-TOKEN': '07985a6e5eb4f986dbb2da7efcd1bc17'
    // 'X-SESSION-TOKEN': '523fa81704c463dd4c12d7e61e5572df' alpha
  };
  // dataManagerProvider.baseURL = 'https://api-integration.bypassmobile.com/api';

  // dMStorageProvider.setStorageType('sessionStorage');
  //
  //
  // dataManagerProvider.dataValidator = function (data) {
  //   return data;
  // };
  //
  // dataManagerProvider.transformRequest = function (data) {
  //   return data;
  // };
  //
  // dataManagerProvider.transformResponse = function (data) {
  //   return data;
  // };
  //
  // dataManagerProvider.objectId = 'id';

  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/'
    });
}
