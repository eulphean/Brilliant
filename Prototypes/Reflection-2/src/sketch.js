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
  const mirrorA = new Mirror(width/2 + 100, height/2 - 100, width/2 + 100, height/2 + 100);
  const mirrorB = new Mirror(width/2 - 100, height/2 - 100, width/2 - 100, height/2 + 100);
  mirrors.push(mirrorA);
  mirrors.push(mirrorB);

  observer = new Observer(width/2, height/2 + 100);
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

function mouseClicked() {
  if (!source) {
    source = new Source(mouseX, mouseY);
  } else {
    source.updatePosition(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (source) {
    source.updatePosition(mouseX, mouseY);
  }
}