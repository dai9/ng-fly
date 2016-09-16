(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['droneService'];

  function ChatController(droneService) {
    var vm = this;
    vm.username = droneService.username;
    vm.message = '';
    vm.messages = droneService.messages();
    vm.sendMessage = sendMessage;

    function sendMessage(username, body) {
      droneService.send(username, body);
      vm.message = '';
    }
  }
})();
