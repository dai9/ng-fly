(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .controller('MainController', MainController);

  function MainController(heatMapService) {
    let droneDiv = document.getElementById("drone-stream");
    new NodecopterStream(droneDiv);

    let colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
    colors.on('track', function(event) {
      if (event.data.length === 0) {
        console.log('no colors detected');
      } else {
        event.data.forEach(function(rect) {
          console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        });
      }
    });

    let canvas = document.querySelector('#drone-stream canvas');
    tracking.track(canvas, colors);
  }
})();
