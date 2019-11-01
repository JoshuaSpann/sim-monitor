let l = console.log
let sinusRhythm = {
	amplitude: 1,
	color: '#4f4',
	cycle: {
		length: 100, // use JS to convert this to segment in canvas
		height: length*0.29
	},
	linear: false,
	name: 'Sinus',
	pathCoordinates: [
		//StartPoints
		[0,0],
		//RelativeLineDrawing (Add x-px, Add y-px)
		[23,0],
	// Wave Peak #1
		[6,16],
		[6,-36],
	// Wave Peak #2
		[2, 120],
		[2, -140],
	// Wave balance
		[6,40],
		[9,0],
	// Wave peak #3
		[6, 20],
		[6, -20],
	// Wave Balance-end
		[34,0]
	]
}
let oxygenRhythm = {
	amplitude: 1,
	color: '#4ee',
	cycle: {
		length: 100,
		height: length*0.29
	},
	name: 'Oxygen',
	pathCoordinates: [
		//StartPoints
		[0,0],
		// PathCoordidates
		[23,0],
		[8,100],
		[3,0],
		[4,-20],
		[3,0],
		[4,-10],
		[6,-70],
		[6,0],
	]
}
let bpRhythm = {
	amplitude: 1,
	color: '#e44',
	cycle: {
		length: 100,
		height: length*0.29
	},
	//linear: true,
	name: 'NIBP',
	pathCoordinates: [
		//StartPoints
		[0,0],
		// PathCoordidates
		[2,95],
		[2,-25],
		[2,-45],
		[2,15],
		[8,-40],
	]
}
let rrRhythm = {
	amplitude: 1,
	color: '#eee',
	cycle: {
		length: 100,
		height: length*0.29
	},
	//linear: true,
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


renderWaveInCanvas(sinusRhythm, document.querySelector("[wav='hr']"))
renderWaveInCanvas(oxygenRhythm, document.querySelector("[wav='o2']"))
renderWaveInCanvas(rrRhythm, document.querySelector("[wav='rr']"))
renderWaveInCanvas(bpRhythm, document.querySelector("[wav='bp']"))


/**
 * Draws the provided waveform in the given context.
 **/
function renderWaveInCanvas(waveform, container) {
	if (!container.getContext) return

	let c = container.getContext('2d')
	c._containerHeight = container.offsetHeight
	c._containerWidth = container.offsetWidth
	// TODO a- Remove need for numbers here and put idea into drawWave()
	setWaveformWidth(waveform, container.offsetWidth/5)

	c.lineCap = 'round'
	c.lineJoin = 'round'
	let waveColor = '#44f'
	let waveStrength = 2
	if (waveform.color) waveColor = waveform.color
	if (waveform.strength) waveStrength = waveform.strength
	c.lineWidth = waveStrength
	c.strokeStyle = waveColor
	renderWave(c, waveform, 5)
}



/**
 * Adjusts waveform's total width to a given value
 **/
function setWaveformWidth(waveform, value) {
	let maxX= 0
	for (let i=0; i<waveform.pathCoordinates.length; i++) {
		maxX+= waveform.pathCoordinates[i][0]
	}
	waveform.cycle.length = (value/maxX)*100
}

/**
 * Renders the waveform to the context, repeated by the numberOfCycles.
 **/
function renderWave(context, waveform, numberOfCycles) {
	context.beginPath()
	// TODO a- Let the waveform fill the whole container and let iterations fill up the whole container with cycles number
	let repeatPhaseBy = numberOfCycles
	waveform.pathCoordinates[0] = [0,context._containerHeight/2]
	for (let phaseNumber = 1; phaseNumber<=repeatPhaseBy; phaseNumber++) {
		//if (phaseNumber > 1) waveform.amplitude /=phaseNumber
		waveform.pathCoordinates[0] = drawWave(context, waveform)
	}
	context.stroke()
}

/**
 * Plots the coordinate points to the context from the waveform.
 * useExactCoordinates can be used to draw the coordinates as exact values instead of relative.
 * Returns the relative, non-exact, coordinates for usage with looping.
 **/
function drawWave(context, waveform, useExactCoordinates) {
	let c = context
	let coordinates = waveform.pathCoordinates
	let xy_prev = coordinates[0]
	let xy_last = xy_prev
  
	for (let xy_i in coordinates) {
		if (isNaN(xy_i) || xy_i == 0) continue

		let xy = coordinates[xy_i]
		let x = xy[0]
		let y = xy[1]*waveform.amplitude
		let newX = xy_prev[0]+x
		let newY = xy_prev[1]-y

		// Will interpret values as EXACT PIXEL locations to draw to and ignores assumed relative locations //
		if (useExactCoordinates) {
			newX = x
			newY = y
		}

		// Calculate the exact point location in canvas from relative (percent-based) drawing coordinates //
		let xper = (x, log)=> {
			let val = waveform.cycle.length*(x/100)
			if (log) l('x: '+x+' '+val)
			return val
		}
		let yper = (y, log)=> {
			let val = waveform.cycle.height*(y/100)
			if (log) l('y: '+y+' '+val)
			return y
		}

		// Placing the coordinates uses the exact values from the calculations //
		c.moveTo(
			xper(xy_prev[0], true), 
			yper(xy_prev[1], true)
		)
		if (waveform.linear && waveform.linear == true) {
			c.lineTo( xper(newX), yper(newY) )
		}
		else
		//ctrlPt1x, ctrlPt1y, cp2x, cp2y, x,y
		c.bezierCurveTo(
			// Control Points
			xper(newX-0), yper(newY+0),
			xper(newX-2), yper(newY-0),
			// Coordinates
			xper(newX), 
			yper(newY)
		)

		// Values stored do not use exact locations to ensure that waveform path data keeps consistent //
		xy_prev = [newX,newY]
		xy_last = [newX,newY]
	}
	return xy_last
}

