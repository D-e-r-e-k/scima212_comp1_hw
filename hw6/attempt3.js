//TODO 
//  camera issue
//  tide up
//  fine tune paras
//  scoring
//  start screen
//  colide/endgame
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
//let facing_vec;
//let facing_vec_angle;
let vol_vec;
//let vol_vec_angle;
let acc = 1;
let vol_max = 30;
let pos_vec;
let steer_max = 2;
//let direction;




function preload() {

}

function init() {
    //facing_vec = createVector(0, 0, 0);
    ob = {
        xi: createVector(1,0,0),
        yi: createVector(0,1,0),
        zi: createVector(0,0,1),
    };
    //facing_vec_angle = createVector(0, 0);
    vol_vec = createVector(0, 0, -1);
    pos_vec = createVector(0,0,0);
}

function setup(){
    createCanvas(800,400,WEBGL);
    background(0);
    pg = createGraphics(width,height);
    noCursor();
    //smooth();

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
        // if((abs(facing_vec_angle.x-PI/2)%(2*PI)) > PI) {
        //     camera(0, 0, 0, facing_vec.x, facing_vec.y, facing_vec.z, 0, -1, 0); 
        // } else {
        //     camera(0, 0, 0, facing_vec.x, facing_vec.y, facing_vec.z, 0, 1, 0); 
        // }

        //console.log('updown '+ abs(facing_vec_angle.x-PI/2)%(2*PI));
        
        //console.log('cam '+(facing_vec.x) +' '+(facing_vec.y)+' '+(facing_vec.z));
        //camera(0, 0, 0, 0, 0, 1, 0, 1, 0);(PI*30.0 / 180.0)*2 //forward
        //let eyeZ = (height/2.0) / tan(PI*60.0/360.0);
        perspective(PI/3, width/height, 0.1, 100000); // could cause horizontal flip under certain camera angles
        // if(facing_vec_angle.x > (PI/2) && facing_vec_angle.x < (3*PI/2)) {
        //     perspective(PI/3, -width/height, 0.1, 100000);
        // } else {
        //     perspective(PI/3, width/height, 0.1, 100000);
        // }
        //console.log('leftright '+(facing_vec_angle.x > (PI/2) && facing_vec_angle.x < (3*PI/2)));
        translate(-pos_vec.x, -pos_vec.y, -pos_vec.z);
        normalMaterial();
        push();
        translate(0,0,-5000);
        //console.log(mouse_vec.x+' '+mouse_vec.y+' | '+facing_vec.x + ' ' + facing_vec.y);
        
        box(1000,1000,1000);
        pop();
        translate(0,0,10000);
        sphere(100);
    pop();
}

function updateMouse() {
    mouse_vec = createVector(mouseX - width / 2, mouseY - height / 2);
}

function anglesToVector(x, y) { // start at (0,0,1)
    let ry = cos(y)*sin(x);
    let rz = cos(x)*cos(y);
    let rx = -cos(x)*sin(y);
    //let rx = -sin(y);
    //console.log(-cos(x)*sin(y)==-sin(y));
    return createVector(rx, ry, rz);
    //return p5.Vector.fromAngles(x-PI/2, y);
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

// function getFace() {

//     facing_vec_angle.add(steer_vec_angle);
//     facing_vec_angle.set(simplyA(facing_vec_angle.x), simplyA(facing_vec_angle.y));
//     //let c_vec = p5.Vector.fromAngles(facing_vec_angle.x, facing_vec_angle.y);
//     let c_vec = anglesToVector(simplyA(facing_vec_angle.x), simplyA(facing_vec_angle.y));
//     c_vec.set(-c_vec.x, c_vec.y, c_vec.z);
//     //let c_vec = p5.Vector.fromAngles(facing_vec_angle.x, PI/3);
//     //console.log('face_vec'+c_vec.x +' '+c_vec.y+' '+c_vec.z);
    

//     return c_vec;
// }

function updateSteer() {
    let x = -map(mouse_vec.x, -width/6, width/6, -PI/180*steer_max, PI/180*steer_max, true); 
    let y = map(mouse_vec.y, -width/6, width/6, -PI/180*steer_max, PI/180*steer_max, true);
    steer_vec_ang = createVector(y, x);
    console.log('steer_vec_ang: '+steer_vec_ang);
    //console.log('ob.yi in steer: '+ob.yi);
}

function showSteer() {
    let x = map(mouse_vec.x, -width/6, width/6, -width/6, width/6, true); 
    let y = map(mouse_vec.y, -width/6, width/6, -width/6, width/6, true);
    //console.log(x+' '+y);
    drawTrig(x, y, a_mark_r);
}


function transToOB(v) {
    //console.log('ob.zi_t: '+ob.zi.x +', '+ob.zi.y+', '+ob.zi.z);
    //console.log(ob.xi.dot(v));
    let x = createVector(ob.xi.x, ob.yi.x, ob.zi.x);
    let y = createVector(ob.xi.y, ob.yi.y, ob.zi.y);
    let z = createVector(ob.xi.z, ob.yi.z, ob.zi.z);
    //console.log('ob.yi in trans: '+ob.yi);
    return createVector(x.dot(v), y.dot(v), z.dot(v));
    
    
}

function updateOB() {
    let x = transToOB(anglesToVector(steer_vec_ang.x, steer_vec_ang.y-PI/2));
    let y = transToOB(anglesToVector(steer_vec_ang.x+PI/2, steer_vec_ang.y));
    let z = transToOB(anglesToVector(steer_vec_ang.x, steer_vec_ang.y));
    //let steer_vec_ob = steer_vec;
    console.log('y: '+ y);
    ob.xi = x;
    ob.yi = y;
    ob.zi = z;
    console.log('x.y: '+ob.xi.dot(ob.yi));
    console.log('x.z: '+ob.xi.dot(ob.zi));
    console.log('y.z: '+ob.yi.dot(ob.zi));
    //console.log(anglesToVector(steer_vec_ang.x, steer_vec_ang.y));
    console.log('ob.xi: '+ob.xi);
    console.log('ob.yi: '+ob.yi);
    console.log('ob.zi: '+ob.zi);
    //console.log('steer_vec_ob_zi: '+steer_vec_ob.x +', '+steer_vec_ob.y+', '+steer_vec_ob.z);
}

function updateVol() {
    vol_vec.add(p5.Vector.mult(ob.zi, -acc));
    vol_vec.limit(vol_max);
}

function showVol() {
    // let temp_vol = vol_vec.copy().normalize();
    // let delta = p5.Vector.sub(temp_vol,facing_vec);
    // //console.log('delta '+delta.x+' '+delta.y+' '+delta.z);
    // let x = map(delta.x, -1, 1, -width/6, width/6);
    // let y = map(delta.y, -1, 1, -width/6, width/6);
    // let angle = temp_vol.angleBetween(facing_vec);
    // if(angle < PI / 2) {
    //     circle(x, y, 2*a_mark_r);
    // } else {
    //     circle(x, y, 2*a_mark_r);
    //     circle(x, y, a_mark_r);
    // }
    //circle(x, y, 2*a_mark_r);
    //console.log('cam '+facing_vec.x +' '+facing_vec.y+' '+facing_vec.z);
    //console.log('face_angle '+(facing_vec_angle.x) +' '+facing_vec_angle.y);
    //console.log('steer '+steer_vec_angle.x +' '+steer_vec_angle.y);
    //console.log('xy '+ x +' '+y);
    //console.log('dangle '+ angle);
    //console.log('vol '+vol_vec.x +' '+vol_vec.y+' '+vol_vec.z);
    //console.log('acc' + acc);
}

function updatePos() {
    pos_vec.add(vol_vec);
    //console.log('pos '+pos_vec.x +' '+pos_vec.y+' '+pos_vec.z);
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

    //circle(0,0,width/6);

    drawBox();

    showSteer();

    showVol();

}

function run() {
    

    updateMouse();
    updateSteer();
    updateOB();
    // facing_vec = getFace();
    updateVol();
    updatePos();

    drawPlanet();
    
    drawUI();
    

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
        acc = 0.1;
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
