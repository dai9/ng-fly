(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .directive('btn', btn);

  btn.$inject = ['$interval', '$timeout', 'DroneService'];

  function btn($interval, $timeout, DroneService) {
    return {
      restrict: 'E',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {
      let buttonValue = elem[0].innerHTML;
      elem.bind('mousedown', mouseDown);
      elem.bind('mouseup', mouseUp);

      function mouseDown(e) {
        if (e.which === 1) {
          DroneService.command(buttonValue);
          scope.promise = $interval(function() {
            DroneService.command(buttonValue);
          }, 300);
        }
      }

      function mouseUp() {
        if (buttonValue !== 'Select' && buttonValue !== 'Start' && buttonValue !== 'B') {
          DroneService.command('B');
        }
        $interval.cancel(scope.promise);
      }
    }
  }
})();

// elem.bind('touchstart', function() {
//   scope.longPress = true;
//   $timeout(function() {
//     if (scope.longPress) {
//       DroneService.command(buttonValue);
//     }
//   }, 300);
// });
//
// elem.bind('touchend', function() {
//   scope.longPress = false;
// });
