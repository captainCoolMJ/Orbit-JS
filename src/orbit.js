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

	var defaultAngle = options.startAngle || 0;

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
	this.refAngle = defaultAngle;

	// Calculate the next position of the planets
	this.calculatePosition = function() {

		// Make sure the count resets after a full cycle
		this.refAngle = this.refAngle <= defaultAngle + 360 ? this.refAngle : defaultAngle;

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
