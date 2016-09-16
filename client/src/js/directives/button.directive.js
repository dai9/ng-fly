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
      scope.convert = {
        'L': 'left',
        'R': 'right',
        '↑': 'up',
        '→': 'turnRight',
        '↓': 'down',
        '←': 'turnLeft',
        'X': 'flip',
        'A': 'front',
        'B': 'back',
        'Y': 'stop',
        'Select': 'land',
        'Start': 'takeoff'
      };
      let command = elem[0].innerHTML;
      elem.bind('mousedown', mouseDown);
      elem.bind('mouseup', mouseUp);

      function mouseDown(e) {
        if (e.which === 1) {
          droneService.command(scope.convert[command]);
          scope.repeat = $interval(function() {
            droneService.command(scope.convert[command]);
          }, 300);
        }
      }

      function mouseUp() {
        droneService.command('stop');
        $interval.cancel(scope.repeat);
      }
    }
  }
})();
