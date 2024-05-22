// Author: Amay Kataria
// Date: 05/21/2024
// File: Gui.js
// Description: A global GUI to control the aesthetics of the interactive experience.

const GUI_PARAMS = {
    title: 'Reflection Controls',
    maxSubrays: 5,
    rayDensity: 12,
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
        // RESET any changed parameters
        if (ENV_GUI_PARAMS.environment === ENVIRONMENT.OBJECTIVE) {
            GUI_PARAMS.rayDensity = 12;
            GUI_PARAMS.maxSubrays = 10;
            GUI_PARAMS.rayLength = 20;
            GUI_PARAMS.sourceRadius = 15;
            GUI_PARAMS.observerRadius = 15;
            GUI_PARAMS.hitpointRadius = 5;
            GUI_PARAMS.hideHitRays = false;
            GUI_PARAMS.hideRays = false;
        }

        // RESET any changed parameters.
        if (ENV_GUI_PARAMS.environment === ENVIRONMENT.SANDBOX) {
            GUI_PARAMS.maxSubrays = 5;
            GUI_PARAMS.rayDensity = 12;
            GUI_PARAMS.rayLength = 20;
            GUI_PARAMS.sourceRadius = 15;
            GUI_PARAMS.observerRadius = 15;
            GUI_PARAMS.hitpointRadius = 5;
            GUI_PARAMS.hideHitRays = false;
            GUI_PARAMS.hideRays = false;
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