'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  angular.module('ngFlyApp', ['ui.router', 'btford.socket-io', 'luegg.directives', 'ngAnimate']);
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').config(route);

  route.$inject = ['$stateProvider', '$locationProvider'];

  function route($stateProvider, $locationProvider) {
    var _isNotMobile = function () {
      var check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return !check;
    }();

    $stateProvider.state('fly', {
      url: '/',
      controller: 'MainController as vm',
      templateUrl: _isNotMobile ? 'templates/keyboard.html' : 'templates/gamepad.html'
    }).state('heatmap', {
      url: '/heatmap',
      controller: 'HeatMapController as vm',
      templateUrl: 'templates/heatmap.html'
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

  angular.module('ngFlyApp').controller('HeatMapController', HeatMapController);

  HeatMapController.$inject = ['heatMapService'];

  function HeatMapController(heatMapService) {
    var vm = this;
    vm.renderer = heatMapService.renderer;
    document.getElementById('heatmap-container').appendChild(vm.renderer.domElement);
  }
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').controller('MainController', MainController);

  function MainController(heatMapService) {
    var droneDiv = document.getElementById("drone-stream");
    new NodecopterStream(droneDiv);
  }
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').directive('btn', btn);

  btn.$inject = ['$interval', 'droneService'];

  function btn($interval, droneService) {
    return {
      restrict: 'E',
      link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {
      var command = elem[0].innerHTML;
      var promise = void 0;
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
      var keyboard = document.getElementsByClassName('keyboard')[0];
      $document.bind('keydown', function (e) {
        var command = scope.keycodes[e.which];
        if (command) {
          var key = document.getElementsByClassName(command)[0];
          key.classList.add('active');
          droneService.command(droneService.convert[command]);
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

  angular.module('ngFlyApp').factory('didYouMean', didYouMean);

  function didYouMean() {
    var service = {
      findMatch: findMatch
    };
    return service;

    ////////////

    function findMatch(word, dict, limit) {
      var minDist = Infinity;
      var match = null;
      for (var i = 0; i < dict.length; i++) {
        var currDist = editDist(word, dict[i]);
        if (currDist < minDist) {
          minDist = currDist;
          match = dict[i];
        }
      }
      return minDist <= limit ? match : null;
    }

    function editDist(a, b) {
      if (a.length === 0) {
        return b.length;
      }
      if (b.length === 0) {
        return a.length;
      }
      var delta = a.substr(-1) !== b.substr(-1) ? 1 : 0;
      return Math.min(editDist(a.substr(0, a.length - 1), b.substr(0, b.length - 1)) + delta, editDist(a.substr(0, a.length - 1), b) + 1, editDist(a, b.substr(0, b.length - 1)) + 1);
    }
  }
})();

(function () {
  'use strict';

  angular.module('ngFlyApp').factory('droneService', droneService);

  droneService.$inject = ['socket', 'didYouMean'];

  function droneService(socket, didYouMean) {
    var username = generateName();
    var messagesList = [];
    var path = [];
    var convert = {
      q: 'left',
      w: 'up',
      e: 'right',
      a: 'turn left',
      s: 'down',
      d: 'turn right',
      u: 'flip',
      h: 'stop',
      j: 'back',
      k: 'front',
      enter: 'takeoff',
      shift: 'land',

      'L': 'left',
      'R': 'right',
      '↑': 'up',
      '→': 'turn right',
      '↓': 'down',
      '←': 'turn left',
      'X': 'flip',
      'A': 'front',
      'B': 'back',
      'Y': 'stop',
      'Select': 'land',
      'Start': 'takeoff'
    };
    var commands = ['left', 'up', 'right', 'turn left', 'down', 'turn right', 'flip', 'stop', 'back', 'front', 'takeoff', 'land'];
    var service = {
      username: username,
      messages: messages,
      command: command,
      send: send,
      convert: convert,
      path: path
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
      var isCommand = false;
      if (body.length <= 10) {
        var match = didYouMean.findMatch(body, commands, 1);
        if (match) {
          isCommand = true;
          body = match;
        }
      }
      socket.emit('message', {
        username: username,
        body: body,
        isCommand: isCommand
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

  angular.module('ngFlyApp').factory('heatMapService', heatMapService);

  heatMapService.$inject = ['$window', 'socket'];

  function heatMapService($window, socket) {
    var HeatMapRender = function () {
      function HeatMapRender() {
        _classCallCheck(this, HeatMapRender);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.currentPos = [0, 0, 0];

        //config
        this.renderer.setSize(window.innerWidth * 0.95, window.innerHeight * 0.75);
        this.controls.target.set(0, 0, 0);
        this.camera.position.z = 10;
      }

      _createClass(HeatMapRender, [{
        key: 'createPoint',
        value: function createPoint() {
          var pos = arguments.length <= 0 || arguments[0] === undefined ? this.currentPos : arguments[0];
          var color = arguments.length <= 1 || arguments[1] === undefined ? 0xff0000 : arguments[1];
          var size = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

          console.log(pos);
          var geometry = new THREE.Geometry();
          geometry.vertices.push(new (Function.prototype.bind.apply(THREE.Vector3, [null].concat(_toConsumableArray(pos))))());
          var material = new THREE.PointsMaterial({ color: color, size: size });
          var newPoint = new THREE.Points(geometry, material);
          this.scene.add(newPoint);
        }
      }]);

      return HeatMapRender;
    }();

    var droneHeatMap = new HeatMapRender();
    function render() {
      $window.requestAnimationFrame(render);
      droneHeatMap.renderer.render(droneHeatMap.scene, droneHeatMap.camera);
    }
    render();

    socket.on('pos', function (pos) {
      droneHeatMap.currentPos = pos;
      droneHeatMap.createPoint();
    });

    droneHeatMap.createPoint([0, 0, -1]);
    var service = {
      renderer: droneHeatMap.renderer
    };

    return service;
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