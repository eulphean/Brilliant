// Author: Amay Kataria
// Date: 05/20/2024
// File: Source.js
// Description: The core class that implements a ray of light travelling in the space.

// Default ray length to draw
const RAY_LENGTH = 10;

// Maximum time a ray can be reflected off the mirrors.
const MAX_RECURIVE_CAST = 5; 
class Ray {
  constructor(x, y, angle) {
    this.startPos = createVector(x, y); // Start point for this ray.
    this.heading = p5.Vector.fromAngle(angle); // Direction of the ray
    this.hitpoint = createVector(-1, -1); // Point at which this ray ends. 
    this.subray = ''; // Subray created from a collision.
    this.dist = -1; // Distance that a ray travels till it encounters a hitpoint.
    this.observerPoint = createVector(-1, -1); // Point at which this ray reaches the observer
  }

  cast(mirrors, observer, prevMirror, prevDist, subcalls) {
    // Store the distance already travelled by the ray.
    //this.dist = prevDist; 
    // Cast this ray onto the mirror, which means if this ray collides with the mirror. 
    // NOTE: We create a really long line in the "direction" of the ray to supply to the collision API
    const endPos = this.heading.copy();
    endPos.setMag(5000); // Infinitely scale the ray in this direction.
    endPos.set(this.startPos.x + endPos.x, this.startPos.y + endPos.y);

    // Check collision with the observer. 
    const hitObserver = collideLineCircleVector(this.startPos, endPos, observer.pos, observer.diameter, true);
    if (hitObserver) {
      this.observerPoint.set(observer.pos.x, observer.pos.y);
      return;   
    }
    
    // Detect collision with the mirrors.
    mirrors.forEach(mirror => {
      // Ensure that we don't cast on the previous mirror that we just casted on.
      if (mirror !== prevMirror) {
        // NOTE: Using p5.collision2D helper.
        const hitMirror = collideLineLineVector(mirror.startPos, mirror.endPos, this.startPos, endPos, true);

        // Do we have a valid hit point? 
        // Reflect this ray off this surface.
        if (hitMirror.x & hitMirror.y) {
          this.hitpoint.set(hitMirror.x, hitMirror.y); // End this ray right here. 
          this.dist = prevDist + this.startPos.dist(this.hitpoint); // Calc distance from startPoint to hitPoint.
          this.subray = mirror.reflect(this); // Process a new ray by reflecting off the mirror.

          // Recursively cast this ray on the mirrors. 
          // CAUTION: Ensure that the current mirror it just casted on is sent as the "previousMirror"
          if (subcalls < MAX_RECURIVE_CAST) {
            this.subray.cast(mirrors, observer, mirror, this.dist, ++subcalls);
          }          
        }
      }
    });
  }

  hasCollided() {
    return (this.hitpoint.x > 0 && this.hitpoint.y > 0 ||
          this.observerPoint.x > 0 && this.observerPoint.y > 0);
  }

  draw() {
      this.drawHit();
      this.drawObserver();
      this.drawVirtualImage();
      this.drawRay();
      this.drawSubray();
  }

  drawObserver() {
    push();
      if (this.observerPoint.x > 0 && this.observerPoint.y > 0) {
        stroke("magenta");
        line(this.startPos.x, this.startPos.y, this.observerPoint.x, this.observerPoint.y);
      }
    pop();
  }

  drawHit() {
    push();
      // Do I have a valid hitpoint?
      if (this.hitpoint.x > 0 && this.hitpoint.y > 0) {
        // Draw the hitpoint
        fill("green");
        noStroke();
        ellipse(this.hitpoint.x, this.hitpoint.y, 7, 7);

        // Draw the ray to the hitpoint.
        stroke("green");
        line(this.startPos.x, this.startPos.y, this.hitpoint.x, this.hitpoint.y);
      } 
    pop();
  }

  drawVirtualImage() {
    // This will be drawn by extending the reflected ray. 
    push();
      if (this.hitpoint.x > 0 && this.hitpoint.y > 0) {
        translate(this.hitpoint.x, this.hitpoint.y);
        const endPos = this.subray.heading.copy(); // Subray's direction vector.
        endPos.setMag(this.dist);  // Scale to the distance travelled. 
        endPos.mult(-1); // Flip the vector in the opposite direction.

        stroke("orange");
        line(0, 0, endPos.x, endPos.y);

        if (this.observerPoint.x > 0 && this.observerPoint.y > 0) {
          fill("cyan");
        } else {
          fill("orange");
        }
        ellipse(endPos.x, endPos.y, 25, 25);
      }
    pop();
  }

  drawRay() {
    push();
      // Draw the ray that doesn't hit anything (for preview)
      if (!this.hasCollided()) {
        translate(this.startPos.x, this.startPos.y);
        stroke("white");
        let endPos = this.heading.copy(); 
        endPos.setMag(RAY_LENGTH * 2.5);
        line(0, 0, endPos.x, endPos.y);
      }
    pop();
  }

  drawSubray() {
    // Recursively draw the subray.
    if (this.subray) {
      this.subray.draw();
    }
  }
}