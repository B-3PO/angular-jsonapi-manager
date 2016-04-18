angular
  .module('dataManagerApp')
  .controller('HomeController', HomeController);




HomeController.$inject = ['dataManager', '$timeout', 'requester'];
function HomeController(dataManager, $timeout, requester) {
  var vm = this;

  vm.locations = [];
  vm.newJob = '';
  vm.newPerson = '';


  // requester.head('/locations/123?include=people,jobs', {'d-m-version': 123}, function (error, data) {
  //   console.log(error, data);
  // });

  vm.addJob = function (id) {
    vm.people.forEach(function (item) {
      if (item.id === id) {
        item.jobs.push({
          // id: Math.ceil(Math.random() * 999),
          title: vm.newJob
        });
      }
    });


    vm.newJob = '';
  };

  vm.addPerson = function () {
    vm.people.push({
      // id: Math.ceil(Math.random() * 999),
      name: vm.newPerson,
      age: Math.ceil(Math.random() * 98),
      email: 'theemai@',
      jobs: []
    });

    vm.newPerson = '';
  };

  vm.addExisting = function (jobs) {
    jobs.push({
      id: Math.ceil(Math.random() * 999),
      title: 'replicated'
    });
  };


  var locations = dataManager.create({
    // objectId: 'id',
    type: 'locations', // optional param used for json api
    url: '/locations',
    include: ['people', 'people.job'],
    error: function (data) {
      console.log(data);
    }
    // jsonapi: false,
    // getOnly: true,
    // postOnly: true,

    // you can give alternate urls
    // createUrl: '',
    // updateUrl: '',
    // deleteUrl: '',

    // relationships: [
    //   {
    //     type: 'job',
    //     url: '/jobs',
    //     map: 'jobs'
    //   }
    // ]
  });

  // var peopleKiller = people.watch(function (data) {
  //   vm.people = data;
  // });
  // vm.update = angular.noop;


  locations.get(function (data) {
    console.log(data);
    vm.locations = data;
    // $timeout(function () {
    //   vm.people[0].jobs.push(people.getType('job', 1));
    // }, 400);
  });
  vm.update = locations.applyChanges;
}








// --- old ----

HomeController_old.$inject = ['dataManager', '$timeout'];
function HomeController_old(dataManager, $timeout) {
  var vm = this;

  vm.theData = {};
  var watcher = dataManager.watch({
    getUrl: '/get',
    addUrl: '/add',
    removeUrl: '/remove',
    updateUrl: '/update',

    objectId: 'id',

    requestFormat: [
      {key: 'id', map: 'id'},
      {key: 'name', map: 'name'},
      {key: 'email', map: 'email'},
      {key: 'nested', map: 'nested.item'}
    ],


    // TODO : look into add data relation for auto building display object

    // Possible format for related data
    requestFormat_: [
      {
        // url: '/all' // use one url with POST,PUT,DELETE
        add: '/addPeople',
        update: '/updatePeople',
        remove: '/removePeople',

        path: 'peopleList',

        format: [
          {key: 'id', map: 'id'},
          {key: 'name', map: 'name'},
          {key: 'groups', map: 'groups'}
        ],

        relations: [
          {key: 'groups.id', map: 'groupList'}
        ]
      },

      {
        // url: '/all2' // use one url with POST,PUT,DELETE
        add: '/addGroup',
        update: '/updateGroup',
        remove: '/removeGroup',

        path: 'groupList',

        format: [
          {key: 'id', map: 'id'},
          {key: 'name', map: 'name'},
          {key: 'nested', map: 'nested.item'}
        ]
      },
    ]

  // callback with data
  }, function (data) {
    vm.theData = data;

    $timeout(function () {
      // vm.theData[0].arr.splice(1,1);
      if (vm.theData[0].arr.length < 4) {
        vm.theData[0].arr.push({id: 15, ordinal: 4});
      }
    }, 1000);
  });





  vm.addData = function () {
    vm.theData.push({
      id: getTempId(),
      name: vm.addInfo.name,
      age: vm.addInfo.age,
      email: vm.addInfo.email
    });
  };

  vm.removeItem = function (index) {
    vm.theData.splice(index, 1);
  };





  function getTempId() {
    return '_tempId_' + Math.random(9999);
  }
}
