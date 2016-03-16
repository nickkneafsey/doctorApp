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
    }).then(function() {
      getAppointmentDates();
    })
  };

  var notesObj = {};
  $scope.notesLabels =[];
  $scope.notesData = [];
  var notesData = [];
  var sortClinicalNotes = function() {
    $scope.clinicalNotes.forEach(function(note) {
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

  var getAppointmentDates = function() {
    var obj = {size: 0};
    
    for (var i=0; i<$scope.notesLabels.length; i++) {
      Patient.getAppointment(accessToken, $scope.notesLabels[i]).then(function(data){
        obj[data.id] = data.scheduled_time;
        obj.size ++;
      }).then(function(){
        checkSize(obj);
      })
    }
  };

  var checkSize = function(obj) {
    if (obj.size === $scope.notesLabels.length) {
      for (var i = 0; i<$scope.notesLabels.length; i++) {
        $scope.notesLabels[i] = obj[$scope.notesLabels[i]]
        sortDatesAndPain();
      }
    }

  };

  var sortDatesAndPain = function() {
    var datePainObj = {};
    for (var i=0; i<$scope.notesLabels.length; i++) {
      datePainObj[$scope.notesLabels[i]]=$scope.notesData[0][i];
    }
    console.log(datePainObj);
    var j = 0;
    $scope.notesLabels = $scope.notesLabels.sort();
    for (var i = 0; i<$scope.notesLabels.length; i++) {
      $scope.notesData[0][i] = datePainObj[$scope.notesLabels[i]];
    }
    
  };

  getPatientData();
  getPatientsClinicalNotes();
})