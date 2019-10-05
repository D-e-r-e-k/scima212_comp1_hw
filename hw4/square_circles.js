function setup() {
    createCanvas(400, 400);
    //frameRate(10);
  }
  
  var x = []; // new empty array
  var y = []; // new empty array
  var r;
  
  
  function draw() {
    background(255);
    noFill();
  
    x.push(mouseX);
    y.push(mouseY);
  
    for (var i = 0; i < x.length; i = i + 10) {
      r = 1 + (x.length - i);
      rect(x[i] - r, y[i] - r, r * 2, r * 2);
    }
  
    x = x.slice(-50); // remove all but the last 50 x values
    y = y.slice(-50); // remove all but the last 50 y values
  }

