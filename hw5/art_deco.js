function setup(){
    createCanvas(600,400);
    background(255);
    stroke(0);
    noFill();
    rectMode(CENTER);

    for(let i = 100; i <= 500; i += 100) {
        for(let j = 1; j <= 4; j ++) {
            rect(i, height / 2, j * 20, j * 20);
        }
    }

}

function draw() {
    noLoop(); 
}