let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;

let drawBorder = function () {
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

drawBorder();

//ctx.fillText("Score", 20, 20);
//
//ctx.font = "20px Courier";
//ctx.fillText("Courier", 50, 50);
//
//ctx.font = "24px Comic Sans MS";
//ctx.fillText("Comic Sansa", 50, 100);
//
//ctx.font = "18px Arial";
//ctx.fillText("Arial", 50, 150);

let drawScore = function () {
    //    ctx.clearRect(0, 0, width, height);
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score + " Speed:" + animationTime, blockSize, blockSize);
    //    if (score > 3) {
    //        clearInterval(intervalId);
    //    }
};


let gameOver = function () {
 
//    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", width / 2, height / 2);
};


//let intervalId = setInterval(drawScore, 100);



let Block = function (col, row) {
    this.col = col;
    this.row = row;
};
let count = 0;
Block.prototype.drawSquare = function (color) {
    let x = this.col * blockSize;
    let y = this.row * blockSize;
     
//    if (count % 2 !== 0) {
//         ctx.fillStyle = "black";
//         count++;
//     } else if (count % 2 === 0) {
//         ctx.fillStyle = "green";
//         count++;
//     }
    
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};

//let testBlock = new Block(10, 30);
//testBlock.drawSquare("red");

Block.prototype.drawCircle = function (color) {
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};

let circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

//let test = new Block(15, 15);
//test.drawCircle("red");

Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

//let apple = new Block(3, 5);
//let head = new Block(3, 5);
//
//apple.equal(head);

let Snake = function () {
    this.segments = [
      new Block(7, 5),
      new Block(6, 5),
      new Block(5, 5)
  ];

    this.direction = "right";
    this.nextDirection = "right";

};

Snake.prototype.draw = function () {
    
    for (let i = 0; i < this.segments.length; i++) {
        if (i === 0) {
            this.segments[i].drawSquare("red");
        }    else if (i % 2 !== 0) {
            this.segments[i].drawSquare("black");
        } else if (i % 2 === 0) {    
        this.segments[i].drawSquare("green");
        }
    }
};

//let pop = new Snake();
//pop.draw();

Snake.prototype.move = function () {
    let head = this.segments[0];
    let newHead;

    this.direction = this.nextDirection;


    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }

    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if (newHead.equal(apple.position)) {
        score++;
        animationTime -= 2;
       
        apple.move();

    } else {
        this.segments.pop();
    }
};

Snake.prototype.checkCollision = function (head) {
    let leftCollision = (head.col === 0);
    let topCollision = (head.row === 0);
    let rightCollision = (head.col === widthInBlocks - 1);
    let bottomCollision = (head.row === heightInBlocks - 1);

    let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

    let selfcollison = false;

    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfcollison = true;
        }
    }

    return wallCollision || selfcollison;
};


let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

//$("body").keydown(function (event) {
//    let newDirection = directions[event.keyCode];
//    if (newDirection !== undefined) {
//        snake.setDirection(newDirection);
//    }
//});

Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") {
        return;
    } else if (this.direction === "down" && newDirection === "up") {
        return;
    } else if (this.direction === "left" && newDirection === "right") {
        return;
    }

    this.nextDirection = newDirection;

};

let Apple = function () {
    this.position = new Block(10, 10);
};

Apple.prototype.draw = function () {
    this.position.drawCircle("LimeGreen");
};



Apple.prototype.move = function () {
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    
//   let check = 0;
//    for (let i = 0;i < snake.segments.length;i++) {
//        if (snake.segments[i].col === randomCol && snake.segments[i].row === randomRow) {
//            console.log("123");
//            
//        }
//    }
//    if (check = 1) {
//        randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
//        randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
//    }

    this.position = new Block(randomCol, randomRow);
    
    
};


//===========================

let snake = new Snake();
let apple = new Apple();


//let intervalId = setInterval(function () {
//    ctx.clearRect(0, 0, width, height);
//    drawScore();
//    snake.move();
//    snake.draw();
//    apple.draw();
//    drawBorder();
//}, 100);


$("body").keydown(function (event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
});



let animationTime = 100;
let gameLoop = function() {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
    setTimeout(gameLoop,animationTime);
};

gameLoop();