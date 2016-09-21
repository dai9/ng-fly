(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .factory('heatMapService', heatMapService);

  heatMapService.$inject = ['$window', 'socket'];

  function heatMapService($window, socket) {
    class HeatMapRender {
      constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.currentPos = [0,0,0];

        //config
        this.renderer.setSize(window.innerWidth * 0.95, window.innerHeight * 0.75);
        this.controls.target.set(0,0,0);
        this.camera.position.z = 10;
      }

      createPoint(pos = this.currentPos, color = 0xff0000, size = 1) {
        console.log(pos);
        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(...pos));
        let material = new THREE.PointsMaterial({color: color, size: size});
        let newPoint = new THREE.Points(geometry, material);
        this.scene.add(newPoint);
      }
    }

    let droneHeatMap = new HeatMapRender();
    function render() {
      $window.requestAnimationFrame(render);
      droneHeatMap.renderer.render(droneHeatMap.scene, droneHeatMap.camera);
    }
    render();

    socket.on('pos', function(pos) {
      droneHeatMap.currentPos = pos;
      droneHeatMap.createPoint();
    });

    droneHeatMap.createPoint([0,0,-1]);
    let service = {
      renderer: droneHeatMap.renderer,
    };

    return service;
  }
})();
