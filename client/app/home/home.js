angular.module('docdoc.home', ['chart.js'])

.controller('HomeController', function ($scope, Home) {
  var accessToken = localStorage.getItem("docdoc")
  $scope.clinicalNotesTemplate = [];
  $scope.patients = [];
  $scope.clinicalNotes = [];
  $scope.selectedPatientId;

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
  	}).then(function(){
      getRaceData();
      getAgeData();
    })
  }
  
  var ageObj = {};
  $scope.ageLabels = [];
  var age = [];
  $scope.ageData = [];
  var d = new Date();
  var year = d.getFullYear();

  var getAgeData = function() {
    $scope.patients.forEach(function(patient) {
      if (patient.date_of_birth){
        var birthYear = parseInt(patient.date_of_birth.split('-')[0]);
        var tenYear = Math.floor((year - birthYear)/10) * 10;
        ageObj[tenYear] = ageObj[tenYear] || 0;
        ageObj[tenYear] ++;
      }
    });

    for (var key in ageObj) {
      $scope.ageLabels.push(key);
      age.push(ageObj[key]);
    }
    $scope.ageData.push(age);
  };

  var raceObj = {};
  $scope.raceData = [];
  $scope.raceLabels = [];

  var getRaceData = function() {
    $scope.patients.forEach(function(patient){
      raceObj[patient.race] = raceObj[patient.race] || 0;
      raceObj[patient.race] ++;
    });

    for (var key in raceObj) {
      $scope.raceLabels.push(key);
      $scope.raceData.push(raceObj[key]);
    }
  }

  var getClinicalNotes = function() {
  	Home.getClinicalNotes(accessToken).then(function(data) {
  	  console.log(data);
  	  $scope.clinicalNotes = data.results;
  	})
  }
  // https://drchrono.com/api/clinical_notes?date_range=2016-01-01/2016-03-14&patient=

  getPatients();
  getClinicalNotesTemplate();
});