var arDrone = require('ar-drone');

function Drone(drone) {
  this.drone = drone.createClient();
}

Drone.prototype.chat = function(command) {
  switch(command) {
    case 'takeoff':
      this.drone.takeoff();
      break;
    case 'stop':
      this.drone.stop();
      break;
    case 'land':
      this.drone.land();
      break;
    case 'up':
      this.drone.up(0.1);
      break;
    case 'down':
      this.drone.down(0.1);
      break;
  }
};

Drone.prototype.gamepad = function(command) {
  switch(command) {
    case 'left':
      console.log('left');
      // this.drone.left(0.1);
      break;
    case 'right':
      console.log('right');
      // this.drone.right(0.1);
      break;
    case 'up':
      console.log('up');
      // this.drone.up(0.1);
      break;
    case 'turnRight':
      console.log('turn right');
      // this.drone.clockwise(0.1);
      break;
    case 'down':
      console.log('down');
      // this.drone.down(0.1);
      break;
    case 'turnLeft':
      console.log('turn left');
      // this.drone.counterClockwise(0.1);
      break;
    case 'front':
      console.log('front');
      // this.drone.front(0.1);
      break;
    case 'back':
      console.log('back');
      // this.drone.stop();
      break;
    case 'flip':
      console.log('flip');
      // this.drone.front(0.1);
      break;
    case 'stop':
      console.log('stop');
      // this.drone.stop();
      break;
    case 'takeoff':
      console.log('takeoff');
      // this.drone.takeoff();
      break;
    case 'land':
      console.log('land');
      // this.drone.land();
      break;
  }
};

var parrot = new Drone(arDrone);

module.exports = parrot;
