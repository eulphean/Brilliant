
//Position of left hand side of floor
let base1;

//Position of right hand side of floor
let base2;
//Length of floor
//let baseLength;

// Variables related to moving ball
let position;
let velocity;
let r = 6;
let speed = 3.5;


const SPEED = 3.5;
class Ray {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.heading = PI/2;
    this.velocity = createVector(0, 0);
  }
  
  draw() {
    // Update the ray first
    this.pos.add(this.velocity); 
    // Incident vector
    this.incidence = p5.Vector.mult(this.velocity, -1);
    this.incidence.normalize();
    
    // Then draw
    push();
    translate(this.pos.x, this.pos.y);
    fill("orange");
    ellipse(0, 0, 10, 10);
    pop();
  }
  
  setVelocity() {
    this.velocity = p5.Vector.fromAngle(this.heading - PI/2);
    this.velocity.mult(SPEED);
  }
  
  updatePos(x, y) {
    this.pos.x = x; 
    this.pos.y = y;
    this.setVelocity();
  }
  
  updateHeading(newHeading) {
    this.heading = newHeading;
  }
}
// Object that is reflected in the mirror. It will emit rayss :)
class Source {
  constructor(x, y){
    this.pos = createVector(x, y);
    this.heading = PI/2;
    this.ray = new Ray(x, y);
    this.shouldEmit = false;
  }
  
  draw() {
    push();
    // stroke(myColor);
    // strokeWeight(3);
    fill("white");
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    triangle(-10, 0, 10, 0, 0, -20);
    pop();
    
    push();
    fill("gray");
    translate(width-this.pos.x, this.pos.y);
    rotate(-this.heading);
    triangle(-10, 0, 10, 0, 0, -20);
    // ellipse(0, 0, 50, 10);
    pop(); 
    
    if (this.shouldEmit) {
      this.ray.draw(); 
    }
  }
  
  // Update the position
  updatePos(x, y) {
    this.pos.x = x; 
    this.pos.y = y;
    this.ray.updatePos(x, y);
  }
  
  updateHeading(forward) {
    if (forward) {
       this.heading += 0.1; 
    } else {
      this.heading -= 0.1;
    }
    
    this.ray.updateHeading(this.heading);
  }
  
  updateEmit() {
    this.shouldEmit = !this.shouldEmit; 
    this.ray.updatePos(this.pos.x, this.pos.y);
    this.ray.updateHeading(this.heading);
  }
}

class Mirror {
  constructor(x, y, mWidth){
    this.pos = createVector(x, y);
    this.width = mWidth;
    
    // // Calculate interceptor
    // this.normal = p5.Vector.normalize(this.pos);
    // // Flip the normal
    // this.normal = createVector(-this.normal.x, this.normal.y);
    // this.intercept = p5.Vector.dot(this.pos, this.normal);
  }
  
  draw(){
    fill("red")
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width, height);
  }
}

let source;
let mirror;

let s;
function setup() {
  createCanvas(800, 400);
  o = new Source();
  mirror = new Mirror(width/2, height/2, 5);
  source = new Source(width/2, height/2);
  s = createVector(-1, 0);
  s.setMag(20);
}

function draw() {
  //draw background
  rectMode(CORNER);
  fill(0);
  rect(0, 0, width, height);
  
  // draw mirror
  mirror.draw();
  
  // let p = p5.Vector.normalize(source.ray.velocity)
  // p = p.setMag(30);
  // drawArrow(source.ray.pos, p, "green");
  
      source.draw();
  
  if (source.ray.pos.x > mirror.pos.x) {
    // Calculate the normal vector at this position. 
    // Reflect the incoming velocity vector off from this
    const newP = createVector(-1, 0);
    newP.normalize();
    newP.setMag(30);
    
    drawArrow(source.ray.pos, newP, "blue");
    
    let reflect = p5.Vector.reflect(source.ray.velocity, newP);
    reflect.normalize();
    reflect.setMag(source.ray.velocity.mag());
    drawArrow(source.ray.pos, reflect, "orange");
    
    source.ray.velocity = reflect;
  }
}

function mouseClicked() {
  source.updatePos(mouseX, mouseY);
}

function keyPressed() {
  if (key === " ") {
     source.updateEmit(); 
  }
  
  if (key === "r") {
    source.updateHeading(false);
  }
  
  if (key === "t") {
    source.updateHeading(true);
  }
}

// Common helper to draw an arrow
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 4;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}