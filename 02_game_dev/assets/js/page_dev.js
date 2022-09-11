const $canvas = document.querySelector('#canvas_dev');
const _ctx = $canvas.getContext('2d');

$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;

// Load Images
const image = {};

image.player = new Image();
image.player.src = '/02_game_dev/assets/images/cuphead.png';

const numOfCharacters = 10;
const characterActions = ['up', 'right', 'down', 'up right', 'down right'];

class Characters {
    constructor() {
        this.width = 103.0625;
        this.height = 113.125;

        this.x = Math.random() * $canvas.width;
        this.y = Math.random() * $canvas.height;
        this.speed = Math.random() * 3.5 + 1.5;
        this.action =
            characterActions[
                Math.floor(Math.random() * characterActions.length)
            ];

        this.frameX = 3;
        this.minFrame = 0;
        this.maxFrame = 15;

        if (this.action == 'right') {
            this.frameY = 3;

            this.minFrame = 3;
            this.maxFrame = 13;
        } else if (this.action == 'up') {
            this.frameY = 0;

            this.minFrame = 3;
            this.maxFrame = 15;
        } else if (this.action == 'down') {
            this.frameY = 6;

            this.minFrame = 0;
            this.maxFrame = 12;
        } else if (this.action == 'up right') {
            this.frameY = 1;

            this.minFrame = 2;
            this.maxFrame = 14;
        } else if (this.action == 'down right') {
            this.frameY = 4;

            this.minFrame = 4;
            this.maxFrame = 15;
        }
    }

    draw() {
        _ctx.drawImage(
            image.player,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
    }

    setAnimation() {
        if (this.action == 'right') {
            if (this.x < $canvas.width + this.width) {
                this.x += this.speed;
            } else {
                this.x = 0 - this.width;
                this.y = Math.random() * ($canvas.height - this.height);
            }
        } else if (this.action == 'up') {
            if (this.y > 0 - this.height) {
                this.y -= 1.5 * this.speed;
            } else {
                this.y = $canvas.height + this.height;
                this.x = Math.random() * ($canvas.width - this.width);
            }
        } else if (this.action == 'down') {
            if (this.y < $canvas.height + this.height) {
                this.y += this.speed;
            } else {
                this.y = 0 - this.height;
                this.x = Math.random() * ($canvas.width - this.width);
            }
        } else if (this.action == 'up right') {
            if (
                this.x < $canvas.width + this.width &&
                this.y > 0 - this.height
            ) {
                this.x += this.speed;
                this.y -= this.speed;
            } else if (this.x >= $canvas.width + this.width) {
                this.x = 0 - this.width;
                this.y = Math.random() * ($canvas.height - this.height);
            } else if (this.y <= 0 - this.height) {
                this.y = $canvas.height + this.height;
                this.x = Math.random() * ($canvas.width - this.width);
            }
        } else if (this.action == 'down right') {
            if (
                this.x < $canvas.width + this.width &&
                this.y < $canvas.height + this.height
            ) {
                this.x += this.speed;
                this.y += this.speed;
            } else if (this.x >= $canvas.width + this.width) {
                this.x = 0 - this.width;
                this.y = Math.random() * ($canvas.height - this.height);
            } else if (this.y >= $canvas.height + this.height) {
                this.y = 0 - this.height;
                this.x = Math.random() * ($canvas.width - this.width);
            }
        }
    }
}

let characters = [];

for (let i = 0; i < numOfCharacters; i++) {
    characters.push(new Characters());
}

function animate() {
    _ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    for (let i = 0; i < characters.length; i++) {
        characters[i].draw();
        characters[i].update();
        characters[i].setAnimation();
    }

    // requestAnimationFrame(animate);
}
// animate(); => 개빠름. requestAnimationFrame는 속도 조절 안 됨.
window.onload = setInterval(animate, 1000 / 25);

window.addEventListener('resize', function () {
    $canvas.width = window.innerWidth;
    $canvas.height = window.innerHeight;
});
