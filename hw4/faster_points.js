function setup() {
    createCanvas(400, 400);
    colorMode(HSB, width, height, 100);
}

var x;
var y;

  function draw() {
    for (let i = 0; i < 100; i++) {
        x = random(width);
        y = random(height);
    
        stroke(x, y, 100);
        point(x, y);
    }
  }
  