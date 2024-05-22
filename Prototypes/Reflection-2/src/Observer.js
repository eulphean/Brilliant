// Author: Amay Kataria
// Date: 05/21/2025
// File: Observer.js
// Description: The component handles the observer in the scene and which images they can actually see. 

class Observer {
    constructor(posX, posY) {
        this.pos = createVector(posX, posY);
        this.isActive = false;
        this.collisionDiameter = 0; 
    }

    draw() {
        this.collisionDiameter = GUI_PARAMS.observerRadius * 2; 
        push();
            if (this.isActive) {
                fill("white");
            } else {
                fill("magenta")
            }
            // Render an ellipse around the collision diameter.
            ellipse(this.pos.x, this.pos.y, this.collisionDiameter, this.collisionDiameter);
        pop();
    }

    updatePosition(newX, newY) {
        this.pos.set(newX, newY);
    }
}