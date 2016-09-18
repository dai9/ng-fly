(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .directive('btn', btn);

  btn.$inject = ['$interval', 'droneService'];

  function btn($interval, droneService) {
    return {
      restrict: 'E',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {
      let command = elem[0].innerHTML;
      let promise;
      elem.bind('touchstart', touchStart);
      elem.bind('touchend', touchEnd);

      function touchStart(e) {
        promise = $interval(longTouch, 300);
      }
      function touchEnd(e) {
        $interval.cancel(promise);
      }
      function longTouch() {
        droneService.command(droneService.convert[command]);
      }
    }
  }
})();
