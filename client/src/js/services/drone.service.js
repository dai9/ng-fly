(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .factory('droneService', droneService);

  droneService.$inject = ['socket'];

  function droneService(socket) {
    let username = generateName();
    let messagesList = [];
    let convert = {
      q: 'left',
      w: 'up',
      e: 'right',
      a: 'turn left',
      s: 'down',
      d: 'turn right',
      u: 'flip',
      h: 'stop',
      j: 'back',
      k: 'front',
      enter: 'takeoff',
      shift: 'land',

      'L': 'left',
      'R': 'right',
      '↑': 'up',
      '→': 'turn right',
      '↓': 'down',
      '←': 'turn left',
      'X': 'flip',
      'A': 'front',
      'B': 'back',
      'Y': 'stop',
      'Select': 'land',
      'Start': 'takeoff'
    };
    let service = {
      username: username,
      messages: messages,
      command: command,
      send: send,
      convert: convert
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
