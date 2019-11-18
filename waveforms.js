let l = console.log
let Waveforms = {}

Waveforms.Hr = {
	sinus : {
		amplitude: 1,
		color: '#4f4',
		cycle: {
			length: 100, // use JS to convert this to segment in canvas
			height: length*0.29
		},
		name: 'Sinus (Lead II)',
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
Waveforms.O2 = {
	normal: {
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
		name: 'Normal',
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
	},
	small_and_weak: {
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
		name: 'Small and Weak',
		pathCoordinates: [
			//StartPoints
			[0,0],
			// PathCoordidates
			[23,0],
			[8,40],
			[3,-15],
			[1,5],
			[2,-10],
			[9,-20],
			[6,0],
		]
	},
	large_and_bounding: {
		amplitude: 1,
		color: '#4ee',
		curve: {
			smooth: 4,
			smoothX: 2,
			smoothY: 0,
		},
		cycle: {
			length: 100,
			height: length*0.29
		},
		name: 'Large and Bounding',
		pathCoordinates: [
			//StartPoints
			[0,0],
			// PathCoordidates
			[23,0],
			[8,90],
			[10,-65],
			[8,-10],
			[16,-15],
			[6,0],
		]
	},
	pulsus_alternase: {
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
			//TODO - cycle.span to make the wave cover x cycles in canvas! For complex waves like this, set 2 to stretch out over 2 cycles
		},
		name: 'Pulsus Alternanse',
		pathCoordinates: [
			//StartPoints
			[0,0],
			// PathCoordidates
			[13,0],
			[8,90],
			[3,-35],
			[2,-5],
			[5,-50],
			[6,0],
			// PathCoordidates
			[13,0],
			[8,70],
			[3,-35],
			[2,-5],
			[5,-30],
			[6,0],
		]
	},
	no_dicrotic_notch: {//TODO
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
		name: 'No Dicrotic Notch',
		pathCoordinates: [
			//StartPoints
			[0,0],
			// PathCoordidates
			[23,0],
			[8,40],
			[3,-15],
			[1,5],
			[2,-10],
			[9,-20],
			[6,0],
		]
	},
	chaotic: {//TODO
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
		name: 'Chaotic',
		pathCoordinates: [
			//StartPoints
			[0,0],
			// PathCoordidates
			[23,0],
			[8,40],
			[3,-15],
			[1,5],
			[2,-10],
			[9,-20],
			[6,0],
		]
	},

}
Waveforms.Bp = {
	normal: {
		amplitude: 1,
		color: '#e44',
		curve: {
			smooth: 0.5,
		},
		cycle: {
			length: 100,
			height: length*0.29
		},
		name: 'Normal',
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
	},
}
Waveforms.Rr = {
	normal: {
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
	},
}
