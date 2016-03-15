angular.module('docdoc.token',[])
.controller('TokenController', function($scope, $location, Token) {
  var getAccess = function() {
    Token.getAccess().then(function(token) {
      localStorage.setItem('docdoc', token);
      $location.path('/');
    })
  }

  var getUser = function() {
    // Token
  }

  getAccess();
})