// Author: Amay Kataria
// Date: 05/20/2025
// File: Source.js
// Description: This is the source that emits rays. For this exercise, it'll be a point
// light with a flexible number of "rays" that will be emited, which can be controlled from
// the sandbox GUI.

class Source {
    constructor(x, y){
      this.pos = createVector(width/2 + x, height/2 + y);

      // Create rays
      this.rays = []; 
      this.numRays = GUI_PARAMS.rayDensity;
      this.maxSubrays = GUI_PARAMS.maxSubrays;
      this.createRays();
      this.color = "red";

      this.diameter = GUI_PARAMS.sourceRadius * 2;
      this.canDrag = false;
      this.isStatic = false;
    }

    createRays() {
      // Create an array of rays
      this.rays = []; // Create fresh rays. 
      this.virtualImages = []; // Create fresh images.
      const inc = 2 * Math.PI / this.numRays;
      for (let i = 0; i < this.numRays; i++) {
        const angle = inc * i; 
        const r = new Ray (this.pos.x, this.pos.y, angle);
        this.rays.push(r);
      }
    }

    
    cast(mirrors, observer) {
      this.rays.forEach(r => r.cast(this, mirrors, observer, null, 0, 0));
    }
    
    draw() {
      this.updateGuiParams();      
      
      // Draw rays.
      this.rays.forEach(r => r.draw());

      // Draw source blob.
      this.drawSource();
    }

    updateGuiParams() {
      // Update GUI params
      this.diameter = GUI_PARAMS.sourceRadius * 2;

      // Ray density has changed, recreate the rays.
      if (this.numRays !== GUI_PARAMS.rayDensity) { 
        this.numRays = GUI_PARAMS.rayDensity;
        this.createRays();
      }

      // Max recursive calls have changed, recreate the rays. 
      if (this.maxSubrays !== GUI_PARAMS.maxSubrays) {
        this.maxSubrays = GUI_PARAMS.maxSubrays;
        this.createRays();
      }
    }

    drawSource() {
      push();
        if (this.canDrag && !this.isStatic) fill("white");
        else fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
      pop();
    }

    updatePosition(newX, newY) {
      // Check for the X bounds
      this.pos.set(newX, newY);
      this.createRays();
    }
}
