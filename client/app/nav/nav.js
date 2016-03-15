angular.module('docdoc.nav', [])

.controller('NavController', function ($scope) {
  var getDoc = function() {
    $scope.doctor; 
    var doc = localStorage.getItem("doctor");
    $scope.doctor = JSON.parse(doc);
  }
  
  // getDoc();
  $scope.$on('$routeChangeUpdate', getDoc);
  $scope.$on('$routeChangeSuccess', getDoc);
})