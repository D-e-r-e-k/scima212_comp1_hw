//originally from https://editor.p5js.org/cp1/sketches/DjZOtKRie
//inspired by https://www.youtube.com/watch?v=FZpftZccc6U
var bubbles = [];

function setup() {
  createCanvas(800, 600);

  // var center = {
  //   x: 400,
  //   y: height / 2
  // };

  for (var i = 0; i < 8; i++) {
    var bubble = {
      x: random(width),
      y: random(height),
      vx: 0,
      vy: 0,
      elascx: 0 - random(0.05), //elastisity constant
      elascy: 0 - random(0.05),
      
      z: random(20, 50),
      vz: 0,
      elascz: 0 - random(0.2),

      radius: random(50, 100),
      
      morph: random(5, 15), //shape
      dmorph: 0, //delta morph
      elasc: 0 - random(1, 3) 
    };
    bubbles.push(bubble);
  }
  // strokeWeight(2);
  // stroke(255, 127);
  noStroke();
}

function draw() {
  background(31);

  for (var i = 0; i < bubbles.length; i++) {
    var bubble = bubbles[i];

    if (dist(mouseX, mouseY, bubble.x, bubble.y) < bubble.radius) {
      if (mouseIsPressed) {
        bubbles.splice(i, 1); // remove this bubble!
        //break;
      }
      fill(255, 127 + bubble.z / 2); //highlighted
    } else {
      fill(255, 63 + bubble.z);
    }

    ellipse(bubble.x, bubble.y, bubble.radius * 2 - bubble.morph + bubble.z, bubble.radius * 2 + bubble.morph + bubble.z);
    
    bubble.dmorph = bubble.dmorph + bubble.elasc * bubble.morph / 30; //oscillation based on shm
    bubble.morph = bubble.morph + bubble.dmorph / 30;
    
    bubble.vx = bubble.vx + bubble.elascx * (bubble.x - 400) / 30; 
    bubble.x = bubble.x + bubble.vx / 30;

    bubble.vy = bubble.vy + bubble.elascy * (bubble.y - 300) / 30; 
    bubble.y = bubble.y + bubble.vy / 30;

    bubble.vz = bubble.vz + bubble.elascz * bubble.z / 30; 
    bubble.z = bubble.z + bubble.vz / 30; //poor abstraction, hopefully fix it someday
    // bubble.x += random(-1, 1);
    // bubble.y += random(-1, 1);
  }
}

