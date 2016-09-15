angular.module('ngFlyApp')
.directive('btn', ['DroneService', function(DroneService) {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      elem.bind('click', function() {
        DroneService.command(this.innerHTML);
      });
    }
  };
}]);
