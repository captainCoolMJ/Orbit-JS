/**********************************************************************
*
* ORBIT.JS - v0.4
*
*======================================================================
*
* MIT License (MIT)
*
* Copyright (c) 2014 Matt Jennings
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
*=======================================================================
*
*
*
************************************************************************/
var Orbit = (function(planet, moon, options) {
	'use strict';

	this.defaultAngle = options.startAngle || 0;

	this.animationInterval = undefined;

	// set elements
	this.planet = {
		el: planet,
		x: planet.offsetLeft,
		y: planet.offsetTop,
		center: planet.offsetHeight/2
	};

	this.moon = {
		el: moon,
		center: moon.offsetHeight/2
	};

	// set default options
	this.distance = options.distance || 10;
	this.speed = options.speed || 1;
	this.refAngle = this.defaultAngle;

	// Calculate the next position of the planets
	this.calculatePosition = function() {

		// Make sure the count resets after a full cycle
		this.refAngle = this.refAngle <= this.defaultAngle + 360 ? this.refAngle : this.defaultAngle;

		// Convert to radians and calculate x and y values
		var refRadians = this.refAngle * (Math.PI/180);
		var xPos = Math.round(Math.sin(refRadians) * this.distance);
		var yPos = Math.round(Math.cos(refRadians) * this.distance);

		// Update x and y based on new offsets
		this.planet.x = this.planet.el.offsetLeft;
		this.planet.y = this.planet.el.offsetTop;

		// Put it all together
		var leftPos = Math.round(xPos + this.planet.x + this.planet.center - this.moon.center),
			topPos = Math.round(yPos + this.planet.y + this.planet.center - this.moon.center);

		// Update DOM element with new value
		this.moon.el.style.left = leftPos + "px";
		this.moon.el.style.top = topPos + "px";
		
		// Increment the angle based on speed
		this.refAngle = this.refAngle + this.speed;

	};

});

// Sets a cycle animation with a 24fps frame rate
Orbit.prototype.bigBang = function() {

	this.animationInterval = setInterval(this.calculatePosition.bind(this), 24);
	
};

// Moves one calculation at a time
Orbit.prototype.step = function() {

	clearInterval(this.animationInterval);
	this.calculatePosition();

};

// Pauses the animation at the current position
Orbit.prototype.pause = function() {

	clearInterval(this.animationInterval);

};
