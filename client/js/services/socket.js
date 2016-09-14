angular.module('ngFlyApp')
.factory('socket', ['socketFactory', function(socketFactory) {
  return socketFactory();
}]);
