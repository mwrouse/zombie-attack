
var Keys = {
  w: 87,
  a: 65,
  s: 83,
  d: 68,
  q: 81,
  up: 38,
  left: 37,
  down: 40,
  right: 39,
  space: 32,
  escape: 27,
  esc: 27
};

$(document).ready(function(){

  // Game Loop
  setInterval(function(){
    if (!game.isPaused() && game.isPlaying())
    {
      player.pickup();
      map.draw();
      player.draw();
      screen.flip();

    }
  }, 1000 / game.FPS);


  $('li[action=play]').on('click', function(){
    game.play();
  });

});



function rand(LOW, HIGH)
{
  return Math.floor((Math.random() * (HIGH - LOW + 1)) + LOW);
}
