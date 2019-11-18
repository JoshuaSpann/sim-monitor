# Sim Monitor Documentation

## Waveform Controls

Waveforms are managed through the `waveformControls` API.


### Putting a Waveform into a Canvas

Use `animateWaveformContext` to display an animatable waveform in a canvas.
The two ***required*** parameters are:
- `waveform`: A valid `waveform` object (see [waveforms](waveforms.md#required-object-properties-and-format))
- `container`: A valid DOM `canvas` element

There are optional parameters as well:
- `animationSpeed`: How many milliseconds to draw frames, defaults to 22ms


### Setting a `<select>` Dropdown to be Parent to a `<canvas>`

Use `populateWaveformDropdown()` to populate a dropdown with a section of waveforms, then set the dropdown to control a canvas.
The ***required*** parameters are:
- `select`: The DOM `select` element that will be populated with the waveforms from the given object
- `waveforms`: A JSON object with any number of unique, appropriate objects within it
- `canvas`: The target DOM `canvas` element that the `select` will control

Use `setCanvasWaveToSelectValue()` to set the canvas element to draw the given waveform.
The ***required*** parameters are:
- `select`: The dropdown that has had its value changed
- `waveforms`: The waveforms to compare and set the proper wave to the canvas
- `canvas`: The target canvas to set the custom waveform to


### Animation Queue

The waveform animation queue is an array that stores all running animation jobs that are currently active.
It is accessed through `waveformAnimationQueue` and is called whenever a new waveform is set to be in a container.
The check ensures that there will not be separate, multiple waveforms competing to display on a single canvas.

Each item in the animation queue is a JSON object.
A queue object holds the canvas the timeout animation is set to and the id that is used to access and control the timeout event.
The queue object ***requires*** the following fields:
- `canvas`: The canvas container that the animation is set to
- `intervalId`: The ID returned by `setTimeout()` that is used to stop the animation event

A valid example of an animation queue object:
```JavaScript
let timeoutId = window.setTimeout(.....)

let queueJson = {
	canvas: document.querySelector('canvas'),
	intervalId: timeoutId
}

waveformAnimationQueue.push(queueJson)
```

At any time you may access `waveformAnimationQueue` and use it to clear animations with `window.clearInterval()`.
Just remember to remove the queue JSON when you do!
