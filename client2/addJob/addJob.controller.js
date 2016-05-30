angular
  .module('dataManagerApp')
  .controller('AddJobController', AddJobController);



function AddJobController($scope, locationManager, personId, $brDialog) {
  var vm = this;

  locationManager.bind(vm, 'person', 'people', personId);
  vm.job = {
    title: '',
    pay: 0
  };

  vm.cancel = $brDialog.remove;
  vm.save = save;

  $scope.$on('$destroy', function () {
    locationManager.unbind(vm);
    locationManager.removeChanges();
  });


  function save() {
    $brDialog.lock();
    vm.person.job = angular.copy(vm.job);
    
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
