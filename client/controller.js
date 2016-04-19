angular
  .module('dataManagerApp')
  .controller('HomeController', HomeController);




HomeController.$inject = ['dataManager', '$timeout', 'requester'];
function HomeController(dataManager, $timeout, requester) {
  var vm = this;

  var locationManager = dataManager.create({
    url: '/locations',
    include: ['people', 'people.job']
  });


  vm.locations = [];
  vm.locationInfo = {
    name: '',
    city: '',
    state: ''
  };
  vm.personInfo = {
    name: '',
    age: '',
    email: ''
  };


  vm.addLocation = addLocation;
  vm.addPerson = addPerson;
  vm.deleteLocation = deleteLocation;
  vm.deletePerson = deletePerson;
  vm.update = locationManager.applyChanges;
  vm.cancelChanges = locationManager.removeChanges;





  locationManager.get(function (data) {
    vm.locations = data;
  });




  function addLocation() {
    vm.locations.push({
      name: vm.locationInfo.name,
      city: vm.locationInfo.city,
      state: vm.locationInfo.state
    });
    vm.update();
  }


  function addPerson(locationId) {
    locationManager.getType('locations', locationId).people.push({
      name: vm.personInfo.name,
      age: vm.personInfo.age,
      email: vm.personInfo.email
    });
    vm.update();
  }


  function deleteLocation(locationId) {
    var i = 0;
    var length = vm.locations.length;

    while (i < length) {
      if (vm.locations[i].id === locationId) {
        vm.locations.splice(i, 1);
        vm.update();
        return;
      }
      i += 1;
    }
  }


  function deletePerson(locationId, personId) {
    var i = 0;
    var people = locationManager.getType('locations', locationId).people;
    var length = people.length;

    while (i < length) {
      if (people[i].id === personId) {
        people.splice(i, 1);
        vm.update();
        return;
      }
      i += 1;
    }
  }

}
