function setup() {
    createCanvas(400, 400);
    colorMode(HSB);
  }

var deltax = 3;
var speed = 3;

  function draw() {
    background(255);
    
    for (var x = 100; x < width; x = x + 10) {
      line((x + deltax) % (width + 100) - 100, height/2, (x + deltax) % (width + 100), height/2-75);
      // some remainder magic
    }

    deltax = (deltax + speed) % (width + 100);
  }
  