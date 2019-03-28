class PhysicsEngine {
  constructor(width = 0, height = 0) {
    this.CANVAS_WIDTH = width;
    this.CANVAS_HEIGHT = height;
    this.canvas = document.getElementById('myCanvas');
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d');
  }


  


  //Draw Rectangle on Canvas
  rect(x = this.CANVAS_WIDTH/4, y = this.CANVAS_HEIGHT/4, width = 60, height = 30, color = 'blue') {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath(); 

    return [x, y, width, height];
  }
}


class Circle extends PhysicsEngine {
  constructor(width = 0, height = 0, x, y, vx0, vy0, Fx0, Fy0, radius, color, mass, e) {
    super(width, height);
    this.x = x || this.CANVAS_WIDTH/2;
    this.y = y || this.CANVAS_HEIGHT/2;
    this.radius = radius || 10;
    this.color = color || 'blue';
    this.mass = mass || 10;
    this.vx = vx0 || 0;
    this.vy = vy0 || 0;
    this.Fx = Fx0 || 0;
    this.Fy = Fy0 || 0.0981 * this.mass;
    this.e = e || 0.05;
    this.draw(this.x, this.y);
  }

  draw(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update_euler() {    

    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    if (this.walls()) {
      this.walls();
    } else {
      this.vx += this.Fx / this.mass;
      this.vy += this.Fy / this.mass;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.draw(this.x, this.y);

  }

  //Implement Runge Kutta (4th order)
  update_rk4(){
    //
  }






  walls() {
    //checks to see if walls of canvas are being hit
    //implements simple collision resolution

    if (this.y  + this.radius + this.vy >= this.CANVAS_HEIGHT || this.y - this.radius + this.vy <= 0) {
      //Top and Bottom Walls
      if (this.y - this.radius + this.vy <= 0) {
        this.y = this.radius;
      } else {
        this.y = this.CANVAS_HEIGHT - this.radius;
      }
      this.vy = -Math.abs(this.e * this.vy);
      return true;
    } else if (this.x  + this.radius + this.vx >= this.CANVAS_WIDTH || this.x - this.radius + this.vx <= 0) {
      //Top and Bottom Walls
      if (this.x - this.radius + this.vx <= 0) {
        this.x = this.radius;
      } else {
        this.x = this.CANVAS_WIDTH - this.radius;
      }
      this.vx = -Math.abs(this.e * this.vx);
      return true;
    }

    return false;

  }

}



const c1 = new Circle(500, 500);


// The higher this value, the less the fps will reflect temporary variations
// A value of 1 will only keep the last value
let filterStrength = 5;
let frameTime = 0, lastLoop = new Date, thisLoop;

function gameLoop(){
  c1.update_euler();
  let thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime+= (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;
}

// Report the fps only every second, to only lightly affect measurements
let fpsOut = document.getElementById('fps');
setInterval(function(){
  gameLoop();
  fpsOut.innerHTML = (1000/frameTime).toFixed(1) + " fps";
},1000/70);



/* CHECK IF VELOCITY == 0 EVENTUALLY */
let arr = [];
let sum = 0;
for (let i = 0; i < 1000; i++){
  c1.update_euler();
  arr[i] = Math.abs(c1.CANVAS_HEIGHT/2 - c1.y);
}
arr.forEach((item) => sum+=item);
console.log('Average Difference:', c1.CANVAS_HEIGHT/2 - (sum/1000));













