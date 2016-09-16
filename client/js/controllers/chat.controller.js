(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', 'droneService'];

  function ChatController($scope, droneService) {
    $scope.view = {};
    $scope.view.username = droneService.username;
    $scope.view.message = '';
    $scope.view.messages = droneService.messages();
    $scope.sendMessage = sendMessage;

    function sendMessage(username, body) {
      droneService.send(username, body);
      $scope.view.message = '';
    }
  }
})();
