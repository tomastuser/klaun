let x, y;
let newSizeRatio = 0;
let inc;
const speedRatio = 200;
let angle = 0;
const mx = 8.77;
const my = 7.795;
const canvasWidth = 1600;
const canvasHeight = 900;
let nabytek;
let step = 0;
let centerX = 0;
let centerY = 885;
let test = false;
const w = 2306;
const h = 1403;
let introCounter = 255;
let isInPositiveMotion = false;
let isInNegativeMotion = false;
let initialStepSetup = true;
let img, introImg, outroImg, konf, music, music2, end;
// let intro = false;
let intro = true;
let outro = false;
let outroFadeOut = false;
let leftArrowHover = false;
let rightArrowHover = false;
let introArrowHover = false;
let fadeOut = false;
let c, start, left, right, mute;

const positions = [
  { centerX: 0, centerY: 0, controlX: 0, controlY: 0, size: 5 },
  { centerX: 0, centerY: 885, controlX: 54, controlY: 171, size: 1.1 },
  { centerX: 1230, centerY: 1400, controlX: 14, controlY: 264, size: 1.05 },
  { centerX: 0, centerY: 3440, controlX: 108, controlY: 331, size: 1.05 },
  { centerX: 1480, centerY: 2480, controlX: 334, controlY: 360, size: 1.1 },
  { centerX: 4293, centerY: 2627, controlX: 477, controlY: 129, size: 1 },
  { centerX: 3556, centerY: 935, controlX: 150, controlY: 464, size: 1 },
  { centerX: 0, centerY: 4800, controlX: 48, controlY: 609, size: 1.4 },
  { centerX: 2240, centerY: 5100, controlX: 323, controlY: 556, size: 1.15 },
  { centerX: 3400, centerY: 4000, controlX: 456, controlY: 832, size: 1.3 },
  { centerX: 6690, centerY: 5090, controlX: 887, controlY: 499, size: 1.25 },
  { centerX: 6959, centerY: 3500, controlX: 682, controlY: 373, size: 1.15 },
  { centerX: 5975, centerY: 440, controlX: 971, controlY: 70, size: 1.4 },
  { centerX: 8906, centerY: 125, controlX: 1181, controlY: 386, size: 1 },
  { centerX: 8520, centerY: 1653, controlX: 1162, controlY: -40, size: 0.9 },
  { centerX: 10905, centerY: 413, controlX: 1326, controlY: 210, size: 1 },
  { centerX: 11204, centerY: 2094, controlX: 1291, controlY: 397, size: 1.2 },
  { centerX: 8994, centerY: 2697, controlX: 1017, controlY: 500, size: 1 },
  { centerX: 8503, centerY: 4373, controlX: 1142, controlY: 541, size: 1.33 },
  { centerX: 10358, centerY: 3707, controlX: 1340, controlY: 520, size: 1.2 },
  { centerX: 11221, centerY: 4600, controlX: 119, controlY: 142, size: 1.1 },
  { centerX: 1, centerY: 1, controlX: 3556, controlY: 935, size: 5 },
];

function preload() {
  img = loadImage('k2.jpg');
  introImg = loadImage('intro.jpg');
  outroImg = loadImage('outro.jpg');
  konf = loadImage('konf.png');
  soundFormats('mp3');
  music = loadSound('hud');
  music2 = loadSound('hud2');
  end = loadSound('end');
  music.setVolume(0.1);
  music2.setVolume(0.2);
  end.setVolume(0.3);
}

let particles = [];
const gravity = 0.25;
let colors;
let endColor;

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('sketch-holder');
  colors = ['red', color(55, 77, 139), 'white'];
  inc = PI / speedRatio;
  x = positions[step].centerX;
  y = positions[step].centerY;
  newSizeRatio = positions[0].size - 1;
  c = document.getElementById('c');
  start = document.getElementById('start');
  left = document.getElementById('left');
  right = document.getElementById('right');
  soundOn = document.getElementById('soundOn');
  soundOff = document.getElementById('soundOff');
  start.style.bottom = `${c.getBoundingClientRect().top + 20}px`;
  start.style.right = `${c.getBoundingClientRect().left + 20}px`;
  right.style.bottom = `${c.getBoundingClientRect().top + 10}px`;
  right.style.right = `${c.getBoundingClientRect().left + 10}px`;
  left.style.bottom = `${c.getBoundingClientRect().top + 10}px`;
  left.style.right = `${c.getBoundingClientRect().left + 90}px`;
  soundOn.style.top = `${c.getBoundingClientRect().top + 10}px`;
  soundOn.style.right = `${c.getBoundingClientRect().left + 5}px`;
  soundOff.style.top = `${c.getBoundingClientRect().top + 10}px`;
  soundOff.style.right = `${c.getBoundingClientRect().left + 5}px`;

  start.style.display = 'block';
  start.onclick = () => {
    fadeOut = true;
  };
  left.onclick = () => {
    moveLeft();
  };
  right.onclick = () => {
    moveRight();
  };
  soundOn.onclick = () => {
    soundOn.style.display = 'none';
    soundOff.style.display = 'block';
    music.setVolume(0);
  };
  soundOff.onclick = () => {
    soundOff.style.display = 'none';
    soundOn.style.display = 'block';
    music.setVolume(0.1);
  };
}

// function mousePressed() {
//   particles.push(new Firework(mouseX, mouseY));
// }

function draw() {
  background(255);

  if (intro) {
    noStroke();
    image(introImg, 0, 0, 1600, 900);

    if (introCounter > 0) {
      fill(0, sin(((introCounter - 10) / 255) * HALF_PI) * 255);
      introCounter -= 2;
    } else fill(0, 0);
    if (fadeOut && introCounter < 500) {
      if (introCounter > 255) {
        fill(0, 255);
      }
      introCounter += 6;
    }
    start.style.opacity = sin((introCounter / 255) * HALF_PI + HALF_PI);
    rect(0, 0, 1600, 900);
    if (introCounter >= 500) {
      music.play();
      introCounter = 255;
      intro = false;
      start.style.display = 'none';
      left.style.display = 'block';
      right.style.display = 'block';
      soundOn.style.display = 'block';
    }
  } else if (outro) {
    noStroke();
    image(outroImg, 0, 0, 1600, 900);
    if (introCounter > 0) {
      fill(0, sin((introCounter / 255) * HALF_PI) * 255);
      introCounter -= 2;
    } else fill(0, 0);
    rect(0, 0, 1600, 900);
  } else {
    if (introCounter > 0) {
      if (introCounter === 75) {
        moveRight();
      }
      introCounter -= 2;
      left.style.opacity = sin((introCounter / 255) * HALF_PI + HALF_PI);
      right.style.opacity = sin((introCounter / 255) * HALF_PI + HALF_PI);
      soundOn.style.opacity = sin((introCounter / 255) * HALF_PI + HALF_PI);
    }
    if (outroFadeOut) {
      if (introCounter < 255) {
        introCounter += 5;
      } else if (introCounter > 255) {
        outroFadeOut = false;
        outro = true;
        music2.play();
      }
      if (introCounter > -1200 && introCounter < -1190) {
        isInPositiveMotion = true;
      }
      if (introCounter > -2400 && introCounter < -2390) {
        end.play();
        music.setVolume(0, 2);
        particles.push(new Firework(random(740, 1000), random(459, 690)));
      }
      if (introCounter > -2400 && introCounter < -1600) {
        if (introCounter % 50 === 0) {
          particles.push(new Firework(random(740, 1000), random(100, 690)));
        }
      }
    }
    if (isInPositiveMotion) {
      if (angle > HALF_PI) {
        step++;
        angle = 0;
        isInPositiveMotion = false;
      } else {
        angle += inc;
        x = bezierPoint(
          positions[step].centerX,
          positions[step].centerX,
          positions[step].controlX * mx,
          positions[step + 1].centerX,
          sin(sin(angle) * angle)
        );
        y = bezierPoint(
          positions[step].centerY,
          positions[step].centerY,
          positions[step].controlY * my,
          positions[step + 1].centerY,
          sin(sin(angle) * angle)
        );
        if (positions[step].size > positions[step + 1].size) {
          newSizeRatio =
            (positions[step].size - positions[step + 1].size) *
              (1 - sin(sin(angle) * angle)) +
            (positions[step + 1].size - 1);
        } else
          newSizeRatio =
            (positions[step + 1].size - positions[step].size) *
              sin(sin(angle) * angle) +
            (positions[step].size - 1);
      }
    }
    if (isInNegativeMotion) {
      if (angle > HALF_PI) {
        step--;
        angle = 0;
        isInNegativeMotion = false;
      } else {
        angle += inc;
        x = bezierPoint(
          positions[step].centerX,
          positions[step].centerX,
          positions[step - 1].centerX,
          positions[step - 1].centerX,
          sin(sin(angle) * angle)
        );
        y = bezierPoint(
          positions[step].centerY,
          positions[step].centerY,
          positions[step - 1].centerY,
          positions[step - 1].centerY,
          sin(sin(angle) * angle)
        );
        if (positions[step].size > positions[step - 1].size) {
          newSizeRatio =
            (positions[step].size - positions[step - 1].size) *
              (1 - sin(sin(angle) * angle)) +
            (positions[step - 1].size - 1);
        } else
          newSizeRatio =
            (positions[step - 1].size - positions[step].size) *
              sin(sin(angle) * angle) +
            (positions[step].size - 1);
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
      image(
        img,
        0,
        0,
        canvasWidth,
        canvasHeight,
        x,
        y,
        // x + cos(angle * 20) * 1.5,
        // y + sin(radians(millis() + random(20))) * 3,
        // y + sin(angle * 40) * 3,
        2807 * (1 + newSizeRatio),
        1403 * (1 + newSizeRatio)
      );
      if (introCounter > 0) {
        fill(0, sin((introCounter / 255) * HALF_PI) * 255);
      } else fill(0, 0);
      rect(0, 0, canvasWidth, canvasHeight);
    }

    noStroke();
    textSize(32);
    fill(0);
    // text((mouseX * mx).toFixed(0), 100, 350);
    // text((mouseY * my).toFixed(0), 100, 400);
    //   text((mouseX * mx + 320 * mx).toFixed(0), 100, 450);
    //   text((mouseY * my + 180 * my).toFixed(0), 100, 500);
    // text(centerX, 100, 350);
    // text(centerY, 100, 400);
    // text(outro, 20, 450);
    // text(introCounter, 20, 500);
    // text(pos, 20, 650);
    // text(mouseX.toFixed(0), 20, 350);
    // text(mouseY.toFixed(0), 20, 400);
    // text(sin(angle), 20, 650);
    // text(isInPositiveMotion, 20, 550);
    // text(newSizeRatio, 20, 600);
    // text(step, 800, 50);
    // noFill();

    // stroke(55, 77, 137);
    // strokeWeight(4);
    // if (leftArrowHover) {
    //   rect(669, 820, 121, 74, 10);
    // }
    // noStroke();
    // image(arrowL, 669, 820, 121, 74);

    // stroke(55, 77, 137);
    // strokeWeight(4);
    // if (rightArrowHover) {
    //   rect(810, 820, 121, 74, 10);
    // }
    // noStroke();
    // image(arrowR, 810, 820, 121, 74);
    // text('->', 850, 860);
  }
  particles.forEach((p) => {
    p.step();
    p.draw();
  });
  particles = particles.filter((p) => p.isAlive);
}

function mouseMoved() {
  if (mouseX > 669 && mouseX < 800 && mouseY > 820 && mouseY < 894) {
    leftArrowHover = true;
  } else leftArrowHover = false;

  if (mouseX > 810 && mouseX < 921 && mouseY > 820 && mouseY < 894) {
    rightArrowHover = true;
  } else rightArrowHover = false;

  if (intro) {
    if (
      mouseX > 1350 &&
      mouseX < 1350 + 240 &&
      mouseY > 730 &&
      mouseY < 730 + 121
    ) {
      introArrowHover = true;
    } else introArrowHover = false;
  }
}

function moveRight() {
  if (test && step < positions.length - 2) {
    step++;
  } else if (test && step >= positions.length - 2) {
    step = 1;
  } else if (!isInNegativeMotion && step < positions.length - 3) {
    inc = PI / (speedRatio + random(100));
    isInPositiveMotion = true;
  } else if (step === positions.length - 3) {
    inc = PI / (speedRatio + random(100));
    isInPositiveMotion = true;
    introCounter = -3150;
    outroFadeOut = true;
  }
}

function moveLeft() {
  if (test && step > 0) {
    step--;
  } else if (test && step <= 0) {
    step = positions.length - 2;
  } else if (!isInPositiveMotion && step > 0) {
    inc = PI / (speedRatio + random(100));
    isInNegativeMotion = true;
  }
}

// function keyTyped() {
//   if (key === ' ') {
//     test = !test;
//   }
// }

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    moveLeft();
  }
  if (keyCode === RIGHT_ARROW) {
    moveRight();
  }
}

class Particle {
  constructor(x, y, xSpeed, ySpeed, pColor, size) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = pColor;
    this.size = size;
    this.isAlive = true;
    this.trail = [];
    this.trailIndex = 0;
  }

  step() {
    this.trail[this.trailIndex] = createVector(this.x, this.y);
    this.trailIndex++;
    if (this.trailIndex > 10) {
      this.trailIndex = 0;
    }
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.ySpeed += gravity;

    if (this.y > height) {
      this.isAlive = false;
    }
  }

  draw() {
    // this.drawTrail();
    // push();
    // translate(this.x, this.y);
    // rotate(frameCount / 10.0);
    // image(konf, 0, 0);
    // pop();
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  drawTrail() {
    let index = 0;

    for (let i = this.trailIndex - 1; i >= 0; i--) {
      fill(255, 0, 0);
      noStroke();
      rect(this.trail[i].x, this.trail[i].y, this.size, this.size);
      index++;
    }

    for (let i = this.trail.length - 1; i >= this.trailIndex; i--) {
      fill(255, 0, 0);
      noStroke();
      rect(this.trail[i].x, this.trail[i].y, this.size, this.size);
      index++;
    }
  }
}

class Firework extends Particle {
  constructor(x, y) {
    super(x, y, random(-2, 2), random(-10, -15), random(colors), 10);
    this.countdown = random(30, 60);
  }

  step() {
    super.step();

    const explosionSize = random(20, 50);
    for (let i = 0; i < explosionSize; i++) {
      const speed = random(5, 10);
      const angle = random(TWO_PI);
      const xSpeed = cos(angle) * speed;
      const ySpeed = sin(angle) * speed;

      particles.push(
        new Particle(this.x, this.y, xSpeed, ySpeed, this.color, 15)
      );
    }
    this.isAlive = false;
  }
}
