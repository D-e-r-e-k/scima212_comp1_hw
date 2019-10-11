function setup(){
    createCanvas(400,400);
    background(255);
    stroke(0);
    noFill();

    for(let i = 10; i < width; i += 10) {
        circle(200, 200, i);
        console.log(i);
    }

}

function draw() {
    noLoop(); 
}