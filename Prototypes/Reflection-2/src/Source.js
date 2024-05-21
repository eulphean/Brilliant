// Author: Amay Kataria
// Date: 05/20/2025
// File: Source.js
// Description: This is the source that emits rays. For this exercise, it'll be a point
// light with a flexible number of "rays" that will be emited.

const NUM_RAYS = 3; 
const SOURCE_RAD = 25;
class Source {
    constructor(x, y){
      this.pos = createVector(x, y);
      this.rays = []; 
      this.createRays();
    }

    createRays() {
      // Create an array of rays
      this.rays.length = 0; // Create fresh rays. 
      const inc = 2 * Math.PI / NUM_RAYS;
      for (let i = 0; i < NUM_RAYS; i++) {
        const angle = inc * i; 
        const r = new Ray (this.pos.x, this.pos.y, angle);
        this.rays.push(r);
      }
    }
    
    draw() {
        // Draw the source
        push();
          translate(this.pos.x, this.pos.y);
          fill("red");
          ellipse(0, 0, SOURCE_RAD, SOURCE_RAD);
        pop();

        // Draw all the rays
        this.rays.forEach(r => r.draw());
    }

    updatePosition(mouseX, mouseY) {
      this.pos.set(mouseX, mouseY);
      this.createRays();
    }

    cast(mirror) {
      this.rays.forEach(r => r.cast(mirror, null, 0, 0));
    }
}
  