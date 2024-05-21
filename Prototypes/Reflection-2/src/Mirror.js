// Author: Amay Kataria
// Date: 05/20/2024
// File: Mirror.js
// Description: This component describes the characteristics of a mirror. This is a simple line with 
// a stroke to it. The rays intersect with this object and reflects. 

class Mirror {
    constructor(startX, startY, endX, endY){
      this.startPos = createVector(startX, startY);
      this.endPos = createVector(endX, endY);
    }
    
    draw(){
        push();
          stroke('yellow');
          strokeWeight(5);
          line(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y);
        pop();
    }

    reflect(curRay) {
      // The point where the new ray begins.
      const startPoint = curRay.hitpoint;
      
      // Calculate the reflected ray.
      const r = p5.Vector.reflect(curRay.heading, createVector(1, 0));
      const heading = r.heading();

      // Create a new ray based on the reflected ray's angle.
      return new Ray(startPoint.x, startPoint.y, heading);
    }
  }
  