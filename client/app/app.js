angular.module('docdoc', [
  'docdoc.services',
  'docdoc.token',
  'docdoc.home',
  'docdoc.patient',
  'docdoc.auth',
  'docdoc.nav',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/login/login.html',
      controller: 'AuthController'
    })
    .when('/token', {
      templateUrl: 'app/token/token.html',
      controller: 'TokenController'
    })
    .when('/patient/:id', {
      templateUrl: 'app/patient/patient.html',
      controller: 'PatientController'
    })
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .otherwise({
      redirectTo: '/login'
    });

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    // $httpProvider.defaults.headers.common = {};
    // $httpProvider.defaults.headers.post = {};
    // $httpProvider.defaults.headers.put = {};
    // $httpProvider.defaults.headers.patch = {};

    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
})