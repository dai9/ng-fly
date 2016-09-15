angular.module('ngFlyApp')
.service('DroneService', ['socket', function(socket) {
  function generateName(length = 4) {
    let username = 'Guest#';
    for (let i = 0; i < length; i++) {
      username += Math.floor(Math.random() * 10);
    }
    return username;
  }

  let messages = [];
  this.username = generateName();
  this.messages = function() {
    return messages;
  };

  this.command = function(command) {
    socket.emit('command', command);
  };
  this.send = function(username, body) {
    socket.emit('message', {
      username: username,
      body: body
    });
  };
  socket.on('message', function(message) {
    messages.push(message);
  });
}]);
