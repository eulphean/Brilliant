// Author: Amay Kataria
// Date: 05/21/2024
// File: Gui.js
// Description: A global GUI to control the variables to control the aesthetic and interactive experience.

const GUI_PARAMS = {
    title: 'Reflection Controls',
    maxSubrays: 5,
    rayDensity: 10,
    rayLength: 20,
    sourceRadius: 10,
    observerRadius: 10,
    hitpointRadius: 5,
    hideHitRays: false,
    hideRays: false
}

const ENVIRONMENT = {
    SANDBOX: 'sandbox',
    OBJECTIVE: 'objective'
}

const ENV_GUI_PARAMS = {
    title: 'Environment GUI',
    environment: 'sandbox'
}

const OBJ_GUI_PARAMS = {
    title: 'Objective GUI'
}

class Gui {
    constructor(onEnvUpdateCbk) {
        this.gui = new dat.GUI();
        this.gui.add(GUI_PARAMS, 'title');
        this.gui.add(GUI_PARAMS, 'rayDensity', 1, 50).step(1);
        this.gui.add(GUI_PARAMS, 'maxSubrays', 0, 20).step(1);
        this.gui.add(GUI_PARAMS, 'rayLength', 5, 100).step(1);
        this.gui.add(GUI_PARAMS, 'sourceRadius', 5, 50);
        this.gui.add(GUI_PARAMS, 'observerRadius', 5, 50);
        this.gui.add(GUI_PARAMS, 'hitpointRadius', 1, 10);
        this.gui.add(GUI_PARAMS, 'hideHitRays');
        this.gui.add(GUI_PARAMS, 'hideRays');


        this.envGui = new dat.GUI();
        this.envUpdatedCbk = onEnvUpdateCbk;
        this.envGui.add(ENV_GUI_PARAMS, 'title');
        this.envGui.add(ENV_GUI_PARAMS, 'environment', [ENVIRONMENT.SANDBOX, ENVIRONMENT.OBJECTIVE])
            .onChange(this.updateGuiParams.bind(this))
    }

    updateGuiParams() {
        // Update GUI params
        if (ENV_GUI_PARAMS.environment === ENVIRONMENT.OBJECTIVE) {
            GUI_PARAMS.rayDensity = 12;
            GUI_PARAMS.maxSubrays = 10;
        }

        if (ENV_GUI_PARAMS.environment === ENVIRONMENT.SANDBOX) {
            GUI_PARAMS.maxSubrays = 5;
            GUI_PARAMS.rayDensity = 10;
        }

        this.envUpdatedCbk();
    }

    update() {
        this.envGui.closed = false;
        if (ENV_GUI_PARAMS.environment === 'sandbox') {
            this.gui.closed = false;
        }

        if (ENV_GUI_PARAMS.environment === 'objective') {
            this.gui.closed = true;
        }
    }
}