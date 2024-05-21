// Author: Amay Kataria
// Date: 05/20/2025
// File: Source.js
// Description: This is the source that emits rays. For this exercise, it'll be a point
// light with a flexible number of "rays" that will be emited.

class Source {
    constructor(x, y){
      this.pos = createVector(x, y);
      this.rays = []; 
      this.createRays();
      this.isActive = false;
    }

    createRays() {
      // Create an array of rays
      this.rays.length = 0; // Create fresh rays. 
      const inc = 2 * Math.PI / GUI_PARAMS.numRays;
      for (let i = 0; i < GUI_PARAMS.numRays; i++) {
        const angle = inc * i; 
        const r = new Ray (this.pos.x, this.pos.y, angle);
        this.rays.push(r);
      }
    }
    
    draw() {
        // Draw all the rays
        this.rays.forEach(r => r.draw());

        // Draw the source
        push();
          translate(this.pos.x, this.pos.y);
          fill("red");
          ellipse(0, 0, GUI_PARAMS.sourceRadius, GUI_PARAMS.sourceRadius);
        pop();
    }

    updatePosition(mouseX, mouseY) {
      this.pos.set(mouseX, mouseY);
      this.createRays();
    }

    cast(mirrors, observer) {
      this.rays.forEach(r => r.cast(mirrors, observer, null, 0, 0));
    }
}
  