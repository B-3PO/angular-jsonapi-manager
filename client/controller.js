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
    console.log($scope.menus);
    console.log($scope.cat);
  });

  $timeout(function () {
    manager.getById('d4a22709-a19b-4261-9acf-589ad9456766', function (error) {
      console.log($scope.locations);
      console.log($scope.menus);
      console.log($scope.cat);
    });
  }, 4000);
}
