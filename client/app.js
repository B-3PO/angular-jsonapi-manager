angular
  .module('dataManagerApp', [
    'ngRoute',
    'ngAnimate',
    'brMaterial',
    'jsonapi-manager'
  ])
  .config(configApp);


configApp.$inject = ['$routeProvider', 'jamProvider'];
function configApp($routeProvider, jamProvider) {
  jamProvider.baseUrl = "http://localhost:4000/";

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
