(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .controller('MainController', MainController);

  function MainController(heatMapService) {
    let droneDiv = document.getElementById("drone-stream");
    new NodecopterStream(droneDiv);
  }
})();
