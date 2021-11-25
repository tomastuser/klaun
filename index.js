let pos = 0;
let vel = 0;
let acc = 0.005;
const canvasWidth = 1600;
const canvasHeight = 900;
let nabytek;
let step = 1;
let centerX = 13;
let centerY = 935;

let img;
function preload() {
  img = loadImage('k.jpg');
}

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-holder');
  //   nabytek = new Ratio(1, 128, 320, 180, '    ');
}

function draw() {
  if (pos < 100) {
    pos += vel;
  } else {
    pos = 100;
  }
  if (pos <= 50 && vel < 1) {
    vel += acc;
  } else if (pos > 50 && vel > 0) {
    vel -= acc;
  }

  setPosition();

  let x = bezierPoint(800, 1000, 900, 700, pos / 100);
  let y = bezierPoint(100, 10, 450, 682, pos / 100);
  image(img, 0, 0, canvasWidth, canvasHeight, 0, 0, 14032, 7016);
  //   image(img, 0, 0, canvasWidth, canvasHeight, centerX, centerY, 2807, 1403);
  fill(255, 0, 0);
  ellipse(x, y, 35, 35);

  fill(0);
  noStroke();
  textSize(32);
  //   text((mouseX * 8.77).toFixed(0), 100, 350);
  //   text((mouseY * 7.795).toFixed(0), 100, 400);
  //   text((mouseX * 8.77 + 320 * 8.77).toFixed(0), 100, 450);
  //   text((mouseY * 7.795 + 180 * 7.795).toFixed(0), 100, 500);
  text(centerX, 100, 350);
  text(centerY, 100, 400);
  text(mouseX, 100, 450);
  text(mouseY, 100, 500);
  text(step, 800, 50);
  text('<-', 770, 880);
  text('->', 830, 880);
  textSize(16);
  //   nabytek.display();
  //   text(pos, 100, 450);
  //   text(vel, 100, 500);

  noFill();
  stroke(0);
  strokeWeight(5);
  bezier(800, 100, 1000, 10, 868, 310, 700, 382);
}

function mousePressed() {
  //   if (nabytek.check()) {
  //     nabytek.dragged = true;
  //   }
  if (
    mouseX > 760 &&
    mouseX < 805 &&
    mouseY > 850 &&
    mouseY < 900 &&
    step > 0
  ) {
    print('left');
    step--;
  } else if (
    mouseX > 820 &&
    mouseX < 870 &&
    mouseY > 850 &&
    mouseY < 900 &&
    step < 20
  ) {
    print('right');
    step++;
  }
}

// function mouseReleased() {
//   nabytek.dragged = false;
// }

// class Ratio {
//   constructor(x_, y_, a_, b_, name_) {
//     this.x = x_;
//     this.y = y_;
//     this.a = a_;
//     this.b = b_;
//     this.c = 0;
//     this.dragged = false;
//     this.name = name_;
//   }
//   display() {
//     strokeWeight(2);
//     stroke(0);
//     noFill();
//     if (this.dragged == true) {
//       this.x = mouseX;
//       this.y = mouseY;
//       rect(this.x, this.y, this.a, this.b, this.c);
//     } else {
//       rect(this.x, this.y, this.a, this.b, this.c);
//     }
//     strokeWeight(0);
//     fill(0);
//     text(this.name, this.x, this.y + 6);
//   }
//   check() {
//     let above = false;
//     let dx = abs(mouseX - this.x);
//     let dy = abs(mouseY - this.y);
//     if (dx < this.a / 2 && dy < 5) {
//       above = true;
//     } else {
//       above = false;
//     }
//     return above;
//   }
// }

function setPosition() {
  switch (step) {
    case 1:
      centerX = 13;
      centerY = 935;
      break;

    case 2:
      centerX = 1258;
      centerY = 1442;
      break;

    case 3:
      centerX = 22;
      centerY = 3406;
      break;

    case 4:
      centerX = 1548;
      centerY = 2580;
      break;

    case 5:
      centerX = 4293;
      centerY = 2627;
      break;

    case 6:
      centerX = 3556;
      centerY = 935;
      break;

    case 7:
      centerX = 1258; // WRONG
      centerY = 1442; // WRONG
      break;

    case 8:
      centerX = 2337;
      centerY = 5121;
      break;

    case 9:
      centerX = 4328;
      centerY = 4451;
      break;

    case 10:
      centerX = 7020;
      centerY = 5355;
      break;

    case 11:
      centerX = 6959;
      centerY = 3578;
      break;

    case 12:
      centerX = 2337; // WRONG
      centerY = 5121; // WRONG
      break;

    case 13:
      centerX = 8906;
      centerY = 125;
      break;

    case 14:
      centerX = 8520;
      centerY = 1653;
      break;

    case 15:
      centerX = 10905;
      centerY = 413;
      break;

    case 16:
      centerX = 11204;
      centerY = 2494;
      break;

    case 17:
      centerX = 8994;
      centerY = 2697;
      break;

    case 18:
      centerX = 2337;
      centerY = 5121;
      break;

    case 19:
      centerX = 10458;
      centerY = 4007;
      break;

    case 20:
      centerX = 11221;
      centerY = 4700;
      break;
  }
}
