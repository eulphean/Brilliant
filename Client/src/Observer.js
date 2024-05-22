// Author: Amay Kataria
// Date: 05/21/2025
// File: Observer.js
// Description: The component handles the observer in the scene and which images they can actually see. 

class Observer {
    constructor(posX, posY) {
        this.pos = createVector(width/2 + posX, height/2 + posY);
        this.collisionDiameter = 0; 
        this.images = [];
        this.canDrag = false;
        this.isStatic = false;

        
        // Collection of all the virtual images created.
        // Virtual images created behind the mirror based on the current rayDensity and maxRecursiveCalls.
        this.virtualImages = []; 
        // Virtual images currently in purview of the observer. These are also created behind the mirror.
        this.observerImages = []; 
    }

    draw() {
        this.collisionDiameter = GUI_PARAMS.observerRadius * 2; 
        
        push();
            if (this.canDrag && !this.isStatic) fill("white");
            else fill("magenta");
            // Render an ellipse around the collision diameter.
            ellipse(this.pos.x, this.pos.y, this.collisionDiameter, this.collisionDiameter/2);
        pop();

        // Draw virtual images.
        this.virtualImages.forEach(vi => vi.draw());
        this.observerImages.forEach(oi => oi.draw());
    }

    updatePosition(newX, newY) {
        this.pos.set(newX, newY);
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
    
    resetImages() {
        this.virtualImages = [];
        this.observerImages = [];
    }
}