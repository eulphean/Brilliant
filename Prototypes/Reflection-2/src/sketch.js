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

  observer = new Observer(width/2, height/2 + 100);
  source = new Source(width/2, height/2);
  gui = new Gui();
}

function draw() {
  // Refresh the screen
  rectMode(CORNER);
  fill(0);
  rect(0, 0, width, height);

  push();
  // Scale the canvas out, so we can calculate more images.  
  mirrors.forEach(m => m.draw());

  if (source) { 
    // Cast the rays from this source on the mirror.
    source.cast(mirrors, observer);

    // Draw the source -> rays -> subrays. 
    source.draw();
  }

  observer.draw();

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // Check if I collided with the source or with the observer.
  const mouse = createVector(mouseX, mouseY);
  
  // Did we select the source radius?
  const hitSource = collidePointCircleVector(mouse, source.pos, GUI_PARAMS.sourceRadius * 2);
  source.isActive = hitSource;

  // Did we select the observer?
  const hitObserver = collidePointCircleVector(mouse, observer.pos, GUI_PARAMS.observerRadius * 2);
  observer.isActive = hitObserver;
}

function mouseDragged() {
  if (source.isActive) {
    source.updatePosition(mouseX, mouseY);
  }

  if (observer.isActive) {
    observer.updatePosition(mouseX, mouseY);
  }
}