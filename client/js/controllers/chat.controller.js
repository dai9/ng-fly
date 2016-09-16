(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', 'DroneService'];

  function ChatController($scope, DroneService) {
    $scope.view = {};
    $scope.view.username = DroneService.username;
    $scope.view.message = '';
    $scope.view.messages = DroneService.messages();
    $scope.sendMessage = sendMessage;

    function sendMessage(username, body) {
      DroneService.send(username, body);
      $scope.view.message = '';
    }
  }
})();
