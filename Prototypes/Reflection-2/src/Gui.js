// Author: Amay Kataria
// Date: 05/21/2024
// File: Gui.js
// Description: A global GUI to control the variables to control the aesthetic and interactive experience.

const GUI_PARAMS = {
    title: 'Reflection Controls',
    rayLength: 30,
    numRays: 10,
    sourceRadius: 20,
    hitpointRadius: 5,
    maxSubrays: 2
}

class Gui {
    constructor() {
        this.gui = new dat.GUI();
        this.gui.add(GUI_PARAMS, 'title');
        this.gui.add(GUI_PARAMS, 'rayLength', 5, 100).step(1);
        this.gui.add(GUI_PARAMS, 'numRays', 1, 50).step(1);
        this.gui.add(GUI_PARAMS, 'sourceRadius', 5, 50);
        this.gui.add(GUI_PARAMS, 'hitpointRadius', 5, 10);
        this.gui.add(GUI_PARAMS, 'maxSubrays', 1, 10).step(1);
    }
}