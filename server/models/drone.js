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
  console.log(command);
  // switch(command) {
  //   case 'L':
  //     this.drone.left(0.1);
  //     break;
  //   case 'R':
  //     this.drone.right(0.1);
  //     break;
  //   case '↑':
  //     this.drone.up(0.1);
  //     break;
  //   case '→':
  //     this.drone.clockwise(0.1);
  //     break;
  //   case '↓':
  //   this.drone.down(0.1);
  //     break;
  //   case '←':
  //     this.drone.counterClockwise(0.1);
  //     break;
  //   case 'A':
  //     this.drone.front(0.1);
  //     break;
  //   case 'B':
  //     this.drone.stop();
  //     break;
  //   case 'Start':
  //     this.drone.takeoff(() => {
  //       this.drone.stop();
  //     });
  //     break;
  //   case 'Select':
  //     this.drone.land();
  //     break;
  // }
};

var parrot = new Drone(arDrone);

module.exports = parrot;
