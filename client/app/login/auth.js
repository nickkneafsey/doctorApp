angular.module('docdoc.auth', [])

.controller('AuthController', function ($scope) {
  var clearStorage = function () {
    localStorage.removeItem('doctor');
  }

  $scope.$on('$routeChangeUpdate', clearStorage);
  $scope.$on('$routeChangeSuccess', clearStorage);

});