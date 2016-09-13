angular.module('ngFlyApp')
.service('ChatService', function() {
  let messages = [
    {
      username: 'User1',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis laoreet augue, id vestibulum orci.'
    },
    {
      username: 'Guest2',
      message: 'Nullam in massa eu tortor volutpat sollicitudin.'
    },
    {
      username: 'Username3',
      message: 'In nulla purus, pulvinar vel urna luctus, vehicula aliquam quam. Cras at condimentum tellus.'
    }
  ];
  this.messages = function() {
    return messages;
  };
  this.send = function(message) {
    messages.push({
      username: 'newUser',
      message: message
    });
  };
});
