function setup(){
    createCanvas(400,400);
    background(255);
    stroke(0);
}

function draw() {
    for(let i = 10; i < width; i += 10) {
        line(i, 10, i, 390);
    }
}