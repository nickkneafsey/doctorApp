angular.module('docdoc.home', [])

.controller('HomeController', function ($scope, Home) {
  var accessToken = localStorage.getItem("docdoc")

  var getMessages = function() {
    Home.getMessages(accessToken).then(function(data) {
      console.log(data);
    })
  }

  getMessages();
});