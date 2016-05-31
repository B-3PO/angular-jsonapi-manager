angular
  .module('dataManagerApp')
  .controller('AddRoomController', AddRoomController);



function AddRoomController($scope, locationManager, locationId, $brDialog) {
  var vm = this;

  locationManager.registerScope($scope, [vm]);
  locationManager.bind(vm, 'location', 'locations', locationId);
  vm.room = {
    name: '',
  };

  vm.cancel = $brDialog.remove;
  vm.save = save;


  function save() {
    $brDialog.lock();
    vm.location.rooms.push(angular.copy(vm.room));

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
