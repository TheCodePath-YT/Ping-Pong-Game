const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// Game Variables
let paddleWidth = 10,
  paddleHeight = 100;
let playerPaddle = { 
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2
 };
let computerPaddle = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
};
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 5,
  speedY: 5,
};

// Draw functions
function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function drawCircle(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}

// Control Player Paddle with Mouse
canvas.addEventListener("mousemove", (event) => {
  let rect = canvas.getBoundingClientRect();
  playerPaddle.y = event.clientY - rect.top - paddleHeight / 2;
});

// Update function
function update() {
  // Move the ball
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Ball collision with top and bottom walls
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }

  // Ball collision with paddles
  let playerCollision =
    ball.x - ball.radius < playerPaddle.x + paddleWidth &&
    ball.y > playerPaddle.y &&
    ball.y < playerPaddle.y + paddleHeight;
  let computerCollision =
    ball.x + ball.radius > computerPaddle.x &&
    ball.y > computerPaddle.y &&
    ball.y < computerPaddle.y + paddleHeight;

  if (playerCollision || computerCollision) {
    ball.speedX = -ball.speedX;
  }

  // Ball goes out of bounds
  if (ball.x < 0 || ball.x > canvas.width) {
    resetBall();
  }

  // Computer paddle movement
  computerPaddle.y += (ball.y - (computerPaddle.y + paddleHeight / 2)) * 0.1;
}

// Reset the ball to the center
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speedX = -ball.speedX;
  ball.speedY = (Math.random() > 0.5 ? 1 : -1) * 5;
}

// Render function
function render() {
  // Clear canvas
  drawRect(0, 0, canvas.width, canvas.height, "#222");

  // Draw paddles
  drawRect(playerPaddle.x, playerPaddle.y, paddleWidth, paddleHeight, "#fff");
  drawRect(
    computerPaddle.x,
    computerPaddle.y,
    paddleWidth,
    paddleHeight,
    "#fff"
  );

  // Draw ball
  drawCircle(ball.x, ball.y, ball.radius, "#fff");
}

// Game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
