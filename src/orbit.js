/**********************************************************************
*
* ORBIT.JS - v0.3
*
*======================================================================
*
*            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
*                    Version 2, December 2004
*
* Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
*
* Everyone is permitted to copy and distribute verbatim or modified
* copies of this license document, and changing it is allowed as long
* as the name is changed.
*
*            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
*   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
*
* 0. You just DO WHAT THE FUCK YOU WANT TO.
*
*=======================================================================
*
*
*
************************************************************************/
var Orbit = (function(planet, moon, options) {
	'use strict';

	var self = this,
		animationInterval,
		defaultAngle = options.startAngle || 0;

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
	this.refAngle = defaultAngle;

	// Calculate the next position of the planets
	var calculatePosition = function() {

		// Make sure the count resets after a full cycle
		self.refAngle = self.refAngle <= defaultAngle + 360 ? self.refAngle : defaultAngle;

		// Convert to radians and calculate x and y values
		var refRadians = self.refAngle * (Math.PI/180);
		var xPos = Math.round(Math.sin(refRadians) * self.distance);
		var yPos = Math.round(Math.cos(refRadians) * self.distance);

		// Update x and y based on new offsets
		self.planet.x = self.planet.el.offsetLeft;
		self.planet.y = self.planet.el.offsetTop;

		// Put it all together
		var leftPos = Math.round(xPos + self.planet.x + self.planet.center - self.moon.center),
			topPos = Math.round(yPos + self.planet.y + self.planet.center - self.moon.center);

		// Update DOM element with new value
		self.moon.el.style.left = leftPos + "px";
		self.moon.el.style.top = topPos + "px";
		
		// Increment the angle based on speed
		self.refAngle = self.refAngle + self.speed;

	};

	// Sets a cycle animation with a 24fps frame rate
	this.bigBang = function() {

		animationInterval = setInterval(calculatePosition, 24);

	};

	// Moves one calculation at a time
	this.step = function() {

		clearInterval(animationInterval);
		calculatePosition();

	};

	// Pauses the animation at the current position
	this.pause = function() {

		clearInterval(animationInterval);

	};

	return {
		bigBang : this.bigBang,
		step : this.step,
		pause : this.pause,
	};

});