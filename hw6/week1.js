let pg;
let stage = 1; // 1 for welcome, 2 for run
let a_mark_r = 10;
let mouse_vec;
let steer_vec_angle;
let facing_vec;
let facing_vec_angle;
let vol_vec;
//let vol_vec_angle;
let acc = 0.1;
let vol_max = 5;
let pos_vec;
let steer_max = 2;
//let direction;




function preload() {

}

function init() {
    facing_vec = createVector(0, 0, 0);
    facing_vec_angle = createVector(-PI/2, 0);
    vol_vec = createVector(0, 0, -1);
    pos_vec = createVector(0,0,0);
    //vol_vec_angle = createVector(PI/2, 0);
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
        camera(0, 0, 0, facing_vec.x, facing_vec.y, facing_vec.z, 0, 1, 0); // (height/2.0) / tan
        console.log('cam '+(facing_vec.x) +' '+(facing_vec.y)+' '+(facing_vec.z));
        //camera(0, 0, 0, 0, 0, 1, 0, 1, 0);(PI*30.0 / 180.0)*2 //forward
        //let eyeZ = (height/2.0) / tan(PI*60.0/360.0);
        perspective(PI/3, width/height, 0.1, 100000);
        translate(-pos_vec.x, -pos_vec.y, -pos_vec.z);
        translate(0,0,-1000);
        //console.log(mouse_vec.x+' '+mouse_vec.y+' | '+facing_vec.x + ' ' + facing_vec.y);
        normalMaterial();
        box(100,100,100);
    pop();
}

function getMouse() {
    let m_vec = createVector(mouseX - width / 2, mouseY - height / 2);

    return m_vec;
}

function getFace() {

    facing_vec_angle.add(steer_vec_angle);

    let c_vec = p5.Vector.fromAngles(facing_vec_angle.x, facing_vec_angle.y);
    c_vec.set(-c_vec.x, c_vec.y, c_vec.z);
    //let c_vec = p5.Vector.fromAngles(facing_vec_angle.x, PI/3);
    console.log('face '+c_vec.x +' '+c_vec.y+' '+c_vec.z);
    

    return c_vec;
}

function getSteer() {
    let x = map(mouse_vec.x, -width/6, width/6, -PI/180*steer_max, PI/180*steer_max, true); 
    let y = -map(mouse_vec.y, -width/6, width/6, -PI/180*steer_max, PI/180*steer_max, true);
    //console.log(y);

    //let c_vec = p5.Vector.fromAngles(y + PI/2,x);
    let s_vec_angle = createVector(y, x);

    return s_vec_angle;
}

function showSteer() {
    let x = map(mouse_vec.x, -width/6, width/6, -width/6, width/6, true); 
    let y = map(mouse_vec.y, -width/6, width/6, -width/6, width/6, true);
    //console.log(x+' '+y);
    drawTrig(x, y, a_mark_r);
}

function getVol() {
    let v_vec = p5.Vector.add(vol_vec, p5.Vector.mult(facing_vec, acc));
    v_vec.limit(vol_max);
    return v_vec;
}

function showVol() {
    let temp_vol = vol_vec.copy().normalize();
    let delta = p5.Vector.sub(temp_vol,facing_vec);
    console.log('delta '+delta.x+' '+delta.y+' '+delta.z);
    let x = map(delta.x, -1, 1, -width/6, width/6);
    let y = map(delta.y, -1, 1, -width/6, width/6);
    let angle = temp_vol.angleBetween(facing_vec);
    if(angle < PI / 2) {
        circle(x, y, 2*a_mark_r);
    } else {
        circle(x, y, 2*a_mark_r);
        circle(x, y, a_mark_r);
    }
    //circle(x, y, 2*a_mark_r);
    //console.log('cam '+facing_vec.x +' '+facing_vec.y+' '+facing_vec.z);
    console.log('face_angle '+(facing_vec_angle.x+PI/2) +' '+facing_vec_angle.y);
    console.log('steer '+steer_vec_angle.x +' '+steer_vec_angle.y);
    //console.log('xy '+ x +' '+y);
    console.log('dangle '+ angle);
    console.log('vol '+vol_vec.x +' '+vol_vec.y+' '+vol_vec.z);
}

function getPos() {
    let p_vec = p5.Vector.add(pos_vec, vol_vec);
    console.log('pos '+pos_vec.x +' '+pos_vec.y+' '+pos_vec.z);
    return p_vec;
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
    

    mouse_vec = getMouse();
    steer_vec_angle = getSteer();
    facing_vec = getFace();
    vol_vec = getVol();
    pos_vec = getPos();

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

function draw() {

    background(0);

    if(stage == 1) {
        welcome();
    }
    else if(stage == 2) {
        run();
    }
}
