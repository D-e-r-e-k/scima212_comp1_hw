//originally from: https://editor.p5js.org/cp1/sketches/hFPlxfpMl
function setup() {
    createCanvas(400, 400);
    //noStroke();
    //background(127);
  }
  
  // track the circle to draw next frame
  var x = 25;
  var y = 25;
  // track color
  var h = 0;
  
  function draw() {
    stroke(0);  
    colorMode(HSB);
  
    // draw circle with random hue
    fill(h, 100, 100);
    ellipse(x, y, 20);
  
    // set up next circle
    x = x + 25;
    h = (h + 25) % 400;
  
    // if we hit the right edge, go down a line
    if (x > width-25) {
      x = 25;
      y = y + 25;
    }
  
    // if we hit the bottom edge, reset to top
    if (y > height-25) {
      y = 25;
    }
  }
  