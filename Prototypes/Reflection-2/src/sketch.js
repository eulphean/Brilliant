// Author: Amay Kataria
// Date: 05/20/2024
// File: sketch.js
// Description: Entry point for the project.

// light source
let source;

// reflecting mirror
let mirrors = [];
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a mirror that will reflect the rays.
  const mirrorA = new Mirror(width/2, height/2 - 100, width/2 + 100, height/2 + 100);
  const mirrorB = new Mirror(width/2, height/2 - 100, width/2 - 100, height/2 + 100);
  mirrors.push(mirrorA);
  mirrors.push(mirrorB);
}

function draw() {
  // Refresh the screen
  rectMode(CORNER);
  fill(0);
  rect(0, 0, width, height);

  push();
  // Scale the canvas out, so we can calculate more images.  
  mirrors.forEach(m => m.draw());

  if (source) { 
    // Cast the rays from this source on the mirror.
    source.cast(mirrors);

    // Draw the source -> rays -> subrays. 
    source.draw();
  }

  pop();
}

function mouseClicked() {
  if (!source) {
    source = new Source(mouseX, mouseY);
  } else {
    source.updatePosition(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (source) {
    source.updatePosition(mouseX, mouseY);
  }
}

// UNUSED CODE - COME BACK TO THIS!
// o = new Source();
// mirror = new Mirror(width/2, height/2, 5);
// source = new Source(width/2, height/2);
// s = createVector(-1, 0);
// s.setMag(20);

// //draw background
// rectMode(CORNER);
// fill(0);
// rect(0, 0, width, height);

// // draw mirror
// mirror.draw();

// // let p = p5.Vector.normalize(source.ray.velocity)
// // p = p.setMag(30);
// // drawArrow(source.ray.pos, p, "green");

//     source.draw();

// if (source.ray.pos.x > mirror.pos.x) {
//   // Calculate the normal vector at this position. 
//   // Reflect the incoming velocity vector off from this
//   const newP = createVector(-1, 0);
//   newP.normalize();
//   newP.setMag(30);
  
//   drawArrow(source.ray.pos, newP, "blue");
  
//   let reflect = p5.Vector.reflect(source.ray.velocity, newP);
//   reflect.normalize();
//   reflect.setMag(source.ray.velocity.mag());
//   drawArrow(source.ray.pos, reflect, "orange");
  
//   source.ray.velocity = reflect;
// }
// function mouseClicked() {
//   source.updatePos(mouseX, mouseY);
// }

// function keyPressed() {
//   if (key === " ") {
//      source.updateEmit(); 
//   }
  
//   if (key === "r") {
//     source.updateHeading(false);
//   }
  
//   if (key === "t") {
//     source.updateHeading(true);
//   }
// }

// // Common helper to draw an arrow
// function drawArrow(base, vec, myColor) {
//   push();
//   stroke(myColor);
//   strokeWeight(3);
//   fill(myColor);
//   translate(base.x, base.y);
//   line(0, 0, vec.x, vec.y);
//   rotate(vec.heading());
//   let arrowSize = 4;
//   translate(vec.mag() - arrowSize, 0);
//   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
//   pop();
// }