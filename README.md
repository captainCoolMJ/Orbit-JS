Orbit-JS
========

This is a javascript experiment to create orbit like movement around divs.

Create an orbit pattern with

    new Orbit(planetToOrbit, orbitingPlanet, configurationObject);

### Config Options
'distance' is the amount of pixels from the planet to orbit
'speed' is the angle increment value in degrees
'startAngle' is the start position of the planet

### Start
Start the orbit with instance.bigBang();

###Example

	var moonConfig = {
		distance: 50,
		speed: 2,
		startAngle: 45
	};

    var moon = new Orbit(earth, moon, moonConfig);
    moon.bigBang();
