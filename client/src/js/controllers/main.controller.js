(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$interval', 'socket'];

  function MainController($scope, $interval, socket) {
    let droneDiv = document.getElementById("drone-stream");
    new NodecopterStream(droneDiv);
    let streamCanvas = document.querySelector('#drone-stream canvas');
    let mirrorCanvas = document.getElementById('drone-mirror');
    let mirrorCtx = mirrorCanvas.getContext('2d');
    let savedData = new Image();

    let face = new tracking.ObjectTracker('face');
    face.setInitialScale(4);
    face.setStepSize(2);
    face.setEdgesDensity(0.1);

    function render() {
      mirrorCtx.clearRect(0, 0, mirrorCanvas.width, mirrorCanvas.height);
      savedData.src = streamCanvas.toDataURL('image/png');
      mirrorCtx.drawImage(savedData, 0, 0);
      tracking.track('#drone-mirror', face);

      face.on('track', function(event) {
        $scope.lastFacePos = event.data;
        event.data.forEach(function(rect) {
          socket.emit('faceDetected', {x: rect.x, y: rect.y});
          mirrorCtx.strokeStyle = '#a64ceb';
          mirrorCtx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        });
      });
      window.requestAnimationFrame(render);
    }
    render();

    socket.on('nearEdge', function(coords) {
      if (coords.x < 10) {
        mirrorCanvas.style.borderLeft = '0.3em solid red';
      } else if (coords.x >= 10) {
        mirrorCanvas.style.borderLeft = '0.3em solid #0c0c3c';
      }
      if (coords.x > 180) {
        mirrorCanvas.style.borderRight = '0.3em solid red';
      } else if (coords.x <= 180) {
        mirrorCanvas.style.borderRight = '0.3em solid #0c0c3c';
      }
      if (coords.y < 5) {
        mirrorCanvas.style.borderTop = '0.3em solid red';
      } else if (coords.y >= 5) {
        mirrorCanvas.style.borderTop = '0.3em solid #0c0c3c';
      }
      if (coords.y > 35) {
        mirrorCanvas.style.borderBottom = '0.3em solid red';
      } else if (coords.y <= 35) {
        mirrorCanvas.style.borderBottom = '0.3em solid #0c0c3c';
      }
    });
  }
})();
