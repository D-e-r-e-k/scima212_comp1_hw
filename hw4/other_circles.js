function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    //frameRate(10);
  }
  
  var x = []; // new empty array
  var y = []; // new empty array
  var r;
  var init = 0;
  var sides  = 5;
  var ds = 0;
  
  function poly(x, y, r, s, init) {
    // x pos, y pos, radius, sides, init angle
    var sect_angle = 360 / s;
    beginShape();
    for(var i = 0; i <= s; i++) {
        vertex(x + cos(init + i * sect_angle) * r, y + sin(init + i * sect_angle) * r);
    }
    endShape();
  }

  function draw() {
    background(255);
    noFill();
  
    x.push(mouseX);
    y.push(mouseY);
  
    for (var i = 0; i < x.length; i = i + 10) {
      r = 1 + (x.length - i);
      poly(x[i], y[i], r, int(sides), init);
    }
  
    x = x.slice(-50); // remove all but the last 50 x values
    y = y.slice(-50); // remove all but the last 50 y values
    init = (init + 1) % 360;
    sides += ds;
    if (sides >= 16) {
        ds = -ds;
    } else if (sides <= 5) {
        ds = -ds;
    }

  }

