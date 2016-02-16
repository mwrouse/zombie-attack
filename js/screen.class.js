
/* 
 * ===============================
 *        Screen Object
 * ===============================
 */
function ScreenObj()
{
	this.doms = {
		main: document.getElementById('game'),
		buffer: document.createElement('canvas')
	};
	
	this.main = this.doms.main.getContext('2d'), 	// Main page (what the user sees)
	this.buffer = this.doms.buffer.getContext('2d'),  // Buffer page (will be moved to the main page, then cleared)
	
	
	this.width = this.doms.buffer.width = this.doms.main.width = window.innerWidth;
	this.height = this.doms.buffer.height = this.doms.main.height = (window.innerHeight - 100);


}


/* 
 * ===============================
 *        Public Methods 
 * ===============================
 */
ScreenObj.prototype.flip = function(){
	this.main.clearRect(0, 0, this.doms.main.width, this.doms.main.height); // Clear the main page 
	this.main.drawImage(this.doms.buffer, 0, 0, this.doms.buffer.width, this.doms.buffer.height); // Move the buffer contents to the main page 
	this.buffer.clearRect(0, 0, this.doms.buffer.width, this.doms.buffer.height); // Clear the buffer
};



// Create an instance of a screen object for use 
var screen = new ScreenObj();