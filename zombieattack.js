var Keys = {
  w: 87,
  a: 65,
  s: 83,
  d: 68,
  up: 38,
  left: 37,
  down: 40,
  right: 39,
  space: 32,
  escape: 27,
  esc: 27
};

$(document).ready(function(){


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






});
