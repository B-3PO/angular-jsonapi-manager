angular
  .module('dataManagerApp')
  .controller('HomeController', HomeController);




HomeController.$inject = ['$scope', 'jam', '$timeout'];
function HomeController($scope, jam, $timeout) {
  var vm = this;

  var jsonapiSchema = {
    type: 'locations',
    relationships: {
      menus: {
        meta: {
          toMany: true
        },
        type: 'menus',
        relationships: {
          categories: {
            meta: {
              toMany: true
            },
            type: 'categories'
          }
        },
      },
      categories: {
        meta: {
          toMany: true
        },
        type: 'categories'
      }
    }
  };

  var manager = jam.Create({
    schema: jsonapiSchema,
    url: 'locations'
  });

  manager.registerScope($scope, true);
  manager.bind($scope, 'locations');
  manager.bind($scope, 'menus', 'menus');
  manager.bind($scope, 'cat', 'categories', '2784472d-7b4d-47c2-be52-5b605f2dd401');

  manager.get(function (error) {
    console.log($scope.locations);
    // console.log($scope.menus);
    // console.log($scope.cat);
  });


  $timeout(function () {
    $scope.locations[0].name = 'change name';
    // $scope.locations[0].newField = 'new';
    // $scope.locations[0].obj = {
    //   one: 1,
    //   two: 2
    // };
    //
    $scope.locations.push({
      name: 'new loc',
      city: "autsint",
      state: 'adasda',
      menus: [
        {
          menu: 'new sub',
          type: 'newrtyrsdgfsd'
        }
      ]
    });

    // $scope.locations[0].menus.push({
    //   name: 'new menu',
    //   type: 'food'
    // });

    // $scope.locations[0].menus.push({
    //   name: 'new menu',
    //   type: 'food'
    // });


    // $scope.locations[1].categories[0].name = 'new';

    // $scope.locations[1].categories.push({
    //   name: 'new menu',
    //   type: 'food'
    // });
    manager.applyChanges();
  }, 1000);
}
