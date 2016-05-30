angular
  .module('dataManagerApp')
  .controller('AddPersonController', AddPersonController);



function AddPersonController($scope, locationManager, locationId, $brDialog) {
  var vm = this;

  locationManager.bind(vm, 'location', 'locations', locationId);
  vm.person = {
    name: '',
    age: 0,
    email: '',
    working: true
  };

  vm.cancel = $brDialog.remove;
  vm.save = save;

  $scope.$on('$destroy', function () {
    locationManager.unbind(vm);
    locationManager.removeChanges();
  });


  function save() {
    $brDialog.lock();
    vm.location.people.push(angular.copy(vm.person));

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
