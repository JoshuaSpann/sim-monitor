let l = console.log
let waveformsHr = {
	sinus : {
		amplitude: 1,
		color: '#4f4',
		cycle: {
			length: 100, // use JS to convert this to segment in canvas
			height: length*0.29
		},
		name: 'HR Sinus',
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
	},
	avpaced : {
		amplitude: 1,
		color: '#4e4',
		cycle: {
			length: 100,
			height: length*0.29
		},
		name: 'AVP',
		pathCoordinates: [
			//StartPoints
			[0,0],
			// PathCoordidates
			[2,0],
			[0,-75],
			[1,75],
			[1,8],
			[1,-8],
			[3,-80],
			[2,80],
			[1,30],
			[8,-30],
			[20,0],
			[0,-75],
			[1,80],
			[1,-5],
			[7,10],
			[4,-10],
			[8,0]
		]
	},
	vfib : {
		amplitude: 1,
		color: '#4e4',
		cycle: {
			length: 50,
			height: length*0.29
		},
		name: 'VFib',
		pathCoordinates: [
			//StartPoints
			[0,0],
			// PathCoordidates
			[2,0],
			[7,14],
			[8,-26],
			[4,12],
			[4,0],
			[1,-8],
			[3,12],
			[6,2],
			[4,-6],
			[1,0],
			[14,20],
			[3,0],
			[5,-35],
			[7,15],
			[8,0]
		]
	},
	afib: {
		amplitude: 1,
		color: '#4e4',
		cycle: {
			length: 50,
			height: length*0.29
		},
		name: 'AFib',
		pathCoordinates: [
			// StartPoints
			[0,0],
			// PathCoordidates
			[7,0],
				[2,10],
				[4,-10],
				[1,3],
				[2,-3],
				[1,8],
				[2,-8],
				[1,16],
				[3,-16],
				[10,0],
				[1,16],
				[3,-16],
				[7,1],
				[3,-6],
			[3,5],
			[6,16],
				[10,-36],
			[4, 120],
				[16, -140],
			[6,40],
				[9,0],
			[6, 20],
				[6, -20],
			[2, 40],
				[1, -40],
				[1,16],
				[3,-16],
				[10,0],
				[1,16],
				[3,-16],
			[2,30],
				[1,-50],
			[4, 80],
				[10, -100],
				[8, 50],
				[20, -50],
				[6,40],
				[9,0],
			[8, 20],
				[19, -20],
				[7, 9],
				[10, -9],
				[5, 15],
				[12, -15],
				[7,0],
				[1,8],
				[2,-8],
				[1,16],
				[3,-16],
				[2,10],
				[4,-10],
				[10,0],
			[4, 120],
			[16, -120],
		]
	},
}

let oxygenWave = {
	amplitude: 1,
	color: '#4ee',
	curve: {
		smooth: 4,
		smoothX: 2,
		smoothY: 8,
	},
	cycle: {
		length: 100,
		height: length*0.29
	},
	name: 'SpO2',
	pathCoordinates: [
		//StartPoints
		[0,0],
		// PathCoordidates
		[23,0],
		[8,90],
		[3,-35],
		[2,-5],
		[5,-50],
		[6,0],
	]
}
let bpWave = {
	amplitude: 1,
	color: '#e44',
	curve: {
		smooth: 0.5,
	},
	cycle: {
		length: 100,
		height: length*0.29
	},
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
let rrWave = {
	amplitude: 1,
	color: '#eee',
	cycle: {
		length: 100,
		height: length*0.29
	},
	linear: true,
	name: 'RR',
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

let select = document.querySelector('#hrControl')

populateHrWaveformDropdown(select)
animateWaveformContext(oxygenWave, document.querySelector("[wav='o2']"))
animateWaveformContext(rrWave, document.querySelector("[wav='rr']"))
animateWaveformContext(bpWave, document.querySelector("[wav='bp']"))

// [{canvas, setIntervalHandleId}]
var waveformAnimationQueue = [];


/**
 * Renders and animates a waveform in the given canvas for the provided ms, defaults to 20ms
 **/
function animateWaveformContext(waveform, container, animationSpeed) {
	if (!container.getContext) return
	if (!animationSpeed) animationSpeed = 22 

	let c = container.getContext('2d')
	let currentPositionX = 0
	let intervalHandle = window.setInterval(()=>{
		c.clearRect(0,0, c.canvas.width, c.canvas.height)
		renderWaveInCanvas(waveform, container)
		drawVerticalLineAt(currentPositionX, c)
////		//currentPositionX+=3
		currentPositionX += c.canvas.width * 0.003
		if (currentPositionX >= c.canvas.width) {
			currentPositionX = 0
			c.moveTo(0,0)
		}
	}, animationSpeed)

	if (waveformAnimationQueue) {
		waveformAnimationQueue.push({canvas: container, intervalId: intervalHandle})
		for (let queue_i = 0; queue_i<waveformAnimationQueue.length; queue_i++) {
			let animationQueue = waveformAnimationQueue[queue_i]
			if (animationQueue.canvas = container && animationQueue.intervalId != intervalHandle) {
				window.clearInterval(animationQueue.intervalId)
				waveformAnimationQueue.splice(queue_i, 1)
			}
		}
	}
}


/**
 * Draws a thick vertical line at a location for animation purposes
 **/
function drawVerticalLineAt(xLocation, context, offset) {
	if (!offset) offset = 0

	let bgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color')
	let c = context
	let lineHeight = c.canvas.height
	let lineWidth = 20 + offset
	lineWidth = context.canvas.width * 0.015
	let oldStrokeStyle = c.strokeStyle

	//xLocation = xLocation / (context.canvas.width / 1.5) *5000

	c.beginPath()
	c.lineWidth = lineWidth
	oldStrokeStyle = c.strokeStyle
	c.strokeStyle = 'black'
	if (bgColor) c.strokeStyle = bgColor
	c.moveTo(xLocation, 0)
	c.lineTo(xLocation, lineHeight)
	c.stroke()
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
  
	for (let xy_i=1; xy_i<coordinates.length; xy_i++) {
		let xy = coordinates[xy_i]
		let x = xy[0]
		let y = xy[1]*waveform.amplitude
		let newX = xy_prev[0]+x
		let newY = xy_prev[1]-y

		// Will interpret values as EXACT PIXEL locations to draw and ignores assumed relative locations //
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
			xper(xy_prev[0]),
			yper(xy_prev[1])
		)
		if (waveform.linear && waveform.linear == true) {
			c.lineTo( xper(newX), yper(newY) )
		}
		else {
			let  curveStrength = [0,-2]
			let  xCurveStrength = curveStrength
			let yCurveStrength = [0,0]
			xCurveStrength = getCalculatedStrengthValues(waveform,'smoothX')
			yCurveStrength = getCalculatedStrengthValues(waveform,'smoothY')
			//ctrlPt1x, ctrlPt1y, cp2x, cp2y, x,y
			c.bezierCurveTo(
				// Control Points
				xper(newX-xCurveStrength[0]), yper(newY-yCurveStrength[0]),
				xper(newX-xCurveStrength[1]), yper(newY-yCurveStrength[1]),
				// Coordinates
				xper(newX), 
				yper(newY)
			)
		}

		// Values stored do not use exact locations to ensure that waveform path data keeps consistent //
		xy_prev = [newX,newY]
		xy_last = [newX,newY]
	}
	return xy_last
}

let stopLoopNum = 0
function getCalculatedStrengthValues(waveform, curveTargetXY) {
	let defaultStrength = [2,2]
	let defaultCurveStrengthX = [0,-2]
	let defaultCurveStrengthY = [0,0]

	if (!waveform.curve) return defaultStrength
	if (!curveTargetXY) curveTargetXY = 'smooth'

	let validCurveStrengthFields = ['smooth', 'smoothX', 'smoothY']
	for (let key in waveform.curve) {
		let currentCurveField = waveform.curve[key]
		if (!validCurveStrengthFields.includes(key)) {
			continue
		}

		if (key == curveTargetXY || key == 'smooth') {
			if (currentCurveField.length) {
				defaultStrength = currentCurveField
				continue
			}
			defaultStrength = [currentCurveField, currentCurveField]
		}
	}

	return defaultStrength
}


/**
 * Assigns select options from HR waveform with optional canvas to control
 **/
function populateHrWaveformDropdown(select, canvas) {
	if (!canvas) canvas = document.querySelector("[wav='hr']")

	let defaultOption = document.createElement('option')
	defaultOption.innerHTML = '--'
	defaultOption.value = null
	select.innerHTML = ''
	select.appendChild(defaultOption)

	for (let waveformHr in waveformsHr) {
		let option = document.createElement('option')
		option.value = waveformHr
		option.innerHTML = waveformsHr[waveformHr].name
		select.appendChild(option)
	}

	select.onchange = ()=> {
		setCanvasWaveToSelectValue(select, canvas)
	}
}

/**
 * Renders the waveform to the context, repeated by the numberOfCycles.
 **/
function renderWave(context, waveform, numberOfCycles) {
	context.beginPath()
	waveform.pathCoordinates[0] = [0,context._containerHeight/2]
	for (let phaseNumber = 0; phaseNumber<=numberOfCycles-2; phaseNumber++) {
		waveform.pathCoordinates[0] = drawWave(context, waveform)
	}
	drawWave(context, waveform)
	context.stroke()
}


/**
 * Draws the provided waveform in the given context.
 **/
function renderWaveInCanvas(waveform, container) {
	if (!container.getContext) return

	let c = container.getContext('2d')
	c._containerHeight = c.canvas.height
	c._containerWidth = c.canvas.width
	// TODO a- Remove need for numbers here and put idea into drawWave()
	setWaveformWidth(waveform, c.canvas.width)

	c.lineCap = 'round'
	c.lineJoin = 'round'
	let waveColor = '#44f'
	let waveStrength = 3
	if (waveform.color) waveColor = waveform.color
	if (waveform.strength) waveStrength = waveform.strength
	c.lineWidth = waveStrength * (container.offsetWidth / 800)
	c.strokeStyle = waveColor
	renderWave(c, waveform, 8)
	return c
}


/**
 * Sets the wave in a canvas based off of the select's value
 **/
function setCanvasWaveToSelectValue(select, canvas) {
	for (let waveId in waveformsHr) {
		if (select.value == waveId) {
			animateWaveformContext(waveformsHr[waveId], canvas)
		} 
	}
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

setTimeout(()=> {
	let select = document.querySelector('#hrControl')
	select.selectedIndex = 1
	setCanvasWaveToSelectValue(select, document.querySelector("[wav='hr']"))
}, 100)
