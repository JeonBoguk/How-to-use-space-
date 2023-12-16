let balls = [];
let gravity = 0.1;
let maxBounceCount = 10;
let maxBallCount = 10;
let titleText = "HOW TO USE SPACE?";
let titleOpacity = 0;
let nextPageVisible = false;
let transitionSpeed = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  balls.push(new BouncingBall());

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(transitionToNextPage);
}

function draw() {
  background(0);

  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255, titleOpacity);
  text(titleText, width / 2, height / 2);

  let distanceToTitle = dist(mouseX, mouseY, width / 2, height / 2);
  titleOpacity = map(distanceToTitle, 0, width / 2, 255, 0);

  if (nextPageVisible) {
    fill(255);
    rect(map(transitionSpeed, 0, 10, width * 2, 0), 0, width, height);
    transitionSpeed += 0.1;

    if (transitionSpeed >= 10) {
      nextPage();
      nextPageVisible = false;
      transitionSpeed = 0;
    }
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    let ball = balls[i];
    ball.applyGravity();
    ball.update();
    ball.display();

    if (ball.position.y >= height - ball.radius) {
      ball.position.y = height - ball.radius;
      ball.velocity.y *= -0.8;
      ball.bounceCount++;

      if (ball.bounceCount >= maxBounceCount) {
        balls.splice(i, 1);
        balls.push(new BouncingBall());
        ball.resetBounceCount();
      }
    }
  }

  if (balls.length >= maxBallCount) {
    balls = [];
    for (let i = 0; i < maxBallCount; i++) {
      balls.push(new BouncingBall());
    }
  }
}

function transitionToNextPage() {
  nextPageVisible = true;
}

function nextPage() {
  window.location.href = "menu.html";
}

class BouncingBall {
  constructor() {
    this.position = createVector(random(width), 0);
    this.velocity = createVector(random(-5, 5), random(5, 10));
    this.radius = 20;
    this.pattern = loadImage("soccer_ball_pattern.png");
    this.bounceCount = 0;
  }

  applyGravity() {
    this.velocity.y += gravity;
  }

  update() {
    this.position.add(this.velocity);

    if (this.position.x < 0 + this.radius || this.position.x > width - this.radius) {
      this.velocity.x *= -1;
    }
  }

  display() {
    imageMode(CENTER);
    image(this.pattern, this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }

  resetBounceCount() {
    this.bounceCount = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
