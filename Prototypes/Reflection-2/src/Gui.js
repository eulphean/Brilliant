// Author: Amay Kataria
// Date: 05/21/2024
// File: Gui.js
// Description: A global GUI to control the variables to control the aesthetic and interactive experience.

const GUI_PARAMS = {
    title: 'Reflection Controls',
    maxSubrays: 2,
    rayDensity: 10,
    rayLength: 30,
    sourceRadius: 10,
    observerRadius: 10,
    hitpointRadius: 5,
}

class Gui {
    constructor() {
        this.gui = new dat.GUI();
        this.gui.add(GUI_PARAMS, 'title');
        this.gui.add(GUI_PARAMS, 'rayLength', 5, 100).step(1);
        this.gui.add(GUI_PARAMS, 'rayDensity', 1, 50).step(1);
        this.gui.add(GUI_PARAMS, 'sourceRadius', 5, 50);
        this.gui.add(GUI_PARAMS, 'observerRadius', 5, 50);
        this.gui.add(GUI_PARAMS, 'hitpointRadius', 1, 10);
        this.gui.add(GUI_PARAMS, 'maxSubrays', 1, 10).step(1);
    }
}