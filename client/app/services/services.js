angular.module('docdoc.services', [])
.factory('Home', function ($http) {
  var makeRequest = function(accessToken, url, end) {
    var token ='Bearer '+accessToken;
    return $http({
      method: 'GET',
      url: url,
      headers: {
        end: end,
        auth: token,
        'Content-Type': 'application/json'
      }
    })
    .then(function(resp) {
      return resp.data;
    }).catch(function(error){
      console.log("ERR", error)
    })
  };

  var getClinicalNotesTemplate = function(accessToken) {
    return makeRequest(accessToken, '/api/clinicalNotesTemplate', 'clinical_note_templates');
  };

  var getPatients = function (accessToken) {
    return makeRequest(accessToken, '/api/patients', 'patients');
  };

  return {
    getClinicalNotesTemplate: getClinicalNotesTemplate,
    getPatients: getPatients
  }
})
.factory('Patient', function ($http) {
  var makeRequest = function(accessToken, url, end) {
    var token ='Bearer '+accessToken;
    console.log(token);
    return $http({
      method: 'GET',
      url: url,
      headers: {
        end: end,
        auth: token,
        'Content-Type': 'application/json'
      }
    })
    .then(function(resp) {
      console.log("RESP",resp);
      return resp.data;
    }).catch(function(error){
      console.log("ERR", error)
    })
  };
  
  var getPatientData = function(accessToken, patientId) {
    var url = '/api/patient/' + patientId;
    var end = 'patients/' + patientId;

    return makeRequest(accessToken, url, end);
  }

  getPatientsClinicalNotes = function(accessToken, patientId) {
    var url = '/api/chart/' + patientId;
    var end = 'clinical_note_field_values?date_range=2016-01-01/2016-03-20&patient=' + patientId;
    
    return makeRequest(accessToken, url, end);
  }

  return {
    getPatientData: getPatientData,
    getPatientsClinicalNotes: getPatientsClinicalNotes
  }
})
.factory('Auth', function ($http, $window) {

})
.factory('Token', function ($http) {
  var makeRequest = function(accessToken, url, end) {
    var token ='Bearer '+accessToken;
    return $http({
      method: 'GET',
      url: url,
      headers: {
        end: end,
        auth: token,
        'Content-Type': 'application/json'
      }
    })
    .then(function(resp) {
      return resp.data;
    }).catch(function(error){
      console.log("ERR", error)
    })
  };

  var getAccess = function () {
    return $http({
      method: 'GET',
      url: '/access'
    }).then(function(resp) {
      return resp.data;
    })
  };

  var getDoctorInfo = function(accessToken) {
    //This is not correct. Should look for individual doc
    return makeRequest(accessToken, '/api/doctors', 'doctors')
  }

  return {
    getAccess: getAccess,
    getDoctorInfo: getDoctorInfo
  }
})