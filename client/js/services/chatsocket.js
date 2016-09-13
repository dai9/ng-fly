angular.module('ngFlyApp')
.factory('chatSocket', ['socketFactory', function(socketFactory) {
  return socketFactory();
}]);
