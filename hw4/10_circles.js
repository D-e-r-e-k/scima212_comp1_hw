function setup() {
    createCanvas(400, 400);
    //frameRate(10);
  }
  
  var x = []; // new empty array
  var y = []; // new empty array
  
  
  function draw() {
    background(255);
    noFill();
  
    x.push(mouseX);
    y.push(mouseY);
  
    for (var i = 0; i < x.length; i = i + 10) {
      ellipse(x[i], y[i], 1 + (x.length - i));
    }
  
    x = x.slice(-100); // remove all but the last 50 x values
    y = y.slice(-100); // remove all but the last 50 y values
  }

