function setup(){
    createCanvas(400,400);
    background(255);
    stroke(0);

    for(let i = 1; i < width; i += 10) {
        line(abs(width / 2 - i), i, width - abs(width / 2 - i), i);
    }

}

function draw() {
    noLoop(); 
}