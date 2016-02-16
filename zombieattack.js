$(document).ready(function(){

var paused = false;
require_once('game.class');
require_once('coordinates.class');
require_once('screen.class.js');
require_once('map.class');
require_once('player.class');
require_once('timer.class');
require_once('zombie.class');



// General variables
var FPS = 10;

console.log(game.isPaused());
// Game Loop
setInterval(function(){
  if (!game.isPaused())
  {
    map.draw();
    player.draw();
    screen.flip();
  }
}, 1000 / FPS);



$(document).on('keydown', function(e){
  if (e.keyCode == 27)
  {
    game.pause();
  }
});





});
