angular
  .module('dataManagerApp')
  .controller('HomeController', HomeController);




HomeController.$inject = ['$scope', 'jsonApiManager', '$brDialog'];
function HomeController($scope, jsonApiManager, $brDialog) {
  var vm = this;

  var locationManager = jsonApiManager.create({
    url: 'locations',
    include: ['people', 'people.job', 'rooms']
  }, function (error) {
    console.log('error', error);
  });


  locationManager.bind(vm, 'data');
  locationManager.bind(vm, 'people', 'people');
  locationManager.bind(vm, 'ben', 'people', '0b2973b2-a274-4bab-adda-7b74895fd154');


  // NOTE call for individual resources by id
  //      This currently is only allowed on managers that do not have an id specified
  // locationManager.getById('9d16411c-fe77-11e5-86aa-5e5517507c66', function (error, data) {
  //   console.log(data);
  // });

  vm.getData = function () {
    locationManager.get(function (error) {
      if (error !== undefined) { console.log(error); }
      // console.log(vm.data);
      // console.log(vm.ben);
      // console.log(vm.people);
      locationManager.unbind(vm, 'people');
      // console.log(vm.people);
    });
  };


  vm.applyChanges = function () {
    locationManager.applyChanges(function (error) {
      console.log(error);
    });
  };

  vm.removeChanges = function () {
    locationManager.removeChanges();
  };



  vm.addJob = function (person) {
    $brDialog.add({
      templateUrl: 'addJob/addJob.html',
      locals: {locationManager: locationManager, personId: person.id},
      controller: 'AddJobController',
      controllerAs: 'vm'
    });
  };

  vm.addRoom = function (location) {
    $brDialog.add({
      templateUrl: 'addRoom/addRoom.html',
      locals: {locationManager: locationManager, locationId: location.id},
      controller: 'AddRoomController',
      controllerAs: 'vm'
    });
  };

  vm.addPerson = function (location) {
    $brDialog.add({
      templateUrl: 'addPerson/addPerson.html',
      locals: {locationManager: locationManager, locationId: location.id},
      controller: 'AddPersonController',
      controllerAs: 'vm'
    });
  };


  vm.addLocation = function () {
    $brDialog.add({
      templateUrl: 'addLocation/addLocation.html',
      locals: {locationManager: locationManager},
      controller: 'AddLocationController',
      controllerAs: 'vm'
    });
  };
}
