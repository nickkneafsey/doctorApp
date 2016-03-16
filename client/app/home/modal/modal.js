angular.module('docdoc.modal', [])

.controller('ModalController', function($scope, close) {

  $scope.dismissModal = function(result) {
    console.log("dismiss");
    close(result, 200); // close, but give 200ms for bootstrap to animate
  };

});