// konstruktor
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById("snakeCanvas");
        this.ctx = this.canvas.getContext("2d"); // rendering 2D untuk canvas
        this.box = 20; // ukuran dari kotak
        this._snake = new EnhancedSnake(10, 10, this.box, 1); // koordinat ular 10, 10 | this.box, 1 (kecepatan awal dari ular)
        this._food = new Food(this.box); // makanan dalam game
        this._direction = undefined; // menyimpan arah saat ini dari ular
        this._score = 0; // meyimpan score pemain, mulai dari skor 0

        document.addEventListener("keydown", this.directionHandler.bind(this));
        document.querySelector(".customAlert button").addEventListener("click", this.restartGame.bind(this));
        document.getElementById("back-to-menu-button").addEventListener("click", this.backToMenu.bind(this));
        document.getElementById("themeDropdown").addEventListener("change", this.changeBoardTheme.bind(this));

        this.gameLoop(); // memulai game loop utama, secara rekursif memanggil dirinya untuk permainan yang berkelanjutan.
    }

    // getter & setter
    
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
        this._snake.changeDirection(event.keyCode); // Ini memungkinkan objek ular (_snake) untuk mengubah arahnya berdasarkan input keyboard pengguna.
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this._snake.draw(this.ctx);
        this._food.draw(this.ctx);

        this.ctx.fillStyle = "black"; // font score
        this.ctx.font = "10px Roboto"; // font score
        this.ctx.fillText("Score: " + this._score, 10, 20); // skor

        this._snake.move(this._food, () => {
            this._score += 10; // setiap skor dikasih 10 poin
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

        setTimeout(() => this.gameLoop(), 100); // kecepatan ular
    }

    showGameOverPopup() { // muncul popup game over
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
        this._food = new Food(this.box); // makanan dalam game
        this._direction = undefined;
        this.gameLoop(); // setiap klik restrart / try again maka game ulang dari awal
    }

    backToMenu() { // ketika klik quit maka balik ke menu
        const popup = document.querySelector(".customAlert");
        popup.style.display = "none";
        window.location.href = "/Menu/index.html";
    }

    changeBoardTheme() {
        const selectedTheme = document.getElementById("themeDropdown").value;
        const body = document.body;
        const canvas = document.getElementById("snakeCanvas");

            switch (selectedTheme) { // menguabah tema papan / select theme
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
            ctx.fillStyle = i === 0 ? "green" : "white"; // green : kepala ular, white: badan ular
            ctx.fillRect(this._body[i].x, this._body[i].y, this.box, this.box);

            ctx.strokeStyle = "black";
            ctx.strokeRect(this._body[i].x, this._body[i].y, this.box, this.box);
        }
    }

    move(food, eatCallback) { // food : apakah ular bertabrakan dengan makanan
        let snakeX = this._body[0].x;
        let snakeY = this._body[0].y;
        // mengambil koordinat x dan y dari kepala ular

        if (this._direction === "LEFT") snakeX -= this.box;
        if (this._direction === "UP") snakeY -= this.box;
        if (this._direction === "RIGHT") snakeX += this.box;
        if (this._direction === "DOWN") snakeY += this.box;
        // mengubah koordinat kepala ular berdasarkan arah

        if (snakeX === food.position.x && snakeY === food.position.y) {
            eatCallback();// eatCallback adalah fungsi yang akan dipanggil jika ular memakan makanan.
        } else {
            this._body.pop();
        }

        let newHead = { x: snakeX, y: snakeY };
        this._body.unshift(newHead);
        // Menambahkan objek yang mewakili kepala baru ular ke bagian depan array _body.
    }

    checkCollision(canvas) { // bertanggung jawab bertabrakan dengan ular
        for (let i = 1; i < this._body.length; i++) {
            if (this._body[0].x === this._body[i].x && this._body[0].y === this._body[i].y) {
                return true; 
            }
        }

        return ( // bertabrakan dengan papan canvas
            this._body[0].x < 0 ||
            this._body[0].x >= canvas.width ||
            this._body[0].y < 0 ||
            this._body[0].y >= canvas.height
        );
    }
}

    // inheritance
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
        this.box = box; //  ukuran kotak makanan dan juga akan digunakan untuk menentukan posisi acak makanan.
        this._position = { x: Math.floor(Math.random() * 20) * this.box, y: Math.floor(Math.random() * 20) * this.box }; // Properti yang menyimpan posisi acak awal makanan.
    }

    
    get position() {
        return this._position;
    }

    draw(ctx) {
        ctx.fillStyle = "red"; // makanan ular
        ctx.fillRect(this._position.x, this._position.y, this.box, this.box);
    }

    generateNewPosition() { // Metode ini digunakan untuk menghasilkan posisi acak baru untuk makanan.
        this._position = { x: Math.floor(Math.random() * 20) * this.box, y: Math.floor(Math.random() * 20) * this.box };
    }
}

// Usage
const snakeGame = new SnakeGame();
console.log(snakeGame.snake.speed); 
snakeGame.snake.speed = 1; // Memberikan nilai 1 kepada properti speed dari objek snake yang ada dalam objek snakeGame.
