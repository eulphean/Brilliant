// Author: Amay Kataria
// Date: 05/21/2025
// File: Observer.js
// Description: The component handles the observer in the scene and which images they can actually see. 

class Observer {
    constructor(posX, posY) {
        this.pos = createVector(posX, posY);
        this.diameter = 20
        this.isActive = false;
    }

    draw() {
        push();
            fill("magenta");
            ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
        pop();
    }
}