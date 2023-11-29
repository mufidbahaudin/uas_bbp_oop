// class SnakeGame {
//     constructor() {
//         this.canvas = document.getElementById("snakeCanvas");
//         this.ctx = this.canvas.getContext("2d");
//         this.box = 20;
//         this.snake = [];
//         this.snake[0] = { x: 10 * this.box, y: 10 * this.box };
//         this.food = {
//             x: Math.floor(Math.random() * 20) * this.box,
//             y: Math.floor(Math.random() * 20) * this.box
//         };
//         this.d = undefined;
//         this.score = 0;

//         document.addEventListener("keydown", this.direction.bind(this));
//         this.gameLoop();
//     }

//     // Getter dan setter untuk properti private (snake, food, d, score)
//     getSnake() {
//         return this.snake;
//     }

//     setSnake(newSnake) {
//         this.snake = newSnake;
//     }

//     getFood() {
//         return this.food;
//     }

//     setFood(newFood) {
//         this.food = newFood;
//     }

//     getD() {
//         return this.d;
//     }

//     setD(newD) {
//         this.d = newD;
//     }

//     getScore() {
//         return this.score;
//     }

//     setScore(newScore) {
//         this.score = newScore;
//     }

//     direction(event) {
//         if (event.keyCode === 37 && d !== "RIGHT") {
//             d = "LEFT";
//         } else if (event.keyCode === 38 && d !== "DOWN") {
//             d = "UP";
//         } else if (event.keyCode === 39 && d !== "LEFT") {
//             d = "RIGHT";
//         } else if (event.keyCode === 40 && d !== "UP") {
//             d = "DOWN";
//         }
//     }

//     draw() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         for (let i = 0; i < snake.length; i++) {
//             ctx.fillStyle = i === 0 ? "green" : "white";
//             ctx.fillRect(snake[i].x, snake[i].y, box, box);
    
//             ctx.strokeStyle = "black";
//             ctx.strokeRect(snake[i].x, snake[i].y, box, box);
//         }
    
//         ctx.fillStyle = "red";
//         ctx.fillRect(food.x, food.y, box, box);
    
//         ctx.fillStyle = "black";
//         ctx.font = "10px Roboto";
//         ctx.fillText("Score: " + score, 10, 20);
    
//         let snakeX = snake[0].x;
//         let snakeY = snake[0].y;
    
//         if (d === "LEFT") snakeX -= box;
//         if (d === "UP") snakeY -= box;
//         if (d === "RIGHT") snakeX += box;
//         if (d === "DOWN") snakeY += box;
    
//         if (snakeX === food.x && snakeY === food.y) {
//             score += 10;
//             food = {
//                 x: Math.floor(Math.random() * 20) * box,
//                 y: Math.floor(Math.random() * 20) * box
//             };
//         } else {
//             snake.pop();
//         }
    
//         let newHead = { x: snakeX, y: snakeY };
//         snake.unshift(newHead);
//     }

//     collision() {
//         for (let i = 1; i < snake.length; i++) {
//             if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
//                 return true;
//             }
//         }
    
//         return (
//             snake[0].x < 0 ||
//             snake[0].x >= canvas.width ||
//             snake[0].y < 0 ||
//             snake[0].y >= canvas.height
//         );
//     }

//     gameLoop() {
//         if (collision()) {
//             alert("Game Over!");
//             snake = [];
//             snake[0] = { x: 10 * box, y: 10 * box };
//             d = undefined;
//         }
    
//         draw();
    
//         setTimeout(gameLoop, 100);
//     }

//     showGameOverPopup() {
//         const popup = document.querySelector(".game-over-popup");
//         const finalScoreElement = document.getElementById("final-score");
//         finalScoreElement.textContent = score; 
//         popup.style.display = "block";
//     }

//     restartGame() {
//         const popup = document.querySelector(".game-over-popup");
//     popup.style.display = "none";
//     snake = [];
//     snake[0] = { x: 10 * box, y: 10 * box };
//     d = undefined;
//     score = 0;
//     gameLoop();
//     }

//     backToMenu() {
//         const popup = document.querySelector(".game-over-popup");
//         popup.style.display = "none";
//         window.location.href = "/Menu/index.html";
//     }

//     changeBoardTheme() {
//         const selectedTheme = document.getElementById("themeDropdown").value;
//     const body = document.body;
//     const canvas = document.getElementById("snakeCanvas");

//     switch (selectedTheme) {
//         case "amazon":
//             body.style.background = "radial-gradient(circle at 10% 20%, rgb(50, 172, 109) 0%, rgb(209, 251, 155) 100.2%)";
//             canvas.style.background = "linear-gradient(109.6deg, rgb(72, 200, 160) 11.2%, rgb(32, 40, 48) 91.3%)";
//             break;
//         case "desert":
//             body.style.background = "#EDC9AF";
//             canvas.style.background = "linear-gradient(to top, #c79081 0%, #dfa579 100%)";
//             break;
//         case "abyss":
//             body.style.background = "radial-gradient(732px at 96.2% 89.9%, rgb(70, 66, 159) 0%, rgb(187, 43, 107) 92%)";
//             canvas.style.background = "linear-gradient(89.7deg, rgb(0, 32, 95) 2.8%, rgb(132, 53, 142) 97.8%)";
//             break;
//         case "ocean":
//             body.style.background = "linear-gradient(179.2deg, rgb(21, 21, 212) 0.9%, rgb(53, 220, 243) 95.5%)";;
//             canvas.style.background = "linear-gradient(138deg, rgb(32, 201, 255) 36.7%, rgb(0, 8, 187) 84.4%, rgb(255, 255, 255) 119.7%)"
//             break;
//         case "space":
//             body.style.background = "linear-gradient( 99.9deg, rgba(27,24,31,1) 21.2%, rgba(50,4,89,1) 84.8% )";
//             canvas.style.background = "linear-gradient( 99.9deg, rgba(27,24,31,1) 21.2%, rgba(50,4,89,1) 84.8% )";
//             break;
//         default:
//             body.style.background = "";
//             break;
//     }

//     canvas.style.border = canvas.style.border === "3px solid black" ?
//         "3px solid black" :
//         "3px solid black";
//     }
// }

// // Membuat instance dari kelas SnakeGame
// const snakeGame = new SnakeGame();
