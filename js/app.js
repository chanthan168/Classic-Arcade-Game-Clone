'use strict';
let modal = document.querySelector('.modal');
let gameScore = document.querySelector('.score');
let resultScore = document.querySelector('.scoring');
let resultGame = document.querySelector('.resultGame');
let score = 0;
let startTime = Date.now();
let winTime;
let result = true;

// Enemies our player must avoid
let Enemy = function(x,y,speed) {
    // letiables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
   if (this.x > 550) {
       this.x = -100;
       this.speed = 100 + Math.floor(Math.random() * 512);
   }

   // Check for collision between player and enemies
   if (player.x >= this.x - 40 &&
       player.x <= this.x + 40 &&
       player.y >= this.y - 20 &&
       player.y <= this.y + 20) {
       player.x = 200;
       player.y = 380;

       //Gameover
       resultGame.innerHTML = 'Game over, you hit the bug!!!';
       modal.style.display = 'flex';
       result = false;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game

    if (this.y < 0) {
        this.x = 200;
        this.y = 380;

        // Scoring by second
        winTime = Math.floor((Date.now()-startTime)/1000);
        if (winTime <= 10){
          score +=50;
        }
        else if(winTime > 10 && winTime <=20){
          score +=20;
        }
        else {
          score +=10;
        }
        startTime = Date.now();

        //Game result
        resultGame.innerHTML = 'Congratulation!!!';
        resultScore.innerHTML = 'Your score : '+ score;
        modal.style.display = 'flex';
        result = false;
    }

    gameScore.innerHTML = score;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {

      if (result) {
        switch (keyPress) {
            case 'left':
                this.x -= this.speed + 50;
                break;
            case 'up':
                this.y -= this.speed + 30;
                break;
            case 'right':
                this.x += this.speed + 50;
                break;
            case 'down':
                this.y += this.speed + 30;
                break;
        }
    }
    else return false;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a letiable called player
let allEnemies = [];

// Position "y" where the enemies will are created
let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
