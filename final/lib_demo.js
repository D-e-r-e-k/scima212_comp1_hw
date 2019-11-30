let capture;
//let cap_feed;
let magic = new clm.tracker();


function setup(){
    createCanvas(800,600);
    let my_canvas = document.getElementById('defaultCanvas0');
    background(0);
    //capture = createCapture(VIDEO);
    //cap_feed = document.getElementsByTagName('video')[0];
    let cap_feed = document.getElementById('test');
    cap_feed.style.borderStyle = 'solid';
    magic.init();
    //capture.scale(-1, 1);
    //capture.hide();
    magic.start(cap_feed);
    magic.draw(my_canvas);

}

function draw() {
    background(0, 127);
    //image(capture, 0, 0, width, width * capture.height / capture.width);
    //magic.start(capture);

    //magic.draw(canvas);
    
    //console.log(typeof magic);
    //console.log(magic.getScore());
    //console.log(cap_feed.tagName);
    //console.log(canvas.tagName);
    //console.log(magic.getCurrentPosition()[0]);
    
}