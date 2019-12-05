/*TO-DO: tide-up stages vector implementation bat implemtentation blocks collision github page
name
scoring
ui
*/

let ctx;
let rec_model = new clm.tracker();
let webcame_feed = document.getElementById('webcam_feed');
let head_pos = [400, 300];
let stage = 0; //0: welcome; 1: main; 2: score
let head_dir = [0, 1];
let bat_pos;
let bat_width;
let bat_dir;
let bat_left;
let bat_k;
let bat_b;
let bat_right;

let ball_pos;
let ball_vol;

let blocks;
let blocks_left;

function init() {
    
    bat_k = 1;
    bat_b = 0;
    bat_pos = [400, 550];
    bat_width = 100;
    bat_dir = [1, 0];
    ball_pos = [400, 300];
    ball_vol = [0, 2];
    
    blocks = [];
    for(let i = 0; i < 4; i++){
        blocks.push([1, 1, 1, 1, 1, 1, 1, 1]);
    }
    blocks_left = 32;

    //console.log('init');
}


function setup() {

    createCanvas(800,600);
    noStroke();
    frameRate(60);

    if (navigator.mediaDevices.getUserMedia) { 
        // getUserMedia section from: https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            webcame_feed.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log("navigator.mediaDevices.getUserMedia() failded");
          });
    }
    
    ctx = canvas.getContext("2d");

    rec_model.init();
    rec_model.start(webcam_feed);

}

function updateHead() {
    if(rec_model.getScore() > 0.4) {
        if(rec_model.getCurrentPosition()[62]){
            head_pos = rec_model.getCurrentPosition()[62];
        }
        if(rec_model.getCurrentPosition()[62]) {
            head_dir = normalize(sub(rec_model.getCurrentPosition()[33], head_pos));
        }
            
        return true;
    } else {
        return false;
    }
}

function drawBat() {

    fill(255);

    updateHead();

    bat_dir = getNormal(head_dir); 

    bat_pos = [map(head_pos[0], 200, 600, bat_width/2, 800-bat_width/2, true), 560];


    strokeWeight(20);
    ctx.strokeStyle = "#FFFFFF";
    stroke(255);

    bat_left = add(bat_pos,mul(bat_dir, bat_width / 2));
    bat_right = sub(bat_pos,mul(bat_dir, bat_width / 2));


    line(bat_left[0], bat_left[1], bat_right[0], bat_right[1]);
    strokeWeight(1);
    noStroke;

    //rect(bat_pos[0]-bat_width/2, 560, bat_width, 20);
    
}

function batDet() {
    
    //  Geometry formula
    bat_k = (bat_left[1] - bat_right[1]) / (bat_left[0] - bat_right[0]);
    bat_b = bat_left[1] - bat_k * bat_left[0];

    if(ball_pos[0] > (bat_right[0] + 5) || ball_pos[0] < (bat_left[0] - 5) || ball_vol[1] < 0) {
        //console.log(bat_left[0] + 10);
        //console.log(bat_right[0] - 10);
        //console.log('x out');
        return false;
    }

    let A = bat_k;
    let B = -1;
    let C = bat_b;

    //console.log(A*bat_left[0] + B*bat_left[1] + C);
    //console.log(A*bat_right[0] + B*bat_right[1] + C);

    let temp = (A*ball_pos[0] + B*ball_pos[1] + C) / sqrt(sq(A) + sq(B));
    //console.log(temp);

    return temp > 0 && temp <= 20;
}

function batBounce() {
    ball_pos = add(ball_pos, mul(head_dir, 2));
    //console.log('before: '+ball_vol);
    let temp = mul(head_dir, -dot(head_dir, ball_vol));
    let delta = sub(ball_vol, mul(temp, -1));
    //console.log('temp: '+temp);
    //console.log('delta: '+delta);
    ball_vol = mul(normalize(add(temp, delta)), 2);
    //console.log('after: '+ball_vol);

    
}

function blockBounce() {
    if(ball_pos[0] < 100
        || ball_pos[0] > 700
        || ball_pos[1] > 300
        ) {
        return false;
    } 
    
    let col = min(floor((ball_pos[0] - 100) / 75), 7);
    let row = min(floor(ball_pos[1] / 75), 3);

    let relx = (ball_pos[0] - 100) % 75;
    let rely = (ball_pos[1]) % 75; 

    console.log(row + ' ' +col);
    console.log(blocks);

    if(blocks[row][col]) {
        if(
            rely >= 15
            && rely <= 45) {
                //  horizonal
                ball_vol = reverseX(ball_vol);
                blocks[row][col] = 0;
                blocks_left--;
            }
        if(rely >=5
            && rely <= 55
            && relx >= 10
            && relx <= 65) {
                //  vertical
                ball_vol = reverseY(ball_vol);
                blocks[row][col] = 0;
                blocks_left--;
            }
    }

}

function updateBall() {
    //console.log(head_dir);
    //  Wall detection
    if(ball_pos[0] <= 10) {
        ball_vol = reverseX(ball_vol);
        ball_pos[0] = 10;
    }
    if(ball_pos[0] >= 790) {
        ball_vol = reverseX(ball_vol);
        ball_pos[0] = 790;
    }

    if(ball_pos[1] <= 10) {
        ball_vol = reverseY(ball_vol);
        ball_pos[1] = 10;
    }

    //  Bat detection
    if(batDet()) {
        //ball_vol = reverseY(ball_vol);
        batBounce();
    }

    blockBounce();

    ball_pos = add(ball_pos, ball_vol);

    fill(255, 0, 0);
    strokeWeight(0);
    circle(ball_pos[0], ball_pos[1], 20);
    strokeWeight(1);

}

function drawBlocks() {
    //pop();

    strokeWeight(0);
    fill(255);
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 8; j++) {
            if(blocks[i][j]) {
                rect(75*j+110 ,15+75*i , 55, 30);
            }
        }
    }

    strokeWeight(1);
    //push();

}

function welcome() {
    
    clear();
    rec_model.draw(canvas);
    background(0, 127);

    scale(-1, 1);
    strokeWeight(0);
    text('stage 1: welcome', -100, 100);
    strokeWeight(1);
    push();
}

function main() {

    clear();
    rec_model.draw(canvas);
    background(0, 127);
      
    drawBat();

    updateBall();  

    drawBlocks();
}

function score() {
    
    clear();
    rec_model.draw(canvas);
    background(0, 127);

    scale(-1, 1);
    strokeWeight(0);
    text('stage 3: score', -100, 100);
    strokeWeight(1);
    push();
}

function draw() {

    //console.log(frameRate());

    if(stage === 0){
        welcome();
    } else if(stage === 1) {
        main();
    } else if(stage === 2) {
        score();
    }
    
}

function keyPressed() {
    if(stage === 0) {
        init();
    }

    stage = (stage + 1) % 3;
    
}