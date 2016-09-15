var app = angular.module('ngFlyApp', ['ui.router', 'btford.socket-io', 'luegg.directives']);

app.config(function($stateProvider, $locationProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    controller: 'ChatCtrl',
    templateUrl: 'templates/chatroom.html'
  })
  .state('gamepad', {
    url: '/gamepad',
    templateUrl: 'templates/gamepad.html'
  })
  .state('keyboard', {
    url: 'keyboard',
    templateUrl: 'templates/keyboard.html'
  });
  $locationProvider.html5Mode(true);
});
