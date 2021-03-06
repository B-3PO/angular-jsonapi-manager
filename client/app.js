angular
  .module('dataManagerApp', [
    'ngRoute',
    'ngAnimate',
    'brMaterial',
    'jsonApiManager'
  ])
  .config(configApp);


configApp.$inject = ['$routeProvider', 'jsonApiManagerProvider'];
function configApp($routeProvider, jsonApiManagerProvider) {
  jsonApiManagerProvider.baseUrl = "http://localhost:4000/";

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
