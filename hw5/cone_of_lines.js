function setup(){
    createCanvas(400,400);
    background(255);
    stroke(0);

    for(let i = 10; i < width; i += 10) {
        line(i, 390, width / 2, 10);
    }

}

function draw() {
    noLoop(); 
}