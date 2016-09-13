angular.module('ngFlyApp')
.controller('ChatCtrl', ['$scope', 'ChatService', 'username', function($scope, ChatService, username) {
  $scope.view = {};
  $scope.view.username = username;
  $scope.view.message = '';
  $scope.view.messages = ChatService.messages();
  $scope.sendMessage = function(username, body) {
    if (body.length > 0) {
      ChatService.send(username, body);
      $scope.view.message = '';
      let messages = document.getElementById('chat-messages');
      messages.scrollTop = messages.scrollHeight;
    }
  };
}]);
