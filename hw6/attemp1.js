let pg;
let stage = 1; // 1 for welcome, 2 for run
let a_mark_r = 10;
let d;
let v;
let a;
let s;
let pos;
const acc = 0.1;
let vmax = 2;
//let angle;



function preload() {
    //tfont = loadFont('assets/AvenirNextLTPro-Demi.otf');
  }


function init() {
    d = createVector(0, 0, 0); // player direction
    v = createVector(0, 0, -1); // player velocity
    a = createVector(0, 0, -0.2);   // player acceleration
    s = createVector(0, 0, 0);  //player steer
    pos = createVector(0, 0, 0);
    //angle = createrVector(0, 0, 0);
}

function setup(){
    createCanvas(800,400,WEBGL);
    background(0);
    //stroke(255);
    //textFont(tfont);
    pg = createGraphics(width,height);
    //noCursor();
    //smooth();
    init();
    camera(0,0,-10,0,0,0,0,1,0);

}

function welcome() {
    //border(255);
    noStroke();
    pg.textSize(36);
    pg.fill(255);
    pg.text('Place_holder\nWelcome_Screen', 100, 100);
     //pass graphics as texture
    texture(pg);
    plane(width,height);
    //fill(255);
    //text('place_holder',100,100);
    //push();

}

function drawPlanet() {
    push();
    rotateX(d.x);
    rotateY(d.y);
    translate(-pos.x, -pos.y, -pos.z);
    translate(0, 0, -400);
    
    normalMaterial();
    sphere(30);
    pop();
}

function getMouse() {
    var m_vec = createVector(mouseX - width / 2, mouseY - height / 2);
    //m_vec.x = mouseX - width / 2;
    //m_vec.y = mouseY - height / 2;
    return m_vec;
}

function getSteer() {
    let mouse_in = getMouse();
    s.y = map(mouse_in.x, -height/2, height/2, -PI/180, PI/180, true);
    s.x = -map(mouse_in.y, -height/2, height/2, -PI/180, PI/180, true);
}

function getDir() {

    d.add(s);
    d.set((d.x+PI)%(PI*2)-PI,(d.y+PI)%(PI*2)-PI);
    //d.normalize();
    //console.log('x:'+d.x+' y:'+d.y+' z:'+d.z);
}

function getVol() {
    ax = sin(d.x) * acc;
    ay = sin(d.y) * acc;
    az = sin(d.z) * acc;
    v.add(createVector(ax, ay, az));
    v.limit(vmax);
    console.log('vol x:'+v.x+' y:'+v.y+' z:'+v.z);
    
}

function getPos() {
    pos.add(v);
}

function drawCross() {
    // stroke(255);
    // strokeWeight(1);
    //fill(255);
    let x_base = (sqrt(3) / 2) * a_mark_r;
    line(0, - a_mark_r, 0, -2 * a_mark_r);
    line(x_base, a_mark_r / 2, x_base * 2, a_mark_r);
    line(-x_base, a_mark_r / 2, -x_base * 2, a_mark_r);
    //push();
}

function drawTrig(x ,y, r) {
    // stroke(255);
    // strokeWeight(1);
    // fill(255);
    // noFill();
    //fill(255);
    beginShape(TRIANGLES);
    vertex(0 + x, a_mark_r + y);
    vertex((sqrt(3)) / 2 * a_mark_r + x, -a_mark_r/2 + y);
    vertex(-(sqrt(3)) / 2 * a_mark_r + x, -a_mark_r/2 + y);
    //vertex(0, a_mark_r);
    endShape();
    //push();
}

function showDir() {
    let y = -map(d.x, -PI, PI, -width/6, width/6);
    let x = map(d.y, -PI, PI, -width/6, width/6);
    circle(x, y, 2 * a_mark_r);
}

function showVol() {
    // let x = map(v.x, -vmax, vmax, -width/6, width/6);
    let y = map(v.y, -vmax, vmax, -width/6, width/6);
    let x = 0;
    //let y = 0;
    circle(x, y, 2 * a_mark_r);
    console.log('vol x:'+v.x+' y:'+v.y+' z:'+v.z);
}


function drawBox() {
    beginShape();
    vertex(width/3 - width/2, (height - width/3)/2 - height/2);
    vertex(width/3 - width/2 - 2*a_mark_r, (height - width/3)/2 - height/2);
    vertex(width/3 - width/2 - 2*a_mark_r, (height + width/3)/2 - height/2);
    vertex(width/3 - width/2, (height + width/3)/2 - height/2);
    endShape();
    beginShape();
    vertex(2*width/3 - width/2, (height - width/3)/2 - height/2);
    vertex(2*width/3 - width/2 + 2*a_mark_r, (height - width/3)/2 - height/2);
    vertex(2*width/3 - width/2 + 2*a_mark_r, (height + width/3)/2 - height/2);
    vertex(2*width/3 - width/2, (height + width/3)/2 - height/2);
    endShape();
}

function showSteer() {
    let y = -map(s.x, -PI/180, PI/180, -height/3, height/3, true);
    let x = map(s.y, -PI/180, PI/180, -height/3, height/3, true);
    //console.log(s.x);
    drawTrig(x, y, a_mark_r); // show steer
}

function drawUI() {

    //fill(255);
    //noFill();
    //stroke(255);
    //strokeWeight(1);

    // circle(getMouse().x, getMouse().y, 2 * a_mark_r);

    //push();
    //translate(0,0,100);
    stroke(255);
    strokeWeight(1);
    fill(0,0,0,0);
    //noFill();

    drawCross();    // show direction
    showSteer();
    showDir(); 
    //showVol();
    drawBox();

    //rect(width/3 - width/2, (height - width/3)/2 - height/2, width/3, width/3);
    

    // beginShape(TRIANGLES);
    // vertex(0, a_mark_r);
    // vertex((sqrt(3)) / 2 * a_mark_r, -a_mark_r/2);
    // vertex(-(sqrt(3)) / 2 * a_mark_r, -a_mark_r/2);
    // //vertex(0, a_mark_r);
    // endShape();

}

function run() {
    getSteer();

    getDir();

    getVol();

    getPos();

    drawPlanet();
    
    drawUI();
    

}

function mouseClicked() {
    //console.log('clicked');
    if (stage == 1) {
        stage = 2;
    }
    else if(stage == 2) {
        init();
        stage = 1;
    }
}

function draw() {
    //push();
    background(0);

    if(stage == 1) {
        welcome();
    }
    else if(stage == 2) {
        run();
    }
}
