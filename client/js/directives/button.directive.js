(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .directive('btn', btn);

  btn.$inject = ['$interval', '$timeout', 'droneService'];

  function btn($interval, $timeout, droneService) {
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
          droneService.command(buttonValue);
          scope.promise = $interval(function() {
            droneService.command(buttonValue);
          }, 300);
        }
      }

      function mouseUp() {
        if (buttonValue !== 'Select' && buttonValue !== 'Start' && buttonValue !== 'B') {
          droneService.command('B');
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
//       droneService.command(buttonValue);
//     }
//   }, 300);
// });
//
// elem.bind('touchend', function() {
//   scope.longPress = false;
// });
