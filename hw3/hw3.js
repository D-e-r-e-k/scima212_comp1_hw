// originally from: https://editor.p5js.org/cp1/sketches/HvvGoGB6d

const bg_color = 255;

function setup() {
    createCanvas(800, 600);
    colorMode(HSB);
    background(bg_color);
}

const init_grass_height = 20;
const growth_speed = 6;
const grass_gap = 10;
const earth_height = 40;
const aftermow_height = 30;
const mow_height = 60;

var grass_pos = 0;
var grass_height = init_grass_height;
var max_height = 0;

function growGrass() {
    // draw one blade of grass
    stroke(random(60, 70), 100, 90);    // give every blade of grass a random yellow-greenish color
    var temp_height = random(grass_height)
    line(grass_pos, height - earth_height, grass_pos+random(-grass_gap, grass_gap), height - earth_height - temp_height);
    noStroke();

    if(temp_height > max_height) {
        max_height = temp_height;   // record the heightest grass
    }

    grass_pos += grass_gap;
}

function growFlower() {
    // draw flowers
    console.log(((max_height - 70) * (max_height - 70)) / (70 * 70));
    if (random() > (((max_height - 70) * (max_height - 70)) / (70 * 70) + 0.7)) {
        fill(random(180, 200), 128, 255);
        circle(random(grass_pos - grass_gap / 2, grass_pos + grass_gap/2), height - earth_height - grass_height + random(0, grass_gap/2), random(grass_gap));
    }
}

function detNewLayer() {
    // detect if the current layer is covered with grass
    if (grass_pos > width) {
        grass_pos = random(grass_gap);
        grass_height += growth_speed;
      }
}

function detMow() {
    // detect if it's time to mow, if so, mow
    if (mouseIsPressed) {
        mow(); 
      }
    
}

function mow() {
    // mow the grass
    fill(bg_color);
    rect(0, 0, width, height - aftermow_height - earth_height);
    grass_height = init_grass_height;

    max_height = aftermow_height;
}

function drawEarth() {
    // draw earth after every blade of grass for better detail on grass roots.
    fill(40, 100, 60);  // brown for earth
    rect(0, height - earth_height, width, earth_height);  // draw earth
}

function draw() {
    // main loop
    growGrass();
    growFlower();
    detNewLayer();
    detMow();  
    drawEarth();
}
