/*
 * ===============================
 *      Game Timer Object
 * ===============================
 */
function TimerObj()
{
  // Timer Values
  var hours = 0;
  var minutes = 0;
  var seconds = 0;

  var paused = false;


  // Update the timer label
  function updateLabel() {
    var label = document.getElementById('timer_val');
    label.innerHTML = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);

  }

  // Updates the timer (ticks every second)
  this.update = function(){
    // Increase seconds
    seconds++;

    // Increase minutes if needed
    if (seconds >= 60)
    {
      seconds = (seconds % 60);
      minutes++;
    }

    // Increase hours if needed
    if (minutes >= 60)
    {
      minutes = (minutes % 60);
      hours++;
    }

    // Reset if needed
    if (hours >= 100)
    {
      hours = minutes = seconds = 0;
    }

    // Update the timer label
    updateLabel();
  };


  // Pause the timer
  this.pause = function(){paused = true;}

  // Unpause the timer
  this.unpause = function(){paused = false;}

}


var timer = new TimerObj();






function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}
