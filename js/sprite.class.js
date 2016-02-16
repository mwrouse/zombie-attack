require_once('screen.class');


/* 
 * ===============================
 *        Sprite Object
 * ===============================
 */
function Sprite(img_url, s_width, s_height)
{
  // Properties
  var url = (img_url === undefined) ? '' : img_url.replace(/\./gi, '/');
  var width = (s_width === undefined) ? 64 : s_width;
  var height = (s_height === undefined) ? 64 : s_width;
  
  // Create the image object
  var img = new Image();
  img.src = 'img/' + url + '.png';

  
  /* ==========================
       Privileged Methods
     ========================== */
  this.url = function() { return url; }
  this.width = function() { return width; }
  this.height = function() { return height; }
  
  // Place the sprite on the buffer 
  this.draw = function(x, y){
    screen.buffer.drawImage(img, x, y);
  };
}