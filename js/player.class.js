require_once('sprite.class');



var HIGH_HEALTH = '#088A08';
var MED_HEALTH = '#C18C08';
var LOW_HEALTH = '#DC2417';

var IDLE = 0;
var WALKING_DOWN = 1;

var Directions = { left: 0, right: 1, up: 2, down: 3, idle: 3};


/*
 * ===============================
 *        Player Object
 * ===============================
 */
function PlayerObj()
{
  // Player Stats
  var health = 100;

	// Player coordinates and movement
	this.location = new Coordinates();

	this.steps = 8; // Number of pixels to move per step

  // Player dimensions
  this.width = 48;
  this.height = 66;

  // True if player is walking
  this.walking = false;

  // Player orientation and animation
  this.direction = Directions.down;



  // True if the player is attacking
  this.attacking = false;


  // All the sprites for the player
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


  // Animation controls
  this.animation = {
    direction: this.sprites.down, // Direction to pull animation stuff from
    frame: 0                      // Current animation frame
  };


	// Player sprite
	this.sprite = this.animation.direction.idle;


  // Health Object
  this.health_lbl = $('#health_val');



  /* ==========================
       Privileged Methods
     ========================== */
  this.health = function(){ return health; }

  // Do damage to the character
  this.damage = function(amount){
    health -= amount;

    // Update the health label
    this.updateHealth();

    return health;
  }


  // ---------------------------------
  // Updates the sprite for animations
  // ---------------------------------
  this.updateSprite = function(){
    // ----------------------------
    //  Advance and show Animation
    // ----------------------------
    if (this.attacking)
    {
      // -------- Attacking Animation --------
      this.attacking = (this.animation.frame != 0);

      switch (this.animation.frame)
      {
        case 0:
        case 1:
          this.sprite = this.animation.direction.idle;
          break;

        case 2:
        case 3:
          this.sprite = this.animation.direction.attacking.frame1;
          break;

        case 4:
        case 5:
          this.sprite = this.animation.direction.attacking.frame2;
          break;
      }

      // Advance to the next frame
      this.animation.frame++;
      if (this.animation.frame > 5) { this.animation.frame = 0; }
    }

    else if (this.moving)
    {
      // -------- Walking Animation --------
      this.sprite = (this.animation.frame == 0) ? this.animation.direction.walking.frame1 : this.animation.direction.walking.frame2;
      this.animation.frame = (this.animation.frame == 0) ? 1 : 0; // Advance to the next frame on next draw
    }

    else
    {
      // -------- Idle --------
      this.sprite = this.animation.direction.idle;
      this.animation.frame = 0;
    }
  };



  // IS character centered?
  this.isCentered = function(){
    return ((this.location.x == (screen.width / 2)) && (this.location.y == (screen.height / 2))); }


  // Returns Coordinates of the center of the character
  this.center = function()
  {
    var new_location = new Coordinates(this.location.x, this.location.y);

    // Calculate the center
    new_location.x += Math.round(this.width / 2);
    new_location.y += Math.round(this.height / 2);

    return new_location;
  }
  // Returns the left center of a chacter
  this.leftCenter = function(){
    var new_location = new Coordinates(this.location.x, this.location.y);
    new_location.y += Math.round(this.height / 2);
    return new_location;
  }
  // Returns the right center of a character
  this.rightCenter = function(){
    var new_location = new Coordinates(this.location.x + this.width, this.location.y);
    new_location.y += Math.round(this.height / 2);
    return new_location;
  }
  // Returns the top center
  this.topCenter = function(){
    return new Coordinates(this.location.x + Math.round(this.width / 2), this.location.y);
  }
  // Returns the bottom center coordinates
  this.bottomCenter = function(){
    return new Coordinates(this.location.x + Math.round(this.width / 2), this.location.y + this.height);
  }



  // This will make the health display on load (constructor), from then on out it will only be updated when the player gets damage done to them
  this.updateHealth();




}





/*
 * ===============================
 *        Public Methods
 * ===============================
 */

/* ----------------
 *  Draw on Buffer
 * ---------------- */
PlayerObj.prototype.draw = function(){
  // Update the sprite
  this.updateSprite();
  this.sprite.draw(this.location.x, this.location.y);

  // Reset
  this.moving = false;
};



/* ----------------
 *    Move Left
 * ---------------- */
PlayerObj.prototype.moveLeft = function() {
  // Make sure the player has not moved off the screen and is a valid tile
  this.moving = (map.validMove(this.leftCenter().x - this.steps, this.leftCenter().y));

  // Make left the new direction
  this.direction = Directions.left;
  this.animation.direction = this.sprites.left;

  // Move map if possible
  if (this.location.x <= (screen.width * 0.40))
  {
    if (map.shiftLeft(this.leftCenter().x - this.steps, this.leftCenter().y))
    {
      return;
    }
  }

  if (this.moving)
  {
    this.location.x -= this.steps;
  }
};

/* ----------------
 *    Move Right
 * ---------------- */
PlayerObj.prototype.moveRight = function() {
  // Make sure that the location does not fall on a restricted tile
  this.moving = map.validMove(this.rightCenter().x + this.steps, this.rightCenter().y);

  // Make the character facing right
  this.direction = Directions.right;
  this.animation.direction = this.sprites.right;

  // Move the map if possible
  if ( this.location.x >= (screen.width - (screen.width * 0.40)) )
  {
    if (map.shiftRight(this.rightCenter().x , this.rightCenter().y))
    {
      return; // Map shifted, return (Note, that if the map senses the character will be in a restricted tile, it will still return true)
    }
  }

  // Move the character if the map did not shift
  if (this.moving)
  {
    this.location.x += this.steps;
  }
};

/* ----------------
 *    Move Up
 * ---------------- */
PlayerObj.prototype.moveUp = function() {
  // Make sure the player will be on the screen
  this.moving = (map.validMove(this.topCenter().x, this.topCenter().y - this.steps));

  // Character is going up
  this.direction = Directions.up;
  this.animation.direction = this.sprites.up;

  // Only move the map if the character is not out of range or stuff
  if (this.location.y <= (screen.height * 0.40))
  {
    if (map.shiftUp(this.topCenter().x, this.topCenter().y - this.steps))
    { return; }
  }


  // Map was not able to shift, move the player if possible
  if (this.moving)
  {
    this.location.y -= this.steps;
  }

};

/* ----------------
 *    Move Down
 * ---------------- */
PlayerObj.prototype.moveDown = function() {
  // Make sure the player will be on the screen
  this.moving = (map.validMove(this.bottomCenter().x, this.bottomCenter().y + this.steps));

  // Character is going down
  this.direction = Directions.down;
  this.animation.direction = this.sprites.down;

  // Only move the map if the character is in a range or something like that.
  if (this.location.y >= (screen.height - (screen.height * .40)))
  {

    if (map.shiftDown(this.bottomCenter().x, this.bottomCenter().y + this.steps))
    {
      this.moving = true;
      return;
    }
  }

  // Map was not able to shift, move the character
  if (this.moving)
  {
    this.location.y += this.steps;
    this.moving = true;
  }
};


/* ----------------
 *     Attack
 * ---------------- */
PlayerObj.prototype.attack = function(){
  if (!this.attacking)
  {
    this.animation.frame = 1; // Set animation number to zero
  }

  // Set the character as attacking
  this.attacking = true;
};








/* ----------------
 *  Set Health Value
 * ---------------- */
PlayerObj.prototype.updateHealth = function(){
  // Update the value
  this.health_lbl.html(this.health());

  // update the color of the text if needed
  if (this.health() > 70)
    this.health_lbl.css('color', HIGH_HEALTH);
  else if (this.health() > 40)
    this.health_lbl.css('color', MED_HEALTH);
  else
    this.health_lbl.css('color', LOW_HEALTH);
};







var player = new PlayerObj();








// Keypress Binding for directional movement
$(document).on('keydown', function(e){
  if (!game.isPaused())
  {
  	switch (e.keyCode)
  	{
      // A/Left
      case Keys.a:
  		case Keys.left:
  			player.moveLeft();
  			break;

      // W/Up
      case Keys.w:
  		case Keys.up:
  			player.moveUp();
  			break;

      // D/Right
      case Keys.d:
  		case Keys.right:
  			player.moveRight();
  			break;

      // S/Down
      case Keys.s:
  		case Keys.down:
  			player.moveDown();
  			break;

      // Attack
      case Keys.space:
        player.attack();
        break;

  	}
  }
});
