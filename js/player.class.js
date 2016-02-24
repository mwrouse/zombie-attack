/*
 * ===============================
 *        Player Object
 * ===============================
 */

var Directions = {left: 0, right:1, up:2, down:3, idle:4};
/*
 * Player Class Object
 */
function PlayerObj()
{
  /*
   * Private variables
   */
  var _health = 100;     // Player's Health

  var _location = new Coordinates(); // Player's coordinates on the screen (pixels)

  var _width = 48; // Width of sprites (pixels)
  var _height = 66; // Height of sprites (pixels)

  var _moving = false; // True when character walking animations should show

  var _attacking = false; // True when character attacking animations should show

  var _direction = null; // Down is the starting direction

  var _speed = 8; // Character's speed (pixels)

  var _sprite = null; // Current sprite to show for the character



  /*
   * Public Variables
   */
  this.sprites = {
    // Sprites for left
    left: {
      // Idle sprite
      idle: new Sprite('player.left.idle.frame1'),

      // Walking sprites
      walking: {
        frame1: new Sprite('player.left.walking.frame1'),
        frame2: new Sprite('player.left.walking.frame2')
      },

      // Attacking sprites
      attacking: {
        frame1: new Sprite('player.left.attacking.frame1'),
        frame2: new Sprite('player.left.attacking.frame2')
      }

    },

    // Sprites for right
    right: {
      // Idle sprite
      idle: new Sprite('player.right.idle.frame1'),

      // Walking sprites
      walking: {
        frame1: new Sprite('player.right.walking.frame1'),
        frame2: new Sprite('player.right.walking.frame2')
      },

      // Attacking sprites
      attacking: {
        frame1: new Sprite('player.right.attacking.frame1'),
        frame2: new Sprite('player.right.attacking.frame2')
      }
    },

    // Sprites for up
    up: {
      // Idle sprite
      idle: new Sprite('player.up.idle.frame1'),

      // Walking sprites
      walking: {
        frame1: new Sprite('player.up.walking.frame1'),
        frame2: new Sprite('player.up.walking.frame2')
      },

      // Attacking sprites
      attacking: {
        frame1: new Sprite('player.up.attacking.frame1'),
        frame2: new Sprite('player.up.attacking.frame2')
      }
    },

    // Sprites for down
    down: {
      // Idle sprite
      idle: new Sprite('player.down.idle.frame1'),

      // Walking sprites
      walking: {
        frame1: new Sprite('player.down.walking.frame1'),
        frame2: new Sprite('player.down.walking.frame2')
      },

      // Attacking sprites
      attacking: {
        frame1: new Sprite('player.down.attacking.frame1'),
        frame2: new Sprite('player.down.attacking.frame2')
      }
    }
  };

  this.animationFrame = 0; // Current frame of an animation to show

  /*
   * Privileged Functions (Can access private variables)
   */

  // Accessors for private variables
  this.location = function() { return _location; };
  this.width = function() { return _width; };
  this.height = function() { return _height; };
  this.isMoving = function() { return _moving; };
  this.startMoving = function() { _moving = true; return true; };
  this.stopMoving = function() { _moving = false; return false; };
  this.isAttacking = function() { return _attacking; };
  this.attack = function()
  {
    this.animationFrame = (!_attacking) ? 1 : this.animationFrame;
    _attacking = true;
    return true;
  };
  this.direction = function() { return _direction; };
  this.speed = function() { return _speed; };
  this.sprite = function() { return _sprite; };

  // Accessor/mutator for palyer health
  this.health = function(hp_increase)
  {
    if (hp_increase !== undefined)
    {
      console.log(hp_increase);
      _health += hp_increase;
      if (_health > 100) { _health = 100; }
      this.updateHealth();
    }

    return _health;
  };


  /*
   * Do damage to the character
   */
  this.damage = function(amount)
  {
    // Make sure amount is negative
    if (amount > 0) { amount *= -1; }
    return this.health(amount);
  };


  /*
   * Returns Coordinates of different locations on the character
   */
  this.rightFoot = this.rightBottom = function()
  {
    return new Coordinates(this.location().x + this.width(), this.location().y + this.height());
  };
  this.leftFoot = this.leftBottom = function()
  {
    return new Coordinates(this.location().x, this.location().y + this.height());
  };
  this.centerFoot = this.centerBottom = function()
  {
    return new Coordinates(this.location().x + Math.round(this.width() / 2), this.location().y + this.height());
  };
  this.centerFootTop = this.center = function()
  {
    return new Coordinates(this.location().x + Math.round(this.width() / 2), this.location().y + Math.round(this.height() / 2));
  };


  /*
   * Updates the character's sprite for animation
   */
  this.updateSprite = function ()
  {
    // --------- Attacking Animation ---------
    if (this.isAttacking())
    {
      _attacking = (this.animationFrame != 0); // Update if the character is attacking

      switch (this.animationFrame)
      {
        case 0:
        case 1:
          _sprite = this.direction().idle;
          break;

        case 2:
        case 3:
          _sprite = this.direction().attacking.frame1;
          break;

        case 4:
        case 5:
          _sprite = this.direction().attacking.frame2;
          break;
      }

      // Advance to the next frame, or loop back to frame 0
      this.animationFrame += (this.animationFrame >= 5) ? (this.animationFrame * -1) : 1;

    }

    // --------- Walking Animation ---------
    else if (this.isMoving())
    {
      _sprite = (this.animationFrame == 0) ? this.direction().walking.frame1 : this.direction().walking.frame2;

      this.animationFrame = (this.animationFrame == 0) ? 1 : 0; // Advance to next frame or loop
    }

    // --------- Idle ---------
    else
    {
      _sprite = this.direction().idle;
      this.animationFrame = 0;
    }
  };


  /*
   * Move the character on the x axis
   */
  this.moveX = function(direction)
  {
    var speed = direction * this.speed();

    var foots = (direction == -1) ? this.leftFoot() : this.rightFoot();

    var movable = (direction == -1) ? (this.location().x <= (screen.width * 0.40)) : (this.location().x >= (screen.width * 0.40));

    // Make sure the next tile is valid
    _moving = map.validMove(foots.x + speed, foots.y);

    // Change the direction
    _direction = (direction == -1) ? this.sprites.left : this.sprites.right;

    if (this.isMoving())
    {
      // Move the map if possible
      if (movable)
      {
        var shifted = (direction == -1) ? map.shiftLeft(foots.x + speed, foots.y) : map.shiftRight(foots.x + speed, foots.y);

        if (shifted)
        {
          return;
        }
      }

      // Move character towards screen edge
      _location.x += speed;
    }
  };

  /*
   * Move character on the y axis
   */
  this.moveY = function(direction)
  {
    var speed = direction * this.speed();

    var side = (direction == -1) ? this.centerFootTop() : this.centerFoot();

    var condition = (direction == -1) ? (this.location().y <= (screen.height * 0.40)) : (this.location().y >= (screen.height * 0.40));

    // Make sure the next tile is valid
    _moving = map.validMove(side.x, side.y + speed);

    // Change the direction
    _direction = (direction == -1) ? this.sprites.up : this.sprites.down;

    if (this.isMoving())
    {
      // Move the map if possible
      if (condition)
      {
        var shifted = (direction == -1) ? map.shiftUp(side.x, side.y + speed) : map.shiftDown(side.x, side.y + speed);

        if (shifted)
        {
          return;
        }
      }
      // Move the character towards a screen edge
      _location.y += speed;
    }
  };







  /*
   * Constructor stuff
   */
  _direction = this.sprites.down;
  _sprite = _direction.idle;

  this.updateHealth();
}










/*
 * ===============================
 *        Public Methods
 * ===============================
 */



/*
 * Draw on buffer
 */
 PlayerObj.prototype.draw = function()
 {
  // Update the sprite
  this.updateSprite();
  this.sprite().draw(this.location().x, this.location().y);

  // Reset
  this.stopMoving();


 }


 /*
  * Move Left
  */
PlayerObj.prototype.moveLeft = function()
{
  return this.moveX(-1);
}

/*
 * Move Right
 */
PlayerObj.prototype.moveRight = function()
{
  return this.moveX(1);
}

/*
 * Move Up
 */
PlayerObj.prototype.moveUp = function()
{
  return this.moveY(-1);
};

/*
 * Move Down
 */
PlayerObj.prototype.moveDown = function()
{
  return this.moveY(1);
};





/*
 * Update health on the screen
 */
PlayerObj.prototype.updateHealth = function()
{
  //var lbl = document.getElementById('health_val');

  //lbl.innerHTML = this.health(); // Update the label
  //lbl.style.color = (this.health() > 70) ? '#088A08' : (this.health() > 40) ? '#C18C08' : '#DC2417';
};


/*
 * Pickup Items
 */
PlayerObj.prototype.pickup = function()
{
  var item = map.pickupItem(this.center().x, this.center().y);

  if (item != null)
  {
    // Increase health if the item was a health pack
    if (item == HEALTH_PACK)
    {

      this.health(rand(rand(10, 50), rand(50, 70))); // Random health between a random low number a random high number
    }
  }
};





















// The player object :)
var player = new PlayerObj();






// Keypress Binding for directional movement
document.addEventListener('keydown', function(e)
{
  if (!game.isPaused() && game.isPlaying())
  {
  	switch (e.keyCode)
  	{
      // A/Left
      case Keys.a:
  		case Keys.left:
        e.preventDefault();
  			player.moveLeft();
  			break;

      // W/Up
      case Keys.w:
  		case Keys.up:
        e.preventDefault();
  			player.moveUp();
  			break;

      // D/Right
      case Keys.d:
  		case Keys.right:
        e.preventDefault();
  			player.moveRight();
  			break;

      // S/Down
      case Keys.s:
  		case Keys.down:
        e.preventDefault();
  			player.moveDown();
  			break;

      // Attack
      case Keys.space:
        e.preventDefault();
        player.attack();
        break;

  	}
  }
});
