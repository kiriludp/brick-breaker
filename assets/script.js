var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;

const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;


var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (var c = 0; c <brickColumnCount; c++) {
        for (var r=0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status === 1) {
            
            //calculations
            if (x > b.x && 
                x < b.x + brickWidth && 
                y > b.y &&
                y < b.y + brickHeight)
                {
                dy = -dy;
                b.status = 0;
                score++;
                if (score === brickRowCount * brickColumCount) {
                    alert("YOU'RE A WINNER, BABY!");
                    document.location.reload();
                    clearInterval(interval);
                }
            }
            }
        }
    }
}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    
    for (var c =0; c < brickColumnCount; c++) {
    for (var r=0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
        var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x =brickX;
        bricks[c][r].y =brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "0095DD";
        ctx.fill();
        ctx.closePath();
        }
        }
    }
}

function drawScore() {
    ctx.font = "16x Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    // code to make the ball bounce off the walls
   if (x + dx > canvas.width-ballRadius || x + dx < ballRadius ) {
    dx = -dx;
   }
    if (y + dy < ballRadius) {
        dy= -dy;
    } else if (y +dy > canvas.height - ballRadius) {
        if ( x> paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); //needed for chrome to end the game
        }
    }

    if (rightPressed && paddleX < canvas.width-paddleWidth) { 
        paddleX +=7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -=7;
    }

    x += dx;
    y += dy;
}


const interval = setInterval(draw, 10);



