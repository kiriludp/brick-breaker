// storing a reference to the canvas variable.
var canvas = document.getElementById("myCanvas");
// creating the ctx variable to store 2d rendering
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

const ballRadius = 10;
// define the parameters of the paddle
const paddleHeight = 10;
// starting point on the x axis
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

// all instructions are between the beginPath and closePath
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
   if (x + dx > canvas.width-ballRadius || x + dx < ballRadius ) {
    dx = -dx;
   }
    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy= -dy;
    }
    x += dx;
    y += dy;
    if (rightPressed) {
        paddleX +=7;
    } else if (leftPressed) {
        paddleX -=7;
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandker, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}



setInterval(draw, 10);



