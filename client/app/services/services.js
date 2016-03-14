angular.module('docdoc.services', [])
.factory('Home', function($http) {
  var getMessages = function(accessToken) {
    var token ='Bearer '+accessToken;
    console.log(token);
    return $http({
      method: 'GET',
      url: 'https://drchrono.com/api/users/current',
      headers: {
        'Authorization': token //,
        // 'Content-Type': 'text/plain'
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
        
        }
    })
    // return $http.jsonp('https://drchrono.com/api/users/current?jsoncallback=JSON_CALLBACK')
    .then(function(resp) {
      console.log("RESP", resp)
      return resp;
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