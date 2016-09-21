(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .controller('HeatMapController', HeatMapController);

  HeatMapController.$inject = ['heatMapService'];

  function HeatMapController(heatMapService) {
    var vm = this;
    vm.renderer = heatMapService.renderer;
    document.getElementById('heatmap-container').appendChild(vm.renderer.domElement);
  }
})();
