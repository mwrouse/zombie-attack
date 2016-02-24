
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
    main: document.getElementById('main-menu'),
    pause: document.getElementById('pause-menu')
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
  this._paused = false;

  // Prep the map

  map.spawnItems();

  document.getElementById('game').style.visibility = 'visible';
  document.getElementById('stats_bar').style.visibility = 'visible';

  this.menus.main.style.visibility = 'hidden';
  this.menus.pause.style.visibility = 'hidden';

  return this.isPlaying();
};



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

    this.menus.pause.style.visibility = (this.isPaused()) ? 'visible' : 'hidden';

  }

  return this.isPaused();
};


var game = new GameObj();





document.addEventListener('keydown', function(e)
{
  if (e.keyCode == Keys.esc)
  {
    e.preventDefault();
    game.pause();
  }

  if ((e.keyCode == Keys.q) && game.isPaused())
  {
    e.preventDefault();
    location.reload();
  }

  // This segment of code prevents the page from scrolling down if the player hits a directional key while the game is paused
  switch (e.keyCode)
  {
    // A/Left
    case Keys.a:
    case Keys.left:
    case Keys.w:
    case Keys.up:
    case Keys.d:
    case Keys.right:
    case Keys.s:
    case Keys.down:
    case Keys.space:
      e.preventDefault();
      break;
  }
});


document.getElementById('resume').addEventListener('click', function(e){
  if (game.isPaused())
  {
    game.pause();
  }
});

document.getElementById('quit').addEventListener('click', function(e){
  if (game.isPaused())
  {
    location.reload();
  }
});

document.getElementById('about-option').addEventListener('click', function(e){
  var info = document.getElementById('about-about');
  if (info.style.display == 'block')
  {
    info.style.display = 'none';
  }
  else {
    info.style.display = 'block';
    document.getElementById('controls-controls').style.display = 'none';
  }
});

document.getElementById('controls-option').addEventListener('click', function(e){
  var info = document.getElementById('controls-controls');
  if (info.style.display == 'block')
  {
    info.style.display = 'none';
  }
  else {
    info.style.display = 'block';
    document.getElementById('about-about').style.display = 'none';
  }
});
