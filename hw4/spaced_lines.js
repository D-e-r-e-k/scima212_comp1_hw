function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(255);
    // let count = 0;
    for (var x = 60; x < width - 50; x = x + 50) {
      line(x, height/2, mouseX, mouseY);
      // count++;
    }
    // console.log(count);
  }
  