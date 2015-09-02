// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x ? x : 0;
    this.y = y ? y : 63;
    this.speed = speed ? speed : 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
        //use in collision detection
    this.boundx = this.x + 0;
    this.boundy = this.y + 75;
    this.boundwidth = 100;
    this.boundheight = 75;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    this.boundx = this.x;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.initialx = 200;
    this.initialy = 400;
    this.x = this.initialx;
    this.y = this.initialy;
    this.stars = [];
    this.sprite = 'images/char-boy.png';

    //use in collision detection
    this.boundx = this.x + 15;
    this.boundy = this.y + 60;
    this.boundwidth = 70;
    this.boundheight = 80;

    this.canMoveLeft = true;
    this.canMoveRight = true;
    this.canMoveUp = true;
    this.canMoveDown = true;
};

Player.prototype.update = function(dx,dy){
    if(dx && typeof(dx) === 'number' && dx<0 && this.canMoveLeft)
        this.x += dx;
    if(dx && typeof(dx) === 'number' && dx>0 && this.canMoveRight)
        this.x += dx;
    if(dy && typeof(dy) === 'number' && dy<0 && this.canMoveUp)
        this.y += dy;
    if(dy && typeof(dy) === 'number' && dy>0 && this.canMoveDown)
        this.y += dy;
    this.boundx = this.x + 15;
    this.boundy = this.y + 60;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.getHeight = function(){
    return this.height;
};

Player.prototype.reset = function(){
    console.log("player reset: initialx:"+ this.initialx + " initialy:"+this.initialy);
    this.x = this.initialx;
    this.y = this.initialy;
    this.stars = [];
};

Player.prototype.handleInput = function(key){
    switch(key){
        case 'up':
            this.update(0,-20);
            break;
        case 'down':
            this.update(0,20);
            break;
        case 'left':
            this.update(-20,0);
            break;
        case 'right':
            this.update(20,0);
            break;
    }
};


var Star = function(x,y){
    this.eaten = false;
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
         //use in collision detection
    this.boundx = this.x + 5;
    this.boundy = this.y + 55;
    this.boundwidth = 90;
    this.boundheight = 95;
};

Star.prototype.update = function(eaten){
    this.eaten = eaten;
};

Star.prototype.render = function(){
    if(!this.eaten)
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};



var Message = function(message,x,y){
    this.x = x;
    this.y = y;
    this.message = message;
};
Message.prototype.update = function(message,x,y){
    this.x = x;
    this.y = y;
    this.message = message;
};
Message.prototype.render = function(){
    ctx.font = "80px Georgia";
    ctx.strokeText(this.message,this.x,this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
this.player = new Player();
this.allEnemies = [];
this.allItems = [];
this.allMessages = [];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
