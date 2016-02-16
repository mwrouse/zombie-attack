$(document).ready(function(){

var paused = false;
require_once('game.class');
require_once('coordinates.class');
require_once('screen.class.js');
require_once('map.class');
require_once('player.class');
require_once('timer.class');
require_once('zombie.class');



// Game Loop
setInterval(function(){
  if (!game.isPaused())
  {
    map.draw();
    player.draw();
    screen.flip();
  }
}, 1000 / game.FPS);



$(document).on('keydown', function(e){
  if (e.keyCode == 27)
  {
    game.pause();
  }
});





});
