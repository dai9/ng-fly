angular.module('ngFlyApp')
.controller('MainCtrl', ['$scope', 'ChatService', function($scope, ChatService) {
  $scope.view = {};
  $scope.view.messages = ChatService.messages();
  $scope.sendMessage = function(message) {
    ChatService.send(message);
    $scope.view.message = '';
  };
}]);
