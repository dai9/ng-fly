(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .factory('droneService', droneService);

  droneService.$inject = ['socket', 'didYouMean'];

  function droneService(socket, didYouMean) {
    let username = generateId();
    let messagesList = [];
    let path = [];
    let convert = {
      q: 'left',
      w: 'up',
      e: 'right',
      a: 'turn left',
      s: 'down',
      d: 'turn right',
      u: 'order66',
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
      'X': 'order66',
      'A': 'front',
      'B': 'back',
      'Y': 'stop',
      'Select': 'land',
      'Start': 'takeoff'
    };
    let commands = ['left', 'up', 'right', 'turn left', 'down', 'turn right', 'order66', 'stop', 'back', 'front', 'takeoff', 'land'];
    let service = {
      username: username,
      messages: messages,
      command: command,
      send: send,
      convert: convert,
      path: path,
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
      let isCommand = false;
      if (body.length <= 10) {
        let match = didYouMean.findMatch(body, commands, 1);
        if (match) {
          isCommand = true;
          body = match;
        }
      }
      socket.emit('message', {
        username: username,
        body: body,
        isCommand: isCommand
      });
    }

    function generateId(length = 4) {
      let username = 'Guest#';
      for (let i = 0; i < length; i++) {
        username += Math.floor(Math.random() * 10);
      }
      return username;
    }
  }
})();
