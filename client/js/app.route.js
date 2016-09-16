(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .config(route);

  route.$inject = ['$stateProvider', '$locationProvider'];

  function route($stateProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'ChatController',
        controllerAs: 'vm',
        templateUrl: 'templates/chatroom.html'
      })
      .state('gamepad', {
        url: '/gamepad',
        templateUrl: 'templates/gamepad.html'
      })
      .state('keyboard', {
        url: '/keyboard',
        templateUrl: 'templates/keyboard.html'
      });
    $locationProvider.html5Mode(true);
  }
})();
