// Coding Challenge 130.1: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130-fourier-transform-drawing.html
// https://youtu.be/MY4luNgGfms
// https://editor.p5js.org/codingtrain/sketches/jawHqwfda

let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];
let n_circles = 5;

let radius_scale = 1;


function setup() {
    clear();
    time = 0;
    path = [];
    x = [];
    y = [];

    var cnv = createCanvas(1920, 1080);
    background(0);
    cnv.position(300, 100);

    const skip = 1;
    for (let i = 0; i < drawing.length; i += skip) {
        x.push(drawing[i].x-200);
        y.push(drawing[i].y-10);
    }
    fourierX = dft(x);
    fourierY = dft(y);

    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y, rotation, fourier) {
    for (let i = 0; i < n_circles; i++) {
        // for (let i = 0; i < 2; i++) {
        let prevx = x;
        let prevy = y;
        let freq = fourier[i].freq;
        let radius = fourier[i].amp * radius_scale;
        let phase = fourier[i].phase;
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);

        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, radius * 2);
        // scale(2);
        stroke(255);
        line(prevx, prevy, x, y);
    }
    return createVector(x, y);
}
let once = true;
function draw() {
    clear();
    background(220, 10);

    let y0 = 0.0;
    let x0 = -500;
    if (radius_scale > 2) {
        // radius_scale -= 0.1;
        for (let i = 0; i < n_circles; i++) {
            // for (let i = 0; i < 2; i++) {
            let freq = fourierY[i].freq;
            let radius = fourierY[i].amp * radius_scale;
            let phase = fourierY[i].phase;
            y0 += radius * sin(freq * time + phase + HALF_PI);
        }
        path = [];
    }
    
    else {
        y0 = -100;
        x0 = 150;
        if (once) {
            path = [];
            once = false;
        }
        // path = [];
        if (time > TWO_PI) {
            time = 0;
            // path = [];
        }
    }
    
    // console.log(y0);
    let vx = epiCycles(width / 2, 500, 0, fourierX);
    let vy = epiCycles(400, height / 2 - y0, HALF_PI, fourierY);
    let v = createVector(vx.x, vy.y);
    path.unshift(v);
    if (radius_scale > 2) {
        
    }
    else {
        line(vx.x, vx.y, v.x, v.y);
        line(vy.x, vy.y, v.x, v.y);
    }
    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = TWO_PI / (fourierY.length);
    time += dt;

    

    // if (wave.length > 250) {
    //   wave.pop();
    // }
}