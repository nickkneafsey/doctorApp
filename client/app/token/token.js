angular.module('docdoc.token',[])
.controller('TokenController', function($scope, $location, Token) {
  var getAccess = function() {
    Token.getAccess().then(function(token) {
      localStorage.setItem('docdoc', token);
      
    }).then(function() {
      getDoctorInfo();
    })
  }

  var getDoctorInfo = function() {
    var token = localStorage.getItem('docdoc')
    Token.getDoctorInfo(token).then(function(data) {
      console.log(data);
      localStorage.setItem('doctor', JSON.stringify(data.results[0]));
      $location.path('/');
    })
  }

  getAccess();
})