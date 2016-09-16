'use strict';

(function () {
  'use strict';

  angular.module('ngFlyApp', ['ui.router', 'btford.socket-io', 'luegg.directives', 'ngAnimate']);
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').config(route);

  route.$inject = ['$stateProvider', '$locationProvider'];

  function route($stateProvider, $locationProvider) {
    $stateProvider.state('home', {
      url: '/',
      controller: 'ChatController',
      controllerAs: 'vm',
      templateUrl: 'templates/chatroom.html'
    }).state('gamepad', {
      url: '/gamepad',
      templateUrl: 'templates/gamepad.html'
    }).state('keyboard', {
      url: '/keyboard',
      templateUrl: 'templates/keyboard.html'
    });
    $locationProvider.html5Mode(true);
  }
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').controller('ChatController', ChatController);

  ChatController.$inject = ['droneService'];

  function ChatController(droneService) {
    var vm = this;
    vm.username = droneService.username;
    vm.message = '';
    vm.messages = droneService.messages();
    vm.sendMessage = sendMessage;

    function sendMessage(username, body) {
      droneService.send(username, body);
      vm.message = '';
    }
  }
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').directive('btn', btn);

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
      var command = elem[0].innerHTML;
      elem.bind('mousedown', mouseDown);
      elem.bind('mouseup', mouseUp);

      function mouseDown(e) {
        if (e.which === 1) {
          droneService.command(scope.convert[command]);
          scope.repeat = $interval(function () {
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

(function () {
  'use strict';

  angular.module('ngFlyApp').directive('keyboard', keyboard);

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
      $document.bind('keydown', function (e) {
        var command = scope.keycodes[e.which];
        if (command) {
          var key = document.getElementsByClassName(command)[0];
          key.classList.add('active');
          droneService.command(scope.convert[command]);
        }
      });
      $document.bind('keyup', function (e) {
        var command = scope.keycodes[e.which];
        if (command) {
          droneService.command('stop');
          var key = document.getElementsByClassName(command)[0];
          key.classList.remove('active');
        }
      });
    }
  }
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').factory('droneService', droneService);

  droneService.$inject = ['socket'];

  function droneService(socket) {
    var username = generateName();
    var messagesList = [];
    var service = {
      username: username,
      messages: messages,
      command: command,
      send: send
    };

    socket.on('message', function (message) {
      messagesList.push(message);
    });

    return service;

    ////////////

    function messages() {
      return messagesList;
    }

    function command(command) {
      socket.emit('command', command);
    }
    function send(username, body) {
      socket.emit('message', {
        username: username,
        body: body
      });
    }

    function generateName() {
      var length = arguments.length <= 0 || arguments[0] === undefined ? 4 : arguments[0];

      var username = 'Guest#';
      for (var i = 0; i < length; i++) {
        username += Math.floor(Math.random() * 10);
      }
      return username;
    }
  }
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').factory('socket', socket);

  socket.$inject = ['socketFactory'];

  function socket(socketFactory) {
    return socketFactory();
  }
})();