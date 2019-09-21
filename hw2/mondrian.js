//src image: http://www.moma.org/media/W1siZiIsIjI5MjUwNiJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=dea809fdcbf8c443

function setup(){
    createCanvas(482,600);
    background(230, 230, 225);
    noStroke();
}

function draw(){
    fill(182, 58, 44);//red
    rect(0, 0, 306, 172);
    fill(48, 93, 195);//blue
    rect(320, 193, 162, 159);
    fill(31, 32, 34);//black
    rect(0, 172, 482, 21);
    rect(306, 0, 14, 600);
    rect(320, 352, 162, 23);
    rect(0, 584, 306, 16);

    noLoop();
}