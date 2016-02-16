
/*
 * ===============================
 *        Game Object
 * ===============================
 * Represents current game state
 */
function GameObj()
{

  this._playing = false; // Start off not playing (main menu)


  this._paused = false; // Starts off not paused, of course...

  this.FPS = 10; // Frames per second

  this.menus = {
    main: $('#main-menu'),
    pause: $('#pause-menu')
  };
}


// Returns if the game is currently playing or not
GameObj.prototype.isPlaying = function()
{
  return this._playing;
};

// Start playing
GameObj.prototype.play = function()
{
  this._playing = true;

  // Prep the map

  map.spawnItems();

  $('#game').show();
  $('#stats_bar').show();

  this.menus.main.hide();

  return this.isPlaying();
}



// Returns the current paused state
GameObj.prototype.isPaused = function()
{
  return this._paused;
};

// Pauses/Unpauses the game
GameObj.prototype.pause = function()
{
  // Only allow pausing if the game is in progress
  if (this.isPlaying())
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
  }

  return this.isPaused();
};


var game = new GameObj();





$(document).on('keydown', function(e){
  console.log(e.keyCode);
  if (e.keyCode == Keys.esc)
  {
    game.pause();
  }

  if ((e.keyCode == Keys.q) && game.isPaused())
  {
    location.reload();
  }
});
