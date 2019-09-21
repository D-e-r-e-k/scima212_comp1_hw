//physics model from: https://en.wikipedia.org/wiki/Elastic_collision

var balls = [];
var bounds = [];

function setup() {
    createCanvas(800, 600);
    for(var i = 0; i < 40; i++) {
        var bx = random(100, 700);
        var by = random(100, 500);
        var br = 20;
        var ball = {
            protected: -1, //index protected from
            pt: 0, //time been protected
            m: 1,
            x: bx,
            y: by,
            r: br,
            v: {
                x: random(-3, 3),
                y: random(-3, 3)
            },
            boundl: {
                type: 'l',
                v: bx - br, //value
                is: 0, //index in the sorting array
                self: i //index in balls
            },
            boundr: {
                type: 'r',
                v: bx + br, //value
                is: 0, //index in the sorting array
                self: i //index in balls
            }
        };
        balls.push(ball);
        bounds.push(ball.boundl);
        bounds.push(ball.boundr);
        noStroke();
    }
    bounds.sort(compareBound);
    for(var i = 0; i < bounds.length; i++) {
        bounds[i].is = i;
    }
    
}

function compareBound(bound1, bound2) {
    return bound1.v - bound2.v;
}

var walll = 0;  //boundaries
var wallr = 800;
var wallt = 0;
var wallb = 600;

function draw() {
    background(238);   
    //detCol(balls[0], balls[1]);
    scan();
    balls.forEach(detWall);
    balls.forEach(updatePos);
    balls.forEach(render);
    
}

function scan() {
    for(var i = 0; i < bounds.length; i++) {
        if(bounds[i].type == 'l') {
            for(var j = 1; i + j < bounds.length; j++) {
                if(bounds[i].self == bounds[i + j].self) {
                    break;
                }
                else if(bounds[i + j].type == 'l') {
                    detCol(balls[bounds[i].self], balls[bounds[i + j].self]);
                }
            }
        }
    }
}

function detWall(item, index) {
    if(false) {
        
    }
    else {
        if((item.x - item.r) <= walll || (item.x + item.r) >= wallr) {
            item.v.x = 0 - item.v.x;
        }
        if((item.y - item.r) <= wallt || (item.y + item.r) >= wallb) {
            item.v.y = 0 - item.v.y;
        }
    }
}

function detCol(ball1, ball2) { //detect collision
    if(ball1.protected == ball2.boundl.self || ball2.protected == ball1.boundl.self){

    }
    else if(dist(ball1.x, ball1.y, ball2.x, ball2.y) <= (ball1.r + ball2.r)) {
        collide(ball1, ball2);
        ball1.protected = ball2.boundl.self;
        ball2.protected = ball1.boundl.self;
    }
}

function collide(ball1, ball2) {
    var base = {
        x: ball2.x - ball1.x,
        y: ball2.y - ball1.y
    };
    //console.log('base: '+base.x+' '+ base.y);
    var basel = sqrt(base.x * base.x + base.y * base.y); //length of collision baseline
    base.x /= basel; //standerize
    base.y /= basel;
    var tan = {
        x: 0 - base.y,
        y: base.x
    };
    
    var orix = {x: 1, y: 0};
    var oriy = {x: 0, y: 1};
    trans(orix, base, tan);
    trans(oriy, base, tan);
    //console.log('base: '+base.x+' '+ base.y);

    trans(ball1.v, base, tan);
    trans(ball2.v, base, tan);
    var temp1 = ball1.v.x;
    var temp2 = ball2.v.x;
    ball1.v.x = (ball1.m - ball2.m)/(ball1.m + ball2.m) * temp1 + 2 * ball2.m/(ball1.m + ball2.m) * temp2;
    ball2.v.x = (ball2.m - ball1.m)/(ball1.m + ball2.m) * temp2 + 2 * ball1.m/(ball1.m + ball2.m) * temp1;

    trans(ball1.v, orix, oriy);
    trans(ball2.v, orix, oriy);
    //console.log(ball1.v.x + ' ' + ball1.v.y);

}

function trans(v, vx, vy) { //linear transformation
    var ori = {
        x: v.x,
        y: v.y
    };
    v.x = ori.x * (vx.x) + ori.y * (vx.y);
    v.y = ori.x * (vy.x) + ori.y * (vy.y);
}

function reSort(i){
    if(i == 0 || i == (bounds.length - 1) || (bounds[i].v >= bounds[i - 1].v && bounds[i].v <= bounds[i + 1].v)){
        return;
    }
    else {
        if(bounds[i].v < bounds[i - 1].v) {
            [bounds[i - 1], bounds[i]] = [bounds[i], bounds[i - 1]];
            reSort(i - 1);
        }
        else {
            [bounds[i + 1], bounds[i]] = [bounds[i], bounds[i + 1]];
            reSort(i + 1);
        }
    }    
    
}

function updatePos(item, index) {
    item.x += item.v.x;
    item.y += item.v.y;
    item.boundl.v = item.x - item.r;
    item.boundr.v = item.x + item.r;
    reSort(item.boundl.is);
    //console.log(bounds[0].v+' '+bounds[1].v+' '+bounds[2].v+' '+bounds[3].v+' '+bounds[4].v+' '+bounds[5].v+' '+bounds[6].v+' '+bounds[7].v);
    reSort(item.boundr.is);
    if(item.pt >= 15){
        item.protected = -1;
        item.pt = 0;
    }
    if(item.protected != -1){
        item.pt++;
    }

}

function render(item, index) {
    fill(127);
    ellipse(item.x, item.y, 2 * item.r);
    //console.log(item.v.y);
}