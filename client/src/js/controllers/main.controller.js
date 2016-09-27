(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .controller('MainController', MainController);

  function MainController(heatMapService) {
    let droneDiv = document.getElementById("drone-stream");
    new NodecopterStream(droneDiv);
    let counter = 0;

    let downloadLink = document.getElementById('download');
    downloadLink.addEventListener('click', function() {
      counter++;
      downloadCanvas(this, `dronesnap${counter}.png`);
    }, false);

    function downloadCanvas(link, filename) {
      let canvas = document.querySelector('#drone-stream canvas');
      link.href = canvas.toDataURL();
      link.download = filename;
    }
  }
})();
