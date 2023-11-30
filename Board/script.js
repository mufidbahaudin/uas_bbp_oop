class SnakeGame {
    constructor() {
        this.canvas = document.getElementById("snakeCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.box = 20;
        this._snake = new EnhancedSnake(10, 10, this.box, 1); 
        this._food = new Food(this.box);
        this._direction = undefined;
        this._score = 0;

        document.addEventListener("keydown", this.directionHandler.bind(this));
        document.querySelector(".customAlert button").addEventListener("click", this.restartGame.bind(this));
        document.getElementById("back-to-menu-button").addEventListener("click", this.backToMenu.bind(this));
        document.getElementById("themeDropdown").addEventListener("change", this.changeBoardTheme.bind(this));

        this.gameLoop();
    }

    
    get snake() {
        return this._snake;
    }

    
    set direction(direction) {
        this._direction = direction;
    }

    
    get score() {
        return this._score;
    }

    directionHandler(event) {
        this._snake.changeDirection(event.keyCode);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this._snake.draw(this.ctx);
        this._food.draw(this.ctx);

        this.ctx.fillStyle = "black";
        this.ctx.font = "10px Roboto";
        this.ctx.fillText("Score: " + this._score, 10, 20);

        this._snake.move(this._food, () => {
            this._score += 10;
            this._food.generateNewPosition();
        });
    }

    collision() {
        return this._snake.checkCollision(this.canvas);
    }

    gameLoop() {
        if (this.collision()) {
            this.showGameOverPopup();
            return;
        }

        this.draw();

        setTimeout(() => this.gameLoop(), 100);
    }

    showGameOverPopup() {
        const popup = document.querySelector(".customAlert");
        const finalScoreElement = document.getElementById("final-score");
        finalScoreElement.textContent = this._score;
        popup.style.display = "block";
    }

    restartGame() {
        const popup = document.querySelector(".customAlert");
        popup.style.display = "none";
        this._snake = new EnhancedSnake(10, 10, this.box, 1); // Use EnhancedSnake instead of Snake
        this._direction = undefined;
        this._score = 0;
        this.gameLoop();
    }

    backToMenu() {
        const popup = document.querySelector(".customAlert");
        popup.style.display = "none";
        window.location.href = "/Menu/index.html";
    }

    changeBoardTheme() {
        const selectedTheme = document.getElementById("themeDropdown").value;
        const body = document.body;
        const canvas = document.getElementById("snakeCanvas");

            switch (selectedTheme) {
            case "amazon":
                body.style.background = "radial-gradient(circle at 10% 20%, rgb(50, 172, 109) 0%, rgb(209, 251, 155) 100.2%)";
                canvas.style.background = "linear-gradient(109.6deg, rgb(72, 200, 160) 11.2%, rgb(32, 40, 48) 91.3%)";
                break;
            case "desert":
                body.style.background = "#EDC9AF";
                canvas.style.background = "linear-gradient(to top, #c79081 0%, #dfa579 100%)";
                break;
            case "abyss":
                body.style.background = "radial-gradient(732px at 96.2% 89.9%, rgb(70, 66, 159) 0%, rgb(187, 43, 107) 92%)";
                canvas.style.background = "linear-gradient(89.7deg, rgb(0, 32, 95) 2.8%, rgb(132, 53, 142) 97.8%)";
                break;
            case "ocean":
                body.style.background = "linear-gradient(179.2deg, rgb(21, 21, 212) 0.9%, rgb(53, 220, 243) 95.5%)";;
                canvas.style.background = "linear-gradient(138deg, rgb(32, 201, 255) 36.7%, rgb(0, 8, 187) 84.4%, rgb(255, 255, 255) 119.7%)"
                break;
            case "space":
                body.style.background = "linear-gradient( 99.9deg, rgba(27,24,31,1) 21.2%, rgba(50,4,89,1) 84.8% )";
                canvas.style.background = "linear-gradient( 99.9deg, rgba(27,24,31,1) 21.2%, rgba(50,4,89,1) 84.8% )";
                break;
            case "volcano":
                body.style.background = "radial-gradient(circle at 10% 20%, rgb(205, 33, 42) 0%, rgb(236, 95, 5) 90%)";
                canvas.style.background = "radial-gradient(circle at 10% 20%, rgb(221, 49, 49) 0%, rgb(119, 0, 0) 90%)";
                break;
            default:
                body.style.background = "";
                break;
        }

        canvas.style.border = canvas.style.border === "3px solid black" ? "3px solid black" : "3px solid black";
    }
}

class Snake {
    constructor(x, y, box) {
        this._body = [{ x: x * box, y: y * box }]; 
        this._direction = undefined;
        this.box = box;
    }

    
    get body() {
        return this._body;
    }

   
    set direction(direction) {
        this._direction = direction;
    }

    changeDirection(keyCode) {
        if (keyCode === 37 && this._direction !== "RIGHT") {
            this._direction = "LEFT";
        } else if (keyCode === 38 && this._direction !== "DOWN") {
            this._direction = "UP";
        } else if (keyCode === 39 && this._direction !== "LEFT") {
            this._direction = "RIGHT";
        } else if (keyCode === 40 && this._direction !== "UP") {
            this._direction = "DOWN";
        }
    }

    draw(ctx) {
        for (let i = 0; i < this._body.length; i++) {
            ctx.fillStyle = i === 0 ? "green" : "white";
            ctx.fillRect(this._body[i].x, this._body[i].y, this.box, this.box);

            ctx.strokeStyle = "black";
            ctx.strokeRect(this._body[i].x, this._body[i].y, this.box, this.box);
        }
    }

    move(food, eatCallback) {
        let snakeX = this._body[0].x;
        let snakeY = this._body[0].y;

        if (this._direction === "LEFT") snakeX -= this.box;
        if (this._direction === "UP") snakeY -= this.box;
        if (this._direction === "RIGHT") snakeX += this.box;
        if (this._direction === "DOWN") snakeY += this.box;

        if (snakeX === food.position.x && snakeY === food.position.y) {
            eatCallback();
        } else {
            this._body.pop();
        }

        let newHead = { x: snakeX, y: snakeY };
        this._body.unshift(newHead);
    }

    checkCollision(canvas) {
        for (let i = 1; i < this._body.length; i++) {
            if (this._body[0].x === this._body[i].x && this._body[0].y === this._body[i].y) {
                return true; 
            }
        }

        return (
            this._body[0].x < 0 ||
            this._body[0].x >= canvas.width ||
            this._body[0].y < 0 ||
            this._body[0].y >= canvas.height
        );
    }
}

class EnhancedSnake extends Snake {
    constructor(x, y, box, speed) {
        super(x, y, box);
        this._speed = speed; 
    }

   
    get speed() {
        return this._speed;
    }

    
    set speed(speed) {
        this._speed = speed;
    }

    
    move(food, eatCallback) {
        let snakeX = this._body[0].x;
        let snakeY = this._body[0].y;

        if (this._direction === "LEFT") snakeX -= this.box * this._speed;
        if (this._direction === "UP") snakeY -= this.box * this._speed;
        if (this._direction === "RIGHT") snakeX += this.box * this._speed;
        if (this._direction === "DOWN") snakeY += this.box * this._speed;

        if (snakeX === food.position.x && snakeY === food.position.y) {
            eatCallback();
        } else {
            this._body.pop();
        }

        let newHead = { x: snakeX, y: snakeY };
        this._body.unshift(newHead);
    }

    
    boostSpeed() {
        this._speed += 1;
    }
}

class Food {
    constructor(box) {
        this.box = box;
        this._position = { x: Math.floor(Math.random() * 20) * this.box, y: Math.floor(Math.random() * 20) * this.box };
    }

    
    get position() {
        return this._position;
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this._position.x, this._position.y, this.box, this.box);
    }

    generateNewPosition() {
        this._position = { x: Math.floor(Math.random() * 20) * this.box, y: Math.floor(Math.random() * 20) * this.box };
    }
}

// Usage
const snakeGame = new SnakeGame();
console.log(snakeGame.snake.speed); 
snakeGame.snake.speed = 1; 
