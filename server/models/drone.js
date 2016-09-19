var arDrone = require('ar-drone');
var parrot = new Drone(arDrone);

function Drone(drone) {
  this.drone = drone.createClient();
  this.path = [];
  this.airborne = false;
}

Drone.prototype.command = function(command) {
  if (this.airborne) {
    this.path.push(command);
  }
  switch(command) {
    case 'left':
      console.log('left');
      this.drone.left(0.1);
      break;
    case 'right':
      console.log('right');
      this.drone.right(0.1);
      break;
    case 'up':
      console.log('up');
      this.drone.up(0.1);
      break;
    case 'turn right':
      console.log('turn right');
      this.drone.clockwise(0.1);
      break;
    case 'down':
      console.log('down');
      this.drone.down(0.1);
      break;
    case 'turn left':
      console.log('turn left');
      this.drone.counterClockwise(0.1);
      break;
    case 'front':
      console.log('front');
      this.drone.front(0.1);
      break;
    case 'back':
      console.log('back');
      this.drone.stop();
      break;
    case 'flip':
      console.log('flip');
      this.drone.front(0.1);
      break;
    case 'stop':
      console.log('stop');
      this.drone.stop();
      break;
    case 'takeoff':
      console.log('takeoff');
      this.airborne = true;
      this.drone.takeoff();
      break;
    case 'land':
      console.log('land');
      this.airborne = false;
      this.drone.land();
      break;
  }
};

module.exports = parrot;
