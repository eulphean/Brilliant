// Author: Amay Kataria
// Date: 05/20/2024
// File: Source.js
// Description: The core class that implements a ray of light travelling in the space.

// Variables related to moving ball

const RAY_LENGTH = 10;
class Ray {
  constructor(x, y, angle) {
    this.startPos = createVector(x, y);
    this.heading = angle;
    this.endPos = p5.Vector.fromAngle(angle);
  }
  
  draw() {
    // // NOTE: We have already translated to the origin.
    push();
    translate(this.startPos.x, this.startPos.y);
    stroke("blue");
    this.endPos.setMag(1000);
    line(0, 0, this.endPos.x, this.endPos.y);
    pop();
  }

  cast(mirror) {
    const endPos = createVector(this.endPos.x, this.endPos.y);
    endPos.setMag(5000); // Infinitely scale the ray in this direction.
    endPos.set(this.startPos.x + endPos.x, this.startPos.y + endPos.y);
    const hit = collideLineLineVector(mirror.startPos, mirror.endPos, this.startPos, endPos, true);
    if (hit.x && hit.y) {
      stroke("green");
      line(this.startPos.x, this.startPos.y, hit.x, hit.y);
      fill("green");
      ellipse(hit.x, hit.y, 20, 20);
    }
  }
}