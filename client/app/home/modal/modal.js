angular.module('docdoc.modal', [])

.controller('ModalController', function($scope, $element, close, patients, $location) {
  $scope.chartId;

  $scope.dismissModal = function() {
    console.log("dismiss");
    $element.modal('hide');
    $('.modal-backdrop').remove();
    close(null, 200);
    
  };

  $scope.findByChartId = function(id) {
    var upper = $scope.chartId.toUpperCase();
    for (var i = 0; i < patients.length; i++) {
      if (patients[i].chart_id === upper) {
        console.log("Bingo");
        changeWindow(patients[i].id);
        $scope.dismissModal();
        return;
      }
    }
    alert("Patient with Chart ID not found");
    $scope.dismissModal();


  }

  var changeWindow = function(patientId) {
    var url = '/patient/'+patientId;
    $location.url(url);
  };


});