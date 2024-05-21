// Author: Amay Kataria
// Date: 05/20/2024
// File: Source.js
// Description: The core class that implements a ray of light travelling in the space.

// Maximum time a ray can be reflected off the mirrors.
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
    // Cast this ray onto the mirror, which means if this ray collides with the mirror. 
    // NOTE: We create a really long line in the "direction" of the ray to supply to the collision API
    const endPos = this.heading.copy();
    endPos.setMag(5000); // Infinitely scale the ray in this direction.
    endPos.set(this.startPos.x + endPos.x, this.startPos.y + endPos.y);
    
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
          if (subcalls < GUI_PARAMS.maxSubrays) {
            this.subray.cast(mirrors, observer, mirror, this.dist, ++subcalls);
          }          
        }
      }
    });

    // Check collision with the observer. 
    const hitObserver = collideLineCircleVector(this.startPos, endPos, observer.pos, observer.collisionDiameter, true);
    if (hitObserver) {
      this.observerPoint.set(observer.pos.x, observer.pos.y);
      console.log('observer hit');
      this.dist = prevDist;
      return;   
    }
  }

  hasCollided() {
    return (this.hitpoint.x > 0 && this.hitpoint.y > 0 ||
          this.observerPoint.x > 0 && this.observerPoint.y > 0);
  }

  draw() {
      this.drawHit();
      this.drawObserver();
      this.drawVirtualImages();
      //this.updateObserverImages();
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
        ellipse(this.hitpoint.x, this.hitpoint.y, GUI_PARAMS.hitpointRadius, GUI_PARAMS.hitpointRadius);

        // Draw the ray to the hitpoint.
        stroke("green");
        line(this.startPos.x, this.startPos.y, this.hitpoint.x, this.hitpoint.y);
      } 
    pop();
  }

  drawVirtualImages() {
    // This will be drawn by extending the reflected ray. 
    push();
      if (this.hitpoint.x > 0 && this.hitpoint.y > 0) {
        translate(this.hitpoint.x, this.hitpoint.y);
        const endPos = this.subray.heading.copy(); // Subray's direction vector.
        endPos.setMag(this.dist);  // Scale to the distance travelled. 
        endPos.mult(-1); // Flip the vector in the opposite direction.

        stroke("orange");
        line(0, 0, endPos.x, endPos.y);

        fill("orange");
        ellipse(endPos.x, endPos.y, GUI_PARAMS.sourceRadius, GUI_PARAMS.sourceRadius);
      }
    pop();
  }

  updateObserverImages() {
    // Update the images seen by the observer.
    push();
      if (this.observerPoint.x && this.observerPoint.y > 0) {
        translate(this.startPos.x, this.startPos.y);
        const endPos = this.heading.copy();
        endPos.setMag(this.dist);
        endPos.mult(-1)

        fill("magenta");
        ellipse(endPos.x, endPos.y, GUI_PARAMS.sourceRadius, GUI_PARAMS.sourceRadius);
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
        endPos.setMag(GUI_PARAMS.rayLength);
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