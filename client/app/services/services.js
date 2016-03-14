angular.module('docdoc.services', [])
.factory('Home', function($http) {
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

  var getPatients = function(accessToken) {
    return makeRequest(accessToken, '/api/patients', 'patients');
  };

  return {
    getClinicalNotesTemplate: getClinicalNotesTemplate,
    getPatients: getPatients
  }
})
.factory('Auth', function($http, $window) {

})
.factory('Token', function($http) {
  var getAccess = function () {
    return $http({
      method: 'GET',
      url: '/access'
    }).then(function(resp) {
      return resp.data;
    })
  }

  return {
    getAccess: getAccess
  }
})