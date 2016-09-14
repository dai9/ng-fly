angular.module('ngFlyApp')
.controller('ChatCtrl', ['$scope', 'ChatService', function($scope, ChatService) {
  $scope.view = {};
  $scope.view.username = ChatService.username;
  $scope.view.message = '';
  $scope.view.messages = ChatService.messages();
  $scope.sendMessage = function(username, body) {
    ChatService.send(username, body);
    $scope.view.message = '';
    // let messages = document.getElementById('chat-messages');
    // messages.scrollTop = messages.scrollHeight;
  };
}]);
