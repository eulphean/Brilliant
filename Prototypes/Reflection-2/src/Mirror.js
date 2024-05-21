// Author: Amay Kataria
// Date: 05/20/2024
// File: Mirror.js
// Description: This component describes the characteristics of a mirror. This is a simple line with 
// a stroke to it. The rays intersect with this object and reflects. 

class Mirror {
    constructor(startX, startY, endX, endY){
      this.startPos = createVector(startX, startY);
      this.endPos = createVector(endX, endY);
      this.normal = this.calcNormal(); 
    }
    
    draw(){
        push();
          stroke('yellow');
          strokeWeight(5);
          line(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y);
        pop();
    }

    reflect(curRay) {
      this.hasHit = true; 

      // The point where the new ray begins.
      const startPoint = curRay.hitpoint;
      
      // Calculate the reflected ray.
      const r = p5.Vector.reflect(curRay.heading, this.normal);
      const heading = r.heading();

      // Create a new ray based on the reflected ray's angle.
      return new Ray(startPoint.x, startPoint.y, heading);
    }

    calcNormal() {
      // Slope of the line. 
      const m = createVector(this.endPos.x - this.startPos.x, this.endPos.y - this.startPos.y);
      // Rotate slope by 90 degrees to calculate normal.
      m.set(-m.y, m.x);
      return m;
    }
  }
  