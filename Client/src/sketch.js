// Author: Amay Kataria
// Date: 05/20/2024
// File: sketch.js
// Description: Entry point for the project.

// light source
let source;

// reflecting mirror
let mirrors = [];
let observer; 

// GUI
let gui;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a mirror that will reflect the rays.
  const mirrorA = new Mirror(50, 50, 75);
  const mirrorB = new Mirror(-50, 50, 75);
  mirrors.push(mirrorA);
  mirrors.push(mirrorB);

  observer = new Observer(0, 100);
  source = new Source(0, 0);
  gui = new Gui(this.onEnvironmentUpdated.bind(this));
}

function onEnvironmentUpdated() {
  source.updatePosition(width/2, height/2);
  observer.updatePosition(width/2, height/2 + 100);

  // Setup components for the OBJECTIVE
  if (ENV_GUI_PARAMS.environment === ENVIRONMENT.OBJECTIVE) {
    // Assign rigid bounds to the source. 
    source.isStatic = false;
    source.boundsX = [width/2 - 50 + GUI_PARAMS.sourceRadius * 2, width/2 + 50 - GUI_PARAMS.sourceRadius * 2];
    source.boundsY = [height/2 - 75*2, height/2 + 75*2]

    observer.isStatic = true;
  }

  if (ENV_GUI_PARAMS.environment === ENVIRONMENT.SANDBOX) {
    source.isStatic = false;
    source.boundsX = [0, width];
    source.boundsY = [0, height];

    observer.isStatic = false;
  }
}


function draw() {
  // Refresh the screen
  rectMode(CORNER);
  fill(0);
  rect(0, 0, width, height);

  // Update gui
  gui.update();
  // Cast the rays from this source on the mirror.
  source.cast(mirrors, observer);

  // Scale the canvas out, so we can calculate more images.  
  mirrors.forEach(m => m.draw());
  
  // Draw the source -> rays -> subrays. 
  source.draw();

  // Draw the observer
  observer.draw();

  if (ENV_GUI_PARAMS.environment === ENVIRONMENT.OBJECTIVE) {
    textSize(16);
    if (source.observerImages.length === 4) {
      fill("green")
      text("Objective: Accompolished", width/2 - 100, height/2 + 300, 200, 100);
    } else {
      fill("white")
      text("Objective: Drag the light source (red dot) to create exactly 4 virtual images visible for the observer (pink dot)", 
        width/2 - 400, height/2 + 300, 800, 100);
    }
  }

  source.resetImages();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // Check if I collided with the source or with the observer.
  const mouse = createVector(mouseX, mouseY);
  
  // Did we select the source radius?
  const hitSource = collidePointCircleVector(mouse, source.pos, GUI_PARAMS.sourceRadius * 2);
  source.canDrag = hitSource;

  // Did we select the observer?
  const hitObserver = collidePointCircleVector(mouse, observer.pos, GUI_PARAMS.observerRadius * 2);
  observer.canDrag = hitObserver;
}

function mouseDragged() {
  if (!source.isStatic && source.canDrag) {
    source.updatePosition(mouseX, mouseY);
  }

  if (!observer.isStatic && observer.canDrag) {
    observer.updatePosition(mouseX, mouseY);
  }
}

function mouseReleased() {
  source.isActive = false;
  observer.isActive = false;
}