angular.module('docdoc.home', ['chart.js', 'ngMap', 'angularModalService', 'docdoc.modal'])

.controller('HomeController', function ($scope, $location, Home, NgMap, ModalService) {
  var accessToken = localStorage.getItem("docdoc")
  $scope.clinicalNotesTemplate = [];
  $scope.patients = [];
  $scope.clinicalNotes = [];
  $scope.selectedPatientId;
  $scope.selected;

  var getClinicalNotesTemplate = function() {
    Home.getClinicalNotesTemplate(accessToken).then(function(data) {
      console.log(data);
      $scope.clinicalNotesTemplate = data.results;
    })
  };

  var getPatients = function() {
  	Home.getPatients(accessToken).then(function(data){
  	  console.log(data);
  	  $scope.patients = data.results;
  	}).then(function(){
      getRaceData();
      getAgeData();
      getGender();
      getAddresses();
    })
  };

  //Gender Data

  var genderObj = {};
  $scope.genderLabels =[];
  $scope.genderData = [];

  var getGender = function() {
    $scope.patients.forEach(function(patient) {
      genderObj[patient.gender] = genderObj[patient.gender] || 0;
      genderObj[patient.gender] ++;
    });

    for (var key in genderObj) {
      $scope.genderData.push(genderObj[key]);
      if (key === "") { key = "Undeclared";}
      $scope.genderLabels.push(key);
    }
  }

  //Age Data
  
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
      $scope.ageLabels.push(key + '-' + (parseInt(key)+9));
      age.push(ageObj[key]);
    }
    $scope.ageData.push(age);
  };

  //Race Data

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
  };

  //Address Data
  var mapObj = {};
  $scope.addresses = [];

  var getAddresses = function() {
    $scope.patients.forEach(function(patient) {
      if (patient.address !== "" && patient.city !== "" && patient.state !=="") {
        $scope.addresses.push(patient.address+','+patient.city +',' + patient.state);
      }
    })
    console.log("Addresses", $scope.addresses)
  }

  var makeMap = function() {
    NgMap.getMap().then(function(map){

    })
  };

  //Clinical Notes
  var getClinicalNotes = function() {
  	Home.getClinicalNotes(accessToken).then(function(data) {
  	  console.log(data);
  	  $scope.clinicalNotes = data.results;
  	})
  };
  
  //Relocation
  $scope.changeWindow = function(patientId) {
    var url = '/patient/'+patientId;
    $location.url(url);
  };

  //Modal
  $scope.showAModal = function() {
    ModalService.showModal({
      templateUrl: "app/home/modal/modal.html",
      controller: "ModalController",
      inputs: {
        patients: $scope.patients
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function() {
        // $scope.message = result ? "You said Yes" : "You said No";
        console.log("Closed Successfully")
      });
    });

  };

  getPatients();
  getClinicalNotesTemplate();
})

