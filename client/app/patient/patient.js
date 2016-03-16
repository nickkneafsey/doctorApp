angular.module('docdoc.patient', ['chart.js'])

.controller('PatientController', function ($scope, Patient, $routeParams){
  var accessToken = localStorage.getItem("docdoc")
  var patientId = $routeParams.id;
  $scope.patient;
  $scope.clinicalNotes = [];
  var getPatientData = function () {
    Patient.getPatientData(accessToken, patientId).then(function(data) {
      console.log("Patient", data);
      $scope.patient = data;
    })
  };

  var getPatientsClinicalNotes = function () {
    Patient.getPatientsClinicalNotes(accessToken, patientId).then(function(data) {
      console.log("Clinical Notes", data);
      $scope.clinicalNotes = data.results;
    }).then(function() {
      sortClinicalNotes();
    })
  };

  var notesObj = {};
  $scope.notesLabels =[];
  $scope.notesData = [];
  var notesData = [];
  var sortClinicalNotes = function() {
    $scope.clinicalNotes.forEach(function(note) {
      // console.log(parseInt(note.value))
      var val = parseInt(note.value);
      if (!isNaN(val)) {
        notesObj[note.appointment] = val;
      }
    })

    for (var key in notesObj) {
      $scope.notesLabels.push(key);
      notesData.push(notesObj[key]);
    }

    $scope.notesData.push(notesData);

  };


  getPatientData();
  getPatientsClinicalNotes();
})