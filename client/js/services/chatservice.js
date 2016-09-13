angular.module('ngFlyApp')
.service('ChatService', ['chatSocket', function(chatSocket) {
  this.generateName = function(length = 4) {
    let username = 'Guest#';
    for (let i = 0; i < length; i++) {
      username += Math.floor(Math.random() * 10);
    }
    return username;
  };

  let messages = [];
  this.messages = function() {
    return messages;
  };

  this.send = function(username, body) {
    chatSocket.emit('message', {
      username: username,
      body: body
    });
  };
  chatSocket.on('message', function(message) {
    messages.push(message);
  });
}]);
