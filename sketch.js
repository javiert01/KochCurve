let lines = [];
let lines2 = [];
let lines3 = [];
let maxDepth = 4;
let sideNumber = 5;
let figureLength = 380;
let angle = 0;
let color1;
let color2;
let color3;


function setup() {
  createCanvas(1400, 1000);
  angleMode(DEGREES);
  color2 = color(238,39,55);
  color3 = color(186,0,32);
  color1 = color(100,62,70);
  background(color1);
  translate(width / 2, height / 2);
  for (let i = 0; i < sideNumber; i++) {
    let v1 = p5.Vector.fromAngle(radians((360 / sideNumber) * i), figureLength);
    let v2 = p5.Vector.fromAngle(
      radians((360 / sideNumber) * (i + 1)),
      figureLength
    );
    lines.push({
      x1: v1.x,
      y1: v1.y,
      x2: v2.x,
      y2: v2.y
    });
  }
  for (let i = 0; i < 4; i++) {
    let v1 = p5.Vector.fromAngle(radians((360 / 4) * i), 200);
    let v2 = p5.Vector.fromAngle(radians((360 / 4) * (i + 1)), 200);
    lines2.push({
      x1: v1.x,
      y1: v1.y,
      x2: v2.x,
      y2: v2.y
    });
  }
  for (let i = 0; i < 3; i++) {
    let v1 = p5.Vector.fromAngle(radians((360 / 3) * i), 70);
    let v2 = p5.Vector.fromAngle(radians((360 / 3) * (i + 1)), 70);
    lines3.push({
      x1: v1.x,
      y1: v1.y,
      x2: v2.x,
      y2: v2.y
    });
  }
}

function draw() {
  background(color1);
  translate(width / 2, height / 2);
  rotate(angle);
  angle += 0.5;
  for (let i = 0; i < lines.length; i++) {
    applyKotch(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2, 1, 1);
  }
  for (let i = 0; i < lines2.length; i++) {
    applyKotch(lines2[i].x1, lines2[i].y1, lines2[i].x2, lines2[i].y2, 1, 2);
  }
  for (let i = 0; i < lines3.length; i++) {
    applyKotch(lines3[i].x1, lines3[i].y1, lines3[i].x2, lines3[i].y2, 1, 3);
  }
}

function applyKotch(x1, y1, x2, y2, direction, depth) {
  if (depth > maxDepth) {
    return;
  }
  let auxVector0 = createVector(width / 2, 0);
  let auxVector1 = createVector(x1, y1);
  let auxVector2 = createVector(x2, y2);
  strokeWeight(5);
  stroke(color1);
  line(x1, y1, x2, y2);
  let auxVector3 = p5.Vector.sub(auxVector1, auxVector2);
  let distance = auxVector3.mag();
  let rotationAngle = auxVector0.angleBetween(auxVector3);
  if (auxVector1.y < auxVector2.y) {
    rotationAngle *= -1;
  }
  push();
  translate(auxVector1.x, auxVector1.y);
  strokeWeight(5);
  rotate(180 + rotationAngle);
  stroke(color3);
  line(0, 0, distance / 3, 0);
  applyKotch(0, 0, distance / 3, 0, direction, depth + 1);
  push();
  translate(distance / 3, 0);
  rotate(300 * direction);
  line(0, 0, distance / 3, 0);
  applyKotch(0, 0, distance / 3, 0, direction, depth + 1);
  pop();
  push();
  translate(2 * (distance / 3), 0);
  rotate(240 * direction);
  line(0, 0, distance / 3, 0);
  applyKotch(0, 0, distance / 3, 0, -direction, depth + 1);
  pop();
  line(2 * (distance / 3), 0, distance, 0);
  applyKotch(2 * (distance / 3), 0, distance, 0, direction, depth + 1);
  pop();
}
