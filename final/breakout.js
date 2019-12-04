let capture;
let cap_feed;
let magic = new clm.tracker();
let stream_test = document.getElementById('stream_test');
let head_pos;

let bat_pos = [400, 560];
let bat_width = 100;
let ball_pos = [10, 10];
let ball_vol = [1, 2];


function setup() {
    createCanvas(800,600);
    noStroke();

    let my_canvas = document.getElementById('defaultCanvas0');

    if (navigator.mediaDevices.getUserMedia) { 
        // getUserMedia section from: https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            stream_test.srcObject = stream;
          })
          .catch(function (err0r) {
            console.log("Something went wrong!");
          });
    }

    cap_feed = document.getElementsByTagName('video')[0];

    magic.init();
    magic.start(stream_test);
    magic.draw(my_canvas);

}

function drawBat() {

    fill(255, 127);

    if(magic.getCurrentPosition() && magic.getScore() > 0.4) {
        head_pos = magic.getCurrentPosition()[33];
        bat_pos = [map(head_pos[0], 200, 600, bat_width/2, 800-bat_width/2, true), 560];
        fill(255);
    }

    if(bat_pos) {
        rect(bat_pos[0]-bat_width/2, 560, bat_width, 20);
    }
    
}

function updateBall() {

    //  Wall detection
    if(ball_pos[0] <= 10) {
        ball_vol[0] *= -1;
        ball_pos[0] = 10;
    }
    if(ball_pos[0] >= 790) {
        ball_vol[0] *= -1;
        ball_pos[0] = 790;
    }
    if(ball_pos[1] <= 10) {
        ball_vol[1] *= -1;
        ball_pos[1] = 10;
    }

    //  Bat detection
    if(ball_pos[1] >= 550 
        && ball_pos[1] <= 560
        && ball_pos[0] >= bat_pos[0] - bat_width/2
        && ball_pos[0] <= bat_pos[0] + bat_width/2) {
        ball_vol[1] *= -1;
        ball_pos[1] = 550;
    }

    ball_pos[0] += ball_vol[0];
    ball_pos[1] += ball_vol[1];

    fill(255, 0, 0);
    circle(ball_pos[0], ball_pos[1], 20);

}

function draw() {
    clear();
    magic.draw(canvas);
    background(0,127);
      
    drawBat();

    updateBall();
     
    console.log(bat_pos[0]);
    //console.log(magic.getScore());
    //console.log(cap_feed.tagName);
    //console.log(canvas.tagName);
    //console.log(Object.keys(head_pos[0]));
    
    
}