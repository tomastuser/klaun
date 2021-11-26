let x, y;
const mx = 8.77;
const my = 7.795;
let pos = 0;
let vel = 0;
let acc = 0.005;
const canvasWidth = 1600;
const canvasHeight = 900;
let nabytek;
let step = 0;
let centerX = 13;
let centerY = 935;
let test = false;
const w = 2306;
const h = 1403;
let introCounter = 255;
let isInPositiveMotion = false;
let isInNegativeMotion = false;
let initialStepSetup = true;
let img;
let music;
let intro = true;
let leftArrowHover = false;
let rightArrowHover = false;
let introArrowHover = false;
let fadeOut = false;

const positions = [
  { centerX: 13, centerY: 935, controlX: 54, controlY: 171 },
  { centerX: 1258, centerY: 1442, controlX: 14, controlY: 264 },
  { centerX: 22, centerY: 3406, controlX: 108, controlY: 331 },
  { centerX: 1548, centerY: 2580, controlX: 334, controlY: 360 },
  { centerX: 4293, centerY: 2627, controlX: 477, controlY: 129 },
  { centerX: 3556, centerY: 935, controlX: 150, controlY: 464 },
  { centerX: 17 * mx, centerY: 690 * my, controlX: 48, controlY: 609 }, // WRONG
  { centerX: 2337, centerY: 5121, controlX: 323, controlY: 556 },
  { centerX: 4328, centerY: 4451, controlX: 456, controlY: 832 },
  { centerX: 7020, centerY: 5355, controlX: 887, controlY: 499 },
  { centerX: 6959, centerY: 3578, controlX: 682, controlY: 373 },
  { centerX: 784 * mx, centerY: 80 * my, controlX: 971, controlY: 70 }, // WRONG
  { centerX: 8906, centerY: 125, controlX: 1181, controlY: 386 },
  { centerX: 8520, centerY: 1653, controlX: 1162, controlY: -40 },
  { centerX: 10905, centerY: 413, controlX: 1326, controlY: 210 },
  { centerX: 11204, centerY: 2494, controlX: 1291, controlY: 397 },
  { centerX: 8994, centerY: 2697, controlX: 1017, controlY: 500 },
  { centerX: 1038 * mx, centerY: 606 * my, controlX: 1142, controlY: 541 }, // WRONG
  { centerX: 10458, centerY: 4007, controlX: 1340, controlY: 520 },
  { centerX: 11221, centerY: 4700, controlX: 119, controlY: 142 },
];

function preload() {
  img = loadImage('k.jpg');
  soundFormats('mp3');
  music = loadSound('hud');
  fontBold = loadFont('public/calibri-regular.ttf');
}

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-holder');
  x = positions[step].centerX;
  y = positions[step].centerY;
  //   nabytek = new Ratio(1, 128, 320, 180, '    ');
}

function draw() {
  if (intro) {
    noStroke();
    fill(255, 255, 255);
    rect(0, 0, 1600, 900);
    textFont(fontBold);

    fill(55, 77, 137);
    textAlign(CENTER, CENTER);
    textSize(64);
    text('Projeďte si s námi', 800, 350);
    text('naši 20 letou cestu smíchu!', 800, 450);
    fill(introArrowHover ? 255 : 55, 77, 137);
    text('->', 800, 580);
    textAlign(LEFT);
    fill(0, introCounter);
    rect(0, 0, 1600, 900);
    if (introCounter > 0) {
      introCounter -= 2;
    }
    if (fadeOut && introCounter < 500) {
      introCounter += 6;
    }
    if (introCounter >= 500) {
      music.play();
      introCounter = 255;
      intro = false;
    }
  } else {
    if (introCounter > 0) {
      introCounter -= 2;
    }
    if (isInPositiveMotion) {
      if (pos === 100) {
        step++;
        pos = 0;
        isInPositiveMotion = false;
      } else {
        if (pos < 99.95) {
          pos += vel;
        } else {
          pos = 100;
        }
        if (pos < 50.1 && vel < 1) {
          vel = Number((vel + acc).toFixed(3));
        } else if (pos > 50.1 && vel > 0) {
          vel = Number((vel - acc).toFixed(3));
        }
        x = bezierPoint(
          positions[step].centerX,
          positions[step].centerX,
          positions[step].controlX * mx,
          positions[step + 1].centerX,
          pos / 100
        );
        y = bezierPoint(
          positions[step].centerY,
          positions[step].centerY,
          positions[step].controlY * my,
          positions[step + 1].centerY,
          pos / 100
        );
      }
    }
    if (isInNegativeMotion) {
      if (pos === 100) {
        step--;
        pos = 0;
        isInNegativeMotion = false;
      } else {
        if (pos < 99.95) {
          pos += vel;
        } else {
          pos = 100;
        }
        if (pos < 50.1 && vel < 1) {
          vel = Number((vel + acc).toFixed(3));
        } else if (pos > 50.1 && vel > 0) {
          vel = Number((vel - acc).toFixed(3));
        }
        x = bezierPoint(
          positions[step].centerX,
          positions[step].centerX,
          positions[step - 1].centerX,
          positions[step - 1].centerX,
          pos / 100
        );
        y = bezierPoint(
          positions[step].centerY,
          positions[step].centerY,
          positions[step - 1].centerY,
          positions[step - 1].centerY,
          pos / 100
        );
      }
    }

    // image(img, 0, 0, canvasWidth, canvasHeight, centerX, centerY, 2807, 1403);
    if (test) {
      image(img, 0, 0, canvasWidth, canvasHeight, 0, 0, 14032, 7016);
      noFill();
      stroke(0);
      strokeWeight(5);
      bezier(
        (positions[step].centerX + w / 2) / mx,
        (positions[step].centerY + h / 2) / my,
        mouseX + w / mx / 2,
        mouseY + h / my / 2,
        (positions[step + 1].centerX + w / 2) / mx,
        (positions[step + 1].centerY + h / 2) / my,
        (positions[step + 1].centerX + w / 2) / mx,
        (positions[step + 1].centerY + h / 2) / my
      );
    } else {
      image(img, 0, 0, canvasWidth, canvasHeight, x, y, 2807, 1403);
      fill(0, introCounter);
      rect(0, 0, canvasWidth, canvasHeight);
    }

    noStroke();
    // textSize(32);
    // text((mouseX * mx).toFixed(0), 100, 350);
    // text((mouseY * my).toFixed(0), 100, 400);
    //   text((mouseX * mx + 320 * mx).toFixed(0), 100, 450);
    //   text((mouseY * my + 180 * my).toFixed(0), 100, 500);
    // text(centerX, 100, 350);
    // text(centerY, 100, 400);
    // text(mouseX.toFixed(0), 20, 350);
    // text(mouseY.toFixed(0), 20, 400);
    // text(x, 20, 450);
    // text(y, 20, 500);
    // text(pos, 20, 650);
    // text(step, 800, 50);
    // textSize(64);
    fill(leftArrowHover ? 255 : 55, 77, 137);
    text('<-', 750, 860);
    fill(55, 77, 137);
    fill(rightArrowHover ? 255 : 55, 77, 137);
    text('->', 850, 860);
    //   nabytek.display();
    //   text(pos, 100, 450);
    //   text(vel, 100, 500);
  }
}

function mouseMoved() {
  if (mouseX > 730 && mouseX < 805 && mouseY > 830 && mouseY < 900) {
    leftArrowHover = true;
  } else leftArrowHover = false;

  if (mouseX > 820 && mouseX < 900 && mouseY > 810 && mouseY < 900) {
    rightArrowHover = true;
  } else rightArrowHover = false;

  if (intro) {
    if (mouseX > 780 && mouseX < 820 && mouseY > 550 && mouseY < 600) {
      introArrowHover = true;
    } else introArrowHover = false;
  }
}

function mousePressed() {
  //   if (nabytek.check()) {
  //     nabytek.dragged = true;
  //   }
  if (intro && mouseX > 780 && mouseX < 820 && mouseY > 550 && mouseY < 600) {
    fadeOut = true;
  }
  if (
    mouseX > 730 &&
    mouseX < 805 &&
    mouseY > 810 &&
    mouseY < 900 &&
    step > 0
  ) {
    if (test) {
      step--;
    } else {
      pos = 0;
      isInNegativeMotion = true;
    }
  } else if (
    mouseX > 820 &&
    mouseX < 900 &&
    mouseY > 810 &&
    mouseY < 900 &&
    step < 19
  ) {
    if (test) {
      step++;
    } else {
      pos = 0;
      isInPositiveMotion = true;
    }
  }
}

function keyTyped() {
  if (key === ' ') {
    test = !test;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (test && step > 0) {
      step--;
    } else if (test && step <= 0) {
      step = 18;
    } else {
      pos = 0;
      isInNegativeMotion = true;
    }
  }
  if (keyCode === RIGHT_ARROW) {
    if (test && step < 18) {
      step++;
    } else if (test && step >= 18) {
      step = 0;
    } else {
      pos = 0;
      isInPositiveMotion = true;
    }
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
