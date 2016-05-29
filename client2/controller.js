angular
  .module('dataManagerApp')
  .controller('HomeController', HomeController);




HomeController.$inject = ['jsonApiManager'];
function HomeController(jsonApiManager) {
  var vm = this;

  var locationManager = jsonApiManager.create({
    url: 'locations',
    include: ['people', 'people.job']
  }, function (error) {
    console.log(error);
  });


  locationManager.bind(vm, 'data');
  locationManager.bind(vm, 'people', 'people');
  locationManager.bind(vm, 'ben', 'people', '0b2973b2-a274-4bab-adda-7b74895fd154');

  locationManager.get(function (error) {
    if (error !== undefined) { console.log(error); }
    console.log(vm.data);
    console.log(vm.ben);
    console.log(vm.people);
    locationManager.unbind(vm, 'people');
    console.log(vm.people);
  });


  vm.applyChanges = function () {
    locationManager.applyChanges(function (error) {
      console.log(error);
    });
  };

  vm.removeChanges = function () {
    locationManager.removeChanges();
  };
}
