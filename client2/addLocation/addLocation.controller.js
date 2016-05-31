angular
  .module('dataManagerApp')
  .controller('AddLocationController', AddJobController);



function AddJobController($scope, locationManager, $brDialog) {
  var vm = this;

  // locationManager.registerScope($scope, [vm]);
  locationManager.bind(vm, 'list');
  vm.location = {
    name: '',
    city: '',
    state: ''
  };

  vm.cancel = $brDialog.remove;
  vm.save = save;


  function save() {
    $brDialog.lock();
    vm.list.push(angular.copy(vm.location));

    locationManager.applyChanges(function (error) {
      $brDialog.unlock();

      if (error !== undefined) {
        console.log(error);
        return;
      }

      $brDialog.remove();
    });
  }
}
