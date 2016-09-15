angular.module('ngFlyApp')
.controller('ChatCtrl', ['$scope', 'DroneService', function($scope, DroneService) {
  $scope.view = {};
  $scope.view.username = DroneService.username;
  $scope.view.message = '';
  $scope.view.messages = DroneService.messages();
  $scope.sendMessage = function(username, body) {
    DroneService.send(username, body);
    $scope.view.message = '';
  };
}]);
