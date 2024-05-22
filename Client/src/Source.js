// Author: Amay Kataria
// Date: 05/20/2025
// File: Source.js
// Description: This is the source that emits rays. For this exercise, it'll be a point
// light with a flexible number of "rays" that will be emited.

class Source {
    constructor(x, y){
      this.pos = createVector(width/2 + x, height/2 + y);
      this.boundsX = [0, width];
      this.boundsY = [0, height];

      // Create rays
      this.rays = []; 
      this.numRays = GUI_PARAMS.rayDensity;
      this.maxSubrays = GUI_PARAMS.maxSubrays;
      this.createRays();

      // Collection of all the virtual images created.
      this.virtualImages = [];
      this.observerImages = [];

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

      // Draw virtual images.
      this.virtualImages.forEach(vi => vi.draw());
      this.observerImages.forEach(oi => oi.draw());

      // Draw source blob.
      this.drawSource();
    }

    resetImages() {
      this.virtualImages = [];
      this.observerImages = [];
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
        else fill("red");
        ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
      pop();
    }

    updatePosition(newX, newY) {
      // Check for the X bounds
      if (newX > this.boundsX[0] && newX < this.boundsX[1]) {
          if (newY > this.boundsY[0] && newY < this.boundsY[1]) {
            this.pos.set(newX, newY);
            this.createRays();
          }
      }
    }

    addVirtualImage(image) {
      // Check if this image is here. 
      const found = this.virtualImages.find(vi => vi.imagePos.equals(image.imagePos))
      if (!found) {
        this.virtualImages.push(image)
      }
    }

    addObserverImage(image) {
      // Check if this image is here.
      const found = this.observerImages.find(oi => oi.imagePos.equals(image.imagePos));
      if (!found) {
        this.observerImages.push(image);
      }
    }
}
