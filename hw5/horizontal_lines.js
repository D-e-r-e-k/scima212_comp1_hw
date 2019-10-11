function setup(){
    createCanvas(400,400);
    background(255);
    stroke(0);

    for(let i = 10; i < width; i += 10) {
        line(10, i, 390, i);
    }

}

function draw() {
    noLoop(); 
}