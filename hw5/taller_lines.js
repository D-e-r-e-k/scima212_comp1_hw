function setup(){
    createCanvas(400,400);
    background(255);
    stroke(0);

    for(let i = 10; i < width; i += 5) {
        line(i, 0, i, i * 2);
    }

}

function draw() {
    noLoop(); 
}