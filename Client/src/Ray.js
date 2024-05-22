// Author: Amay Kataria
// Date: 05/20/2024
// File: Source.js
// Description: The core class that implements a ray of light travelling in the space.

class Ray {
  constructor(x, y, angle) {
    this.startPos = createVector(x, y); // Start point for this ray.
    this.heading = p5.Vector.fromAngle(angle); // Direction of the ray
    this.hitpoint = createVector(-1, -1); // Point at which this ray ends. 
    this.subray = ''; // Subray created from a collision.
    this.dist = -1; // Distance that a ray travels till it encounters a hitpoint.
    this.observerPoint = createVector(-1, -1); // Point at which this ray intersects with the observer
  }
  
  cast(source, mirrors, observer, prevMirror, prevDist, subcalls) {
    // Cast this ray onto the mirror, which means if this ray collides with the mirror. 
    // NOTE: We create a really long line in the "direction" of the ray to apply the collision API
    const endPos = this.heading.copy();
    endPos.setMag(5000); // Infinitely scale the ray in this direction.
    endPos.set(this.startPos.x + endPos.x, this.startPos.y + endPos.y);

    // Detect collision with the observer (ensure this ray is not directly from the source)
    if (!this.startPos.equals(source.pos)) {
      // If we collide, then return from here and don't try to collide with anything after this in its line of sight.
      const hitObserver = collideLineCircleVector(this.startPos, endPos, observer.pos, observer.collisionDiameter, true);
      if (hitObserver) {
        // Save the current position as the 
        this.observerPoint.set(observer.pos.x, observer.pos.y);
        this.dist = prevDist;

        // Calculate observer image.
        const startPos = this.startPos.copy();
        const imagePos = this.heading.copy();
        imagePos.setMag(-this.dist);
        const image = new ObserverImage(startPos, imagePos);
        observer.addObserverImage(image);
        return;   
      }
    }
    
    // CAUTION: Don't overcall this function. It'll lead to infinite Virtual Images.
    if (subcalls < GUI_PARAMS.maxSubrays) {
      // Find the closest mirror with which this ray collides.
      let shortestDistance = Infinity;
      let closestPos = createVector(-1, -1);
      let closestMirror = null;
      for (let mirror of mirrors) {
        // Ensure that we don't cast on the previous mirror that we just casted on.
        if (mirror !== prevMirror) {
          const hitMirror = collideLineLineVector(mirror.startPos, mirror.endPos, this.startPos, endPos, true);
          if (hitMirror.x > 0 && hitMirror.y > 0) {
            this.hitpoint.set(hitMirror.x, hitMirror.y);
            const dist = this.startPos.dist(this.hitpoint);
            if (dist < shortestDistance) {
              shortestDistance = dist;
              closestPos.set(this.hitpoint.x, this.hitpoint.y);
              closestMirror = mirror;
            }
          }
        }
      }

      // Did we find a valid closest mirror?
      if (closestMirror) {
        this.hitpoint.set(closestPos.x, closestPos.y); // End this ray right here. 
        this.dist = prevDist + this.startPos.dist(this.hitpoint); // Calc distance from startPoint to hitPoint.
        this.subray = closestMirror.reflect(this); // Process a new ray by reflecting off the closest mirror.

        // Create a "Virtual Image"
        // This hitpoint will create a new virtual image. Store the startPos so we know the starting point of the ray.
        const startPos = this.hitpoint.copy();
        const imagePos = this.subray.heading.copy(); // Derived from the direction vector of the subray created after reflection.
        imagePos.setMag(-this.dist);  // Scale to the total distance travelled by this ray and flip it.
        const vi = new VirtualImage(startPos, imagePos);
        observer.addVirtualImage(vi);

        // Recursively cast this ray on the mirrors. 
        // CAUTION: Ensure that the current mirror it just casted on is sent as the "previousMirror"
        // CAUTION: Put a cap on how many recursive calls you can call. More the calls, more images are created.
        this.subray.cast(source, mirrors, observer, closestMirror, this.dist, ++subcalls);  
      }
    }
  }

  // DRAW ROUTINES!
  draw() {
    this.drawSubray(); // Go deep and draw the last subray first.
    this.drawObserverRay(); // The rays that intersect with the observer.
    if (!GUI_PARAMS.hideHitRays) this.drawHitRay();
    if (!GUI_PARAMS.hideRays) this.drawRay();    
  }

  drawObserverRay() {
    if (this.observerPoint.x > 0 && this.observerPoint.y > 0) {
      push();
        stroke("magenta");
        line(this.startPos.x, this.startPos.y, this.observerPoint.x, this.observerPoint.y);
      pop();
    }
  }

  drawHitRay() {
    // Do I have a valid hitpoint?
    if (this.hitpoint.x > 0 && this.hitpoint.y > 0) {
      push();
        // Draw the hitpoint
        fill("green");
        noStroke();
        ellipse(this.hitpoint.x, this.hitpoint.y, GUI_PARAMS.hitpointRadius, GUI_PARAMS.hitpointRadius);

        // Draw the ray to the hitpoint.
        stroke("green");
        strokeWeight(2);
        line(this.startPos.x, this.startPos.y, this.hitpoint.x, this.hitpoint.y);
      pop();
    } 
  }

  drawRay() {
    // Draw the ray that doesn't hit anything (for preview)
    push();
      translate(this.startPos.x, this.startPos.y);
      stroke("white");
      let endPos = this.heading.copy(); 
      endPos.setMag(GUI_PARAMS.rayLength);
      line(0, 0, endPos.x, endPos.y);
    pop();
  }

  drawSubray() {
    // Recursively draw the subray.
    if (this.subray) {
      this.subray.draw();
    }
  }
}