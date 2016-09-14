angular.module('ngFlyApp')
.controller('MainCtrl', ['$scope', 'ChatService', function($scope, ChatService) {
  $scope.view = {};
  $scope.view.username = ChatService.username;
  $scope.view.showMenu = false;
  $scope.toggleMenu = function() {
    $scope.view.showMenu = !$scope.view.showMenu;
  };
}]);
