angular.module('docdoc.home', [])

.controller('HomeController', function ($scope, Home) {
  var accessToken = localStorage.getItem("docdoc")
  $scope.clinicalNotesTemplate = [];
  $scope.patients = [];
  $scope.clinicalNotes = [];

  var getClinicalNotesTemplate = function() {
    Home.getClinicalNotesTemplate(accessToken).then(function(data) {
      console.log(data);
      $scope.clinicalNotesTemplate = data.results;
    })
  }

  var getPatients = function() {
  	Home.getPatients(accessToken).then(function(data){
  	  console.log(data);
  	  $scope.patients = data.results;
  	})
  }

  var getClinicalNotes = function() {
  	Home.getClinicalNotes(accessToken).then(function(data) {
  	  console.log(data);
  	  $scope.clinicalNotes = data.results;
  	})
  }
  // https://drchrono.com/api/clinical_notes?date_range=2016-01-01/2016-03-14

  getPatients();
  getClinicalNotesTemplate();
});