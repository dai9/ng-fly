var app = angular.module('ngFlyApp', ['ui.router', 'btford.socket-io', 'luegg.directives']);

app.config(function($stateProvider, $locationProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    controller: 'ChatCtrl',
    templateUrl: 'templates/chatroom.html'
  });
  $locationProvider.html5Mode(true);
});
