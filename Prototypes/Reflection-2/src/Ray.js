// Author: Amay Kataria
// Date: 05/20/2024
// File: Source.js
// Description: The core class that implements a ray of light travelling in the space.

// Default ray length to draw
const RAY_LENGTH = 10;
class Ray {
  constructor(x, y, angle) {
    this.startPos = createVector(x, y); // Start point for this ray.
    this.heading = p5.Vector.fromAngle(angle); // Direction of the ray
    this.hitpoint = createVector(-1, -1); // Point at which this ray ends. 
    this.subray = ''; // Subray created from a collision.
  }

  cast(mirrors, prevMirror, subcalls) {
      // Cast this ray onto the mirror, which means if this ray collides with the mirror. 
      // NOTE: We create a really long line in the "direction" of the ray to supply to the collision API
      const endPos = this.heading.copy();
      endPos.setMag(5000); // Infinitely scale the ray in this direction.
      endPos.set(this.startPos.x + endPos.x, this.startPos.y + endPos.y);
      
      mirrors.forEach(mirror => {
        // Ensure that I don't cast on the previous mirror that I just casted on.
        if (mirror !== prevMirror) {
          // NOTE: Using p5.collision2D helper.
          const hit = collideLineLineVector(mirror.startPos, mirror.endPos, this.startPos, endPos, true);
          this.hitpoint.set(hit.x, hit.y);
    
          // Do we have a valid hit point? 
          // Reflect this ray off this surface.
          if (this.hitpoint.x & this.hitpoint.y) {
            stroke("green");      
            line(this.startPos.x, this.startPos.y, this.hitpoint.x, this.hitpoint.y);
            fill("green");
            ellipse(this.hitpoint.x, this.hitpoint.y, 20, 20);
    
            // End this ray right here and create a new ray by reflecting it off the mirror. 
            // End this subray right here and process a new ray by reflecting it off the mirror.
            this.subray = mirror.reflect(this);

            // This subray should be casted on the mirrors again.
            // NOTE: Ensure that the current mirror it just casted on is sent as the "previousMirror"
            // that it shouldn't be casted on again.
            if (subcalls < 2) {
              this.subray.cast(mirrors, mirror, ++subcalls);
            }          
          }
        }
      });
    }

  draw() {
    // Draw the ray.
    push();
    translate(this.startPos.x, this.startPos.y);
    stroke("blue");
    let endPos = this.heading.copy(); 
    endPos.setMag(RAY_LENGTH * 10);
    line(0, 0, endPos.x, endPos.y);
    pop();

    if (this.subray) {
      this.subray.draw();
    }
  }
}


    // // Draw the subray.
    // if (this.subray) {
    //   // push();
    //   // translate(this.subray.startPos.x, this.subray.startPos.y);
    //   // endPos = this.subray.heading.copy();
    //   // endPos.setMag(RAY_LENGTH * );
    //   // stroke("green");
    //   // line(0, 0, endPos.x, endPos.y);
    //   // pop();

    //   this.subray.draw();
    // }