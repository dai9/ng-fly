var app = angular.module('helloApp', ['ui.router']);

app.config(function($stateProvider, $locationProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html'
  });
  $locationProvider.html5Mode(true);
});
