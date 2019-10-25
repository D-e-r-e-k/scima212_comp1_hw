//TODO 
//  scoring
//  colide/endgame
//  start/edn screen 
//  animation
//  sound
//  better voldisplay
//  tide up
// sphere with light

let pg;
let stage = 1; // 1 for welcome, 2 for run
let a_mark_r = 10;
let ob; // orbiter basis
let mouse_vec;
let steer_vec_ang;
let vol_vec;
let acc = 1;
let vol_max = 30;
let pos_vec;
let steer_max = 2;




function preload() {

}

function init() {
    ob = {
        xi: createVector(1,0,0),
        yi: createVector(0,1,0),
        zi: createVector(0,0,1),
    };
    vol_vec = createVector(0, 0, -1);
    pos_vec = createVector(0,0,0);
    steer_max = 2;
    acc = 1;
    vol_max = 30;
}

function setup(){
    createCanvas(800,400,WEBGL);
    background(0);
    pg = createGraphics(width,height);
    noCursor();
}

function welcome() {
    noStroke();
    pg.textSize(36);
    pg.fill(255);
    pg.text('Place_holder\nWelcome_Screen', 100, 100);
    texture(pg);
    plane(width,height);
}

function drawPlanet() {
    push();
        camera(0, 0, 0, -ob.zi.x, -ob.zi.y, -ob.zi.z, -ob.yi.x, -ob.yi.y, -ob.yi.z);
        perspective(PI/3, width/height, 0.1, 50000);
        translate(-pos_vec.x, -pos_vec.y, -pos_vec.z);
        normalMaterial();
        push();
        translate(0,0,-5000); //5000 - 50000
        box(1000,1000,1000);
        pop();
        translate(0,0,10000);
        //sphere(200);
    pop();
}

function updateMouse() {
    mouse_vec = createVector(mouseX - width / 2, mouseY - height / 2);
}

function anglesToVector(x, y) { // start at (0,0,1)
    let ry = cos(y)*sin(x);
    let rz = cos(x)*cos(y);
    let rx = -cos(x)*sin(y);
    return createVector(rx, ry, rz);
}

function simplyA(a) {
    if(a > (2*PI)) {
        a -= (2 * PI);
        return simplyA(a);
    } else if(a < 0) {
        a += (2 * PI);
        return simplyA(a);
    }
    return a;
}

function updateSteer() {
    let x = -map(mouse_vec.x, -width/6, width/6, -PI/180*steer_max, PI/180*steer_max, true); 
    let y = map(mouse_vec.y, -width/6, width/6, -PI/180*steer_max, PI/180*steer_max, true);
    steer_vec_ang = createVector(y, x);
    console.log('steer_vec_ang: '+steer_vec_ang);
}

function showSteer() {
    let x = map(mouse_vec.x, -width/6, width/6, -width/6, width/6, true); 
    let y = map(mouse_vec.y, -width/6, width/6, -width/6, width/6, true);
    drawTrig(x, y, a_mark_r);
}


function transToOB(v) {
    let x = createVector(ob.xi.x, ob.yi.x, ob.zi.x);
    let y = createVector(ob.xi.y, ob.yi.y, ob.zi.y);
    let z = createVector(ob.xi.z, ob.yi.z, ob.zi.z);
    return createVector(x.dot(v), y.dot(v), z.dot(v));   
}

function updateOB() {
    let x = transToOB(anglesToVector(steer_vec_ang.x, steer_vec_ang.y-PI/2));
    let y = transToOB(anglesToVector(steer_vec_ang.x+PI/2, steer_vec_ang.y));
    let z = transToOB(anglesToVector(steer_vec_ang.x, steer_vec_ang.y));
    ob.xi = x;
    ob.yi = y;
    ob.zi = z;
    //console.log('x.y: '+ob.xi.dot(ob.yi));    // for testing ortho
    //console.log('x.z: '+ob.xi.dot(ob.zi));
    //console.log('y.z: '+ob.yi.dot(ob.zi));
    console.log('ob.xi: '+ob.xi);
    console.log('ob.yi: '+ob.yi);
    console.log('ob.zi: '+ob.zi);
}

function updateVol() {
    vol_vec.add(p5.Vector.mult(ob.zi, -acc));
    vol_vec.limit(vol_max);
}

function showVol() {
    let v_dis = transToOB(vol_vec);

    if(v_dis.z < 0) {
        circle(v_dis.x, v_dis.y, 2*a_mark_r);
    } else {
        circle(v_dis.x, v_dis.y, 2*a_mark_r);
        circle(v_dis.x, v_dis.y, a_mark_r);
    }
}

function updatePos() {
    pos_vec.add(vol_vec);
}


function drawCross() {
    let x_base = (sqrt(3) / 2) * a_mark_r;
    line(0, - a_mark_r, 0, -2 * a_mark_r);
    line(x_base, a_mark_r / 2, x_base * 2, a_mark_r);
    line(-x_base, a_mark_r / 2, -x_base * 2, a_mark_r);
}

function drawTrig(x ,y, r) {
    beginShape(TRIANGLES);
    vertex(0 + x, a_mark_r + y);
    vertex((sqrt(3)) / 2 * a_mark_r + x, -a_mark_r/2 + y);
    vertex(-(sqrt(3)) / 2 * a_mark_r + x, -a_mark_r/2 + y);
    endShape();
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

function drawUI() {
    stroke(255);
    strokeWeight(1);
    fill(0,0,0,0);

    drawCross();

    drawBox();

    showSteer();

    showVol();

}

function run() {
    
    updateMouse();
    updateSteer();
    updateOB();
    updateVol();
    updatePos();

    drawPlanet();
    
    drawUI();

    steer_max *= 1.002;
    //acc *= 1.02;
    vol_max *= 1.002;
    

}

function mouseClicked() {
    if (stage == 1) {
        init();
        stage = 2;
    }
    else if(stage == 2) {
        stage = 1;
    }
}

function keyPressed() {
    // for testing
    if(acc!=0) {
        acc = 0;
        vol_vec.set(0,0,-0.01);
    } else {
        acc = 1;
    }
}

function draw() {

    background(0);

    if(stage == 1) {
        welcome();
    }
    else if(stage == 2) {
        run();
    }
}
