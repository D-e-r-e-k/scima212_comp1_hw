function setup() {
    createCanvas(400, 400);
    colorMode(HSB, 255);
}

var t = 0;

function draw() {
    background(255);
    // let count = 0;
    for (var x = 10; x < width; x = x + 10) {
        stroke((x + t) % 255, 255, 255);
        line(x, height/2, mouseX, mouseY);
      // count++;
    }
    // console.log(count);
    t = (t + 1) % 255;
  }
  