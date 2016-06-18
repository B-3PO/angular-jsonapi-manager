angular
  .module('dataManagerApp')
  .controller('MenusController', MenusController);




MenusController.$inject = ['$scope', 'jsonApiManager', '$brDialog'];
function MenusController($scope, jsonApiManager, $brDialog) {
  var vm = this;

  var menusManager = jsonApiManager.create({
    url: 'menus'
  }, function (error) {
    console.log('error', error);
  });

  menusManager.get();
}
