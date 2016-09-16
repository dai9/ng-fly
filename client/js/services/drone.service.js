(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .factory('DroneService', DroneService);

  DroneService.$inject = ['socket'];

  function DroneService(socket) {
    let username = generateName();
    let messagesList = [];
    let service = {
      username: username,
      messages: messages,
      command: command,
      send: send,
    };

    socket.on('message', function(message) {
      messagesList.push(message);
    });

    return service;

    ////////////

    function messages() {
      return messagesList;
    }

    function command(command) {
      socket.emit('command', command);
    }
    function send(username, body) {
      socket.emit('message', {
        username: username,
        body: body
      });
    }

    function generateName(length = 4) {
      let username = 'Guest#';
      for (let i = 0; i < length; i++) {
        username += Math.floor(Math.random() * 10);
      }
      return username;
    }
  }
})();
