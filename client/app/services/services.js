angular.module('docdoc.services', [])
.factory('Home', function($http) {
  var getMessages = function(accessToken) {
    var token ='Bearer '+accessToken;
    console.log(token);
    return $http({
      method: 'GET',
      url: '/api/clinicalNotesTemplate',
      headers: {
        end: 'clinical_note_templates',
        auth: token,
        'Content-Type': 'application/json'
      }
    })
    // return $http.jsonp('https://drchrono.com/api/users/current?jsoncallback=JSON_CALLBACK')
    .then(function(resp) {
      return resp.data;
    }).catch(function(error){
      console.log("ERR", error)
    })
  }

  return {
    getMessages: getMessages
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