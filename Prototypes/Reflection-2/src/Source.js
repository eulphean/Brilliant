// Author: Amay Kataria
// Date: 05/20/2025
// File: Source.js
// Description: This is the source that emits rays. For this exercise, it'll be a point
// light with a flexible number of "rays" that will be emited.

class Source {
    constructor(x, y){
      this.pos = createVector(x, y);

      // Create rays
      this.rays = []; 
      // this.numRays = GUI_PARAMS.rayDensity;
      this.createRays();

      this.diameter = GUI_PARAMS.sourceRadius * 2;
      this.isActive = false;
    }

    createRays() {
      // Create an array of rays
      this.rays.length = 0; // Create fresh rays. 
      const inc = 2 * Math.PI / this.numRays;
      for (let i = 0; i < this.numRays; i++) {
        const angle = inc * i; 
        const r = new Ray (this.pos.x, this.pos.y, angle);
        this.rays.push(r);
      }
    }
    
    draw() {
      // Update GUI params
      this.diameter = GUI_PARAMS.sourceRadius * 2;
      
      // GUI has changed, create rays again.
      if (this.numRays !== GUI_PARAMS.rayDensity) { 
        this.numRays = GUI_PARAMS.rayDensity;
        this.createRays();
      }
      
      // Draw all the rays
      this.rays.forEach(r => r.draw());

      // Draw the source
      push();
        translate(this.pos.x, this.pos.y);
        fill("red");
        ellipse(0, 0, this.diameter, this.diameter);
      pop();
    }

    updatePosition(newX, newY) {
      this.pos.set(newX, newY);
      this.createRays();
    }

    cast(mirrors, observer) {
      this.rays.forEach(r => r.cast(this, mirrors, observer, null, 0, 0));
    }
}
  