# Sim Monitor Documentation

## Waveforms

**NOTE**: Waveforms only render inside of a canvas element!

### Fields and Properties

- `amplitude`: Controls the amplitude of the wave. It multiplies the y-axis values.
- `color` [optional]: The color value to set the waveform to in hexadecimal format.
- `cycle`: Sets the scale for when the wave is rendered in a container. A placeholder value that is used to establish the size of a waveform's single cycle within its container.
- `linear` [optional]: Causes the waveform to render in straight lines instead of curves.
- `name` [optional]: The display name of the waveform.
-`pathCoordinates`: An array of x-y coordinates that is used to draw the waveform's path. The first set of coordinates are the starting point of the wave in its parent container.

### Adding

You can add a custom waveform by creating the shape in JavaScript.
The waveform itself is defined in an array of x,y coordinates.
The entire grouping of coordinates is set by default to be one cycle.
The first set of coordinates is the start point, subsequesnt ones are x,y values that you add to the current x,y coordinates:
All coordinates are relative to the start point and the previous set of coordinates in the list.

#### Required Object Properties and Format

To create a waveform, declare a JavaScript object and ensure that the waveform object has the following fields: `amplitude`, `cycle`, `pathCoordinates`.
Other fields, like `color`, `linear`, and `name` are optional.

```JavaScript
let waveform = {
	amplitude: 1,
	color: '#eee',
	cycle: {
		length: 100,
		height: length*0.29
	},
	linear: true,
	name: 'NIBP',
	pathCoordinates: [
		//StartPoints
		[0,0],
		// PathCoordidates
		[2,95],
		[2,0],
		[2,-95],
		[10,0]
	]
}
```

The waveform coordinates are part of the overall waveform object.
Parameters such as curves, smoothness, and randomness are set with the waveform object and are applied when drawn to the canvas via the API.

### Implementing

To draw a waveform, declaure the object as shown in [the example](#required-object-properties-and-format).
If you prefer to simply draw the static waveform with no animation, call `renderWaveInCanvas`.
If you want an animated waveform, call the API's `animateWaveformContext` function with the first parameter as the waveform, the second parameter as the DOM canvas element, and the optional third parameter for setting the animation speed (in miliseconds):

```JavaScript
// Will apply the waveform inside of the canvas element. Safe-exits if not a canvas with a 2D context
animateWaveformContext(waveform, document.querySelector('canvas'), 30)
renderWaveInCanvas(waveform, document.querySelector('canvas'))
```

