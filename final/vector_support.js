
function show(v, r, g, b) {
    let center = [width / 2, height / 2];
    let pos = add(v, center);
    strokeWeight(1);
    let tr = r || 255;
    let tg = g || r || 255;
    let tb = b || r || 255;
    stroke(tr, tg, tb);
    line(center[0], center[1], pos[0], pos[1]);
    noStroke();
    //console.log('redrew');
}

function add(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
}

function sub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1]];
}

function reverseX(v) {
    return [v[0] * -1, v[1]];
}

function reverseY(v) {
    return [v[0], v[1] * -1];
}

function length(v) {
    return sqrt(sq(v[0]) + sq(v[1]));
}

function normalize(v) {
    let len = length(v);
    return [v[0] / len, v[1] / len];
}

function mul(v,s) {
    return [v[0] * s, v[1] * s];
}

function getNormal(v) {
    return [v[1], -v[0]];
}

function dot(v1, v2) {
    return (v1[0]*v2[0] + v1[1]*v2[1]);
}