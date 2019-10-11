function setup(){
    createCanvas(400,400);
    background(0);
    stroke(0);

    for(let i = 10; i < width; i += 20) {
        for(let j = 10; j < height; j += 20) {
            circle(i, j, 15);
        }
    }

}

function draw() {
    noLoop(); 
}