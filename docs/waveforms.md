# Sim Monitor Documentation

## Waveforms

### Adding

You can add a custom waveform by creating the shape in JavaScript.
The waveform itself is defined in an array of x,y coordinates.
The entire grouping of coordinates is set by default to be one cycle.
The first set of coordinates is the start point, subsequesnt ones are x,y values that you add to the current x,y coordinates:
All coordinates are relative to the start point and the previous set of coordinates in the list.

```JavaScript
let canvasWidth = 100
let canvasHeight = 100
let waveformPath = [
  // The starting x,y points in the canvas for the wave's cycle
  [0, canvasHeight/2],

  // The next coordinates that the path is drawn from the start point to
  [10, 0],    // Moves x 10 units to the right, no change in y; horizontal line
  [5, 20],    // Increases x 5 units, increases y 20 units; upward slope line
  [5, -40],   // Increases x 5 units, decreases y 40 units; downward slope line
  [10, 20],   // Increases x 10 units, increases y 20 units; upward slope line
  [20, 0]     // Increases x 20 units, no change in y; horizontal line
]
```

The waveform coordinates are part of the overall waveform object.
Parameters such as curves, smoothness, and randomness are set with the waveform object and are applied when drawn to the canvas via the API.
