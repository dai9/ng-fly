var arDrone = require('ar-drone');
var parrot = new Drone(arDrone);

function Drone(drone) {
  this.drone = drone.createClient();
  this.pos = [0, 0, 0];
  this.airborne = false;
}

Drone.prototype.command = function(command) {
  switch(command) {
    case 'up':
      console.log('up');
      this.pos[1] += 1;
      this.drone.up(0.1);
      break;
    case 'right':
      console.log('right');
      this.pos[0] += 1;
      this.drone.right(0.1);
      break;
    case 'down':
      console.log('down');
      this.pos[1] -= 1;
      this.drone.down(0.1);
      break;
    case 'left':
      console.log('left');
      this.pos[0] -= 1;
      this.drone.left(0.1);
      break;
    case 'turn right':
      console.log('turn right');
      this.drone.clockwise(0.1);
      break;
    case 'turn left':
      console.log('turn left');
      this.drone.counterClockwise(0.1);
      break;
    case 'front':
      console.log('front');
      this.pos[2] -= 1;
      this.drone.front(0.1);
      break;
    case 'back':
      console.log('back');
      this.pos[2] += 1;
      this.drone.back(0.1);
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
    case 'order66':
      console.log('execute order 66');
      let client = this.drone;
      client.takeoff();
      client
        .after(500, function() {
          this.stop();
        })
        .after(1000, function() {
          this.front(0.1);
        })
        .after(1000, function() {
          this.back(0.1);
        })
        .after(500, function() {
          this.stop();
        })
        .after(500, function() {
          this.animate('flipLeft', 15);
        })
        .after(500, function() {
          this.stop();
          this.land();
        });
  }
};

module.exports = parrot;
