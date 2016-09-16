(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .directive('keyboard', keyboard);

  keyboard.$inject = ['$document', 'droneService'];

  function keyboard($document, droneService) {
    return {
      restrict: 'E',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {
      scope.keycodes = {
        81: 'q',
        87: 'w',
        69: 'e',
        65: 'a',
        83: 's',
        68: 'd',
        85: 'u',
        72: 'h',
        74: 'j',
        75: 'k',
        13: 'enter',
        16: 'shift'
      };
      scope.convert = {
        q: 'left',
        w: 'up',
        e: 'right',
        a: 'turnLeft',
        s: 'down',
        d: 'turnRight',
        u: 'flip',
        h: 'stop',
        j: 'back',
        k: 'front',
        enter: 'takeoff',
        shift: 'land'
      };
      $document.bind('keydown', function(e) {
        let command = scope.keycodes[e.which];
        if (command) {
          let key = document.getElementsByClassName(command)[0];
          key.classList.add('active');
          droneService.command(scope.convert[command]);
        }
      });
      $document.bind('keyup', function(e) {
        let command = scope.keycodes[e.which];
        if (command) {
          droneService.command('stop');
          let key = document.getElementsByClassName(command)[0];
          key.classList.remove('active');
        }
      });
    }
  }
})();
