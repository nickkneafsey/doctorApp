angular.module('docdoc', [
  'docdoc.services',
  'docdoc.token',
  'docdoc.home',
  'docdoc.auth',
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
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .otherwise({
      redirectTo: '/login'
    });

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
})