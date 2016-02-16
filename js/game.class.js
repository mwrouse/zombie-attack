
/*
 * ===============================
 *        Game Object
 * ===============================
 * Represents current game state
 */
function GameObj()
{
  this._paused = false; // Starts off not paused, of course...

  this.FPS = 10; // Frames per second

  this.menus = {
    pause: $('#pause-menu')
  };
}

// Returns the current paused state
GameObj.prototype.isPaused = function()
{
  return this._paused;
};

// Pauses/Unpauses the game
GameObj.prototype.pause = function()
{
  this._paused = !this._paused;

  if (this.isPaused())
  {
    this.menus.pause.show();
  }
  else
  {
    this.menus.pause.hide();
  }

  return this.isPaused();
};


var game = new GameObj();
