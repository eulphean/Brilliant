// Author: Amay Kataria
// Date: 05/21/2024
// File: Image.js
// Description: A core component that includes "virtual" image behavior in one abstract base class called Image.
// Two types of images, "VirtualImage" and "ObserverImage" extend that image, which are responsible to draw images 
// and their corresponding rays in the Virtual Plane. This heavily simplifies the Ray class.

class Image {
    constructor(startPos, imagePos, color, radius) {
        this.startPos = startPos;
        this.imagePos = imagePos;
        this.color = color;
        this.radius = radius;
    }

    draw() {
        push();
            translate(this.startPos.x, this.startPos.y);
            strokeWeight(2);
            stroke(this.color);
            line(0, 0, this.imagePos.x, this.imagePos.y);
    
            fill(this.color);
            ellipse(this.imagePos.x, this.imagePos.y, this.radius, this.radius);
        pop();
    }
}

// Image drawn behind the mirror based on the rays that are reflected off of it. 
class VirtualImage extends Image {
    constructor(startPos, imagePos) {
        super(startPos, imagePos, "orange", GUI_PARAMS.sourceRadius * 2);
    }
}

// Image drawn behind the mirror based on the rays that intersect with the observer.
class ObserverImage extends Image {
    constructor(startPos, imagePos) {
        super(startPos, imagePos, "magenta", GUI_PARAMS.sourceRadius * 2)
    }
}
