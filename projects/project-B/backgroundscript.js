console.log('background script loaded');

//receive inputs from content script

//check mode

//if in instant playback mode, immediately play sounds

//if in history mode, record the input along with timestamps

let currentDrumState = "off";
let currentMode = "live";

const now = Tone.now();

let phaserDryWet = .4;
let currentStep = 2;

let mouseCounter = 0;

let previousY = 0;
let previousScrollHeight = 0;

let bendCounter = 0;
let bendingActive = 0;

let octaveFloor = 3;
let octaveCeiling = 5;


let recorder = new Tone.Recorder();


const phaser = new Tone.Phaser({
	frequency: 15,
	octaves: 2,
	baseFrequency: 1000,
  wet: phaserDryWet
}).toDestination();

const freeverb = new Tone.Freeverb().toDestination();
freeverb.dampening = 4000;


const chordSynth = new Tone.PolySynth().toDestination();
chordSynth.set({
  volume: 0.5,
  envelope: {
    attack: 3,
    decay: 2,
    release: 4
  }
}).connect(phaser).connect(freeverb).connect(recorder);


const mouseSynth = new Tone.Synth().toDestination();
mouseSynth.set({
  volume: 0.2,
  envelope: {
    attack: 0.1,
    decay: 0
    // release: 2
  }
}).connect(phaser).connect(freeverb).connect(recorder);

const bendSynth = new Tone.Synth().toDestination();
bendSynth.set({
  volume: 0.075,
  envelope: {
    attack: 15,
    decay: 10,
    release: 6
  }
}).connect(freeverb).connect(recorder);

recorder.start();


chordSynth.volume.value = -30;
bendSynth.volume.value = -30;
mouseSynth.volume.value = -30;


//musical scale arrays
let scale_C_Major = ["C", "D", "E", "F", "G", "A", "B"];
let scale_Db_Major = ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"];
let scale_D_Major = ["D", "E", "F#", "G", "A", "B", "C#"];
let scale_Eb_Major = ["Eb", "F", "G", "Ab", "Bb", "C", "D"];
let scale_E_Major = ["E", "F#", "G#", "A", "B", "C#", "D#"];
let scale_F_Major = ["F", "G", "A", "Bb", "C", "D", "E"];
let scale_Fsharp_Major = ["F#", "G#", "A#", "B", "C#", "D#", "F"];
let scale_G_Major = ["G", "A", "B", "C", "D", "E", "F#"];
let scale_Ab_Major = ["Ab", "Bb", "C", "Db", "Eb", "F", "G"];
let scale_A_Major = ["A", "B", "C#", "D", "E", "F#", "G#"];
let scale_Bb_Major = ["Bb", "C", "D", "Eb", "F", "G", "A"];
let scale_B_Major = ["B", "C#", "D#", "E", "F#", "G#", "A#"];
let scale_C_Minor = ["C", "D", "Eb", "F", "G", "Ab", "Bb"];
let scale_Csharp_Minor = ["C#", "D#", "E", "F#", "G#", "A", "B"];
let scale_D_Minor = ["D", "E", "F", "G", "A", "Bb", "C"];
let scale_Eb_Minor = ["Eb", "F", "Gb", "Ab", "Bb", "B", "Db"];
let scale_E_Minor = ["E", "F#", "G", "A", "B", "C", "D"];
let scale_F_Minor = ["F", "G", "Ab", "Bb", "C", "Db", "Eb"];
let scale_Fsharp_Minor = ["F#", "G#", "A", "B", "C#", "D", "E"];
let scale_G_Minor = ["G", "A", "Bb", "C", "D", "Eb", "F"];
let scale_Gsharp_Minor = ["G#", "A#", "B", "C#", "D#", "E", "F#"];
let scale_A_Minor = ["A", "B", "C", "D", "E", "F", "G"];
let scale_Bb_Minor = ["Bb", "C", "Db", "Eb", "F", "Gb", "Ab"];
let scale_B_Minor = ["B", "C#", "D", "E", "F#", "G", "A"];

let currentScale = scale_C_Major;


function changeScale(scale){

//I know this part of the code looks terrible, I tried doing it with variables but had a ton of issues because I am working with arrays
	console.log('scale: ' + scale);

	if(scale == "C_Major"){
		currentScale = scale_C_Major;
	}

	if(scale == "Db_Major"){
		currentScale = scale_Db_Major;
	}

	if(scale == "D_Major"){
		currentScale = scale_D_Major;
	}

	if(scale == "Eb_Major"){
		currentScale = scale_Eb_Major;
	}

	if(scale == "E_Major"){
		currentScale = scale_E_Major;
	}

	if(scale == "F_Major"){
		currentScale = scale_F_Major;
	}

	if(scale == "F#_Major"){
		currentScale = scale_Fsharp_Major;
	}

	if(scale == "G_Major"){
		currentScale = scale_G_Major;
	}

	if(scale == "Ab_Major"){
		currentScale = scale_Ab_Major;
	}

	if(scale == "A_Major"){
		currentScale = scale_A_Major;
	}

	if(scale == "Bb_Major"){
		currentScale = scale_Bb_Major;
	}

	if(scale == "B_Major"){
		currentScale = scale_B_Major;
	}

	if(scale == "C_Minor"){
		currentScale = scale_C_Minor;
	}

	if(scale == "C#_Minor"){
		currentScale = scale_Csharp_Minor;
	}

	if(scale == "D_Minor"){
		currentScale = scale_D_Minor;
	}

	if(scale == "Eb_Minor"){
		currentScale = scale_Eb_Minor;
	}

	if(scale == "E_Minor"){
		currentScale = scale_E_Minor;
	}

	if(scale == "F_Minor"){
		currentScale = scale_F_Minor;
	}

	if(scale == "F#_Minor"){
		currentScale = scale_Fsharp_Minor;
	}

	if(scale == "G_Minor"){
		currentScale = scale_G_Minor;
	}

	if(scale == "G#_Minor"){
		currentScale = scale_Gsharp_Minor;
	}

	if(scale == "A_Minor"){
		currentScale = scale_A_Minor;
	}

	if(scale == "Bb_Minor"){
		currentScale = scale_Bb_Minor;
	}

	if(scale == "B_Minor"){
		currentScale = scale_B_Minor;
	}


	console.log('current scale is: ' + currentScale);
	console.log('the first element of the scale array is: ' + currentScale[0]);

	octave = 3;
	currentStep = 0;
	currentChord = 1;
}

function changeVolume(volumeFromPopup){
  chordSynth.volume.value = volumeFromPopup;
  bendSynth.volume.value = volumeFromPopup;
  mouseSynth.volume.value = volumeFromPopup;
}



let octave = 3;

let currentChord = 1;

function playChord(){
  console.log('current scale: ' + currentScale);

  if(currentChord == 1){
    chordSynth.triggerAttackRelease([currentScale[0]+octave, currentScale[2]+octave, currentScale[4]+octave], "4n");
    currentStep = 4;
  }

  if(currentChord == 2){
    chordSynth.triggerAttackRelease([currentScale[4]+octave, currentScale[6]+octave, currentScale[1]+(octave+1)], "4n");
    currentStep = 1;
    if(octave < octaveCeiling){
      octave++;
    }
  }

  if(currentChord == 3){
    chordSynth.triggerAttackRelease([currentScale[3]+octave, currentScale[5]+octave, currentScale[0]+(octave+1)], "4n");
    currentStep = 0;
  }

  if(currentChord == 4){
    chordSynth.triggerAttackRelease([currentScale[5]+octave, currentScale[0]+(octave+1), currentScale[2]+(octave+1)], "4n");
    currentStep = 2;
    if(octave > octaveFloor){
      octave = octave - 1;
    }
  }

  if(currentChord == 5){
    chordSynth.triggerAttackRelease([currentScale[0]+octave, currentScale[2]+octave, currentScale[4]+octave], "4n");
    currentStep = 4;
  }

  if(currentChord == 6){
    chordSynth.triggerAttackRelease([currentScale[4]+octave, currentScale[6]+octave, currentScale[1]+(octave+1)], "4n");
    currentStep = 1;
    if(octave < octaveCeiling){
      octave++;
    }
  }

  if(currentChord == 7){
    chordSynth.triggerAttackRelease([currentScale[5]+octave, currentScale[0]+(octave+1), currentScale[2]+(octave+1)], "4n");
    currentStep = 2;
  }

  if(currentChord == 8){
    chordSynth.triggerAttackRelease([currentScale[3]+octave, currentScale[5]+octave, currentScale[0]+(octave+1)], "4n");
    currentStep = 0;
    if(octave > octaveFloor){
      octave = octave - 1;
    }
  }

  if(currentChord < 8){
    currentChord++;
  } else {
    currentChord = 1;
  }


}


function bendSynthFunction(scrollHeight){
  if(bendingActive == 0){
    console.log("starting scroll synth");

      if(currentChord == 1){
        bendSynth.triggerAttack(currentScale[2]+octave, now);
      }
      if(currentChord == 2){
        bendSynth.triggerAttack(currentScale[6]+octave, now);
      }

      if(currentChord == 3){
        bendSynth.triggerAttack(currentScale[5]+octave, now);
      }

      if(currentChord == 4){
        bendSynth.triggerAttack(currentScale[0]+(octave+1), now);
      }

      if(currentChord == 5){
        bendSynth.triggerAttack(currentScale[2]+octave, now);
      }
      if(currentChord == 6){
        bendSynth.triggerAttack(currentScale[6]+octave, now);
      }

      if(currentChord == 7){
        bendSynth.triggerAttack(currentScale[0]+(octave+1), now);
      }

      if(currentChord == 8){
        bendSynth.triggerAttack(currentScale[5]+octave, now);
      }


  }

  bendingActive = 25;

  if(scrollHeight < previousScrollHeight){
    bendCounter++;
  }
  if(scrollHeight > previousScrollHeight){
    bendCounter = bendCounter - 1;
  }

  previousScrollHeight = scrollHeight;
}

function shiftBendCounterTowardsZero(){
  if(bendingActive > 0){
    if(bendCounter > 0){
      bendSynth.detune.value = (bendCounter*10);
      mouseSynth.detune.value = (bendCounter*10);
			// chordSynth.detune.value = (bendCounter*10);

      bendCounter = bendCounter - 1;
    }
    if(bendCounter < 0){
      bendSynth.detune.value = (bendCounter*10);
      mouseSynth.detune.value = (bendCounter*10);
			// chordSynth.detune.value = (bendCounter*10);

      bendCounter++;
    }
  } else {
    bendSynth.triggerRelease(now);
  }

  // console.log("bendingActive: " + bendingActive);
  // console.log("bendCounter: " + bendCounter);
}

function shiftBendActiveTowardsZero(){
  if(bendCounter == 0){
    if(bendingActive > 0){
      bendingActive = bendingActive - 1;
    }
  }
}

function playbackRecording(){
	recorder.stop();
	recorder.play();
}


var intervalID = setInterval(shiftBendCounterTowardsZero, 25);

var intervalID = setInterval(shiftBendActiveTowardsZero, 25);



function playMouseSynth(mouseX, mouseY){


  if(mouseCounter < 10){
    mouseCounter++
  } else {
    mouseCounter = 0;


    if(mouseY < previousY){

      //mouse went up
      if(currentStep < 6){
        currentStep++;
        console.log("current step" + currentStep);
      } else {
        currentStep = 0;
        console.log("current step" + currentStep);
        if(octave < octaveCeiling){
          octave++;
          console.log("octave:" + octave);
        } else {
          octave = octaveCeiling;
          console.log("octave:" + octave);
        }
      }

    } else {

      if(currentStep > 0){
        currentStep = currentStep - 1;
        console.log("current step" + currentStep);
      } else {
        currentStep = 6;
        console.log("current step" + currentStep);
        if(octave > octaveFloor){
          octave = octave - 1;
          console.log("octave:" + octave);
        } else {
          octave = octaveFloor;
          console.log("octave:" + octave);
        }
      }
    }


    mouseSynth.triggerAttackRelease(currentScale[currentStep]+octave, "64n");

    previousY = mouseY;

  }

}

let drumLoop = new Audio("drumLoop.wav");

function toggleDrums(state){
  if(state == "on"){
		drumLoop.currentTime = 0;
		drumLoop.play();
    currentDrumState = "on";
  } else {
		drumLoop.pause();
    currentDrumState = "off";
  }
}

drumLoop.addEventListener("ended", ()=>{
	if(currentDrumState == "on"){
		drumLoop.currentTime = 0;
		drumLoop.play();
	}
})

function toggleMode(mode){
  if(mode == "history"){
//record inputs for later playback here
		console.log('mode is history');
		recorder.stop();
		recorder.start();
    currentMode = "history";
  } else {
//send inputs
		console.log('mode is live');
		recorder.stop();
    currentMode = "live";
  }
}

chrome.extension.onConnect.addListener(function(port) {
   console.log("Connected .....");
   port.onMessage.addListener(function(msg) {
        // console.log("message recieved: " + msg);


        if(msg.type == "clickInfo"){
          // console.log('clicked');
          // console.log('clicked mouse x: ' + msg.mouseX);
          // console.log('clicked mouse y: ' + msg.mouseY);
          playChord();
        }

        if(msg.type == "mouseInfo"){
          // console.log('mouse moved:');
          // console.log('mouse x: ' + msg.mouseX);
          // console.log('mouse y: ' + msg.mouseY);
          playMouseSynth(msg.mouseX, msg.mouseY);
        }

        if(msg.type == "volumeInfo"){
          console.log('volume: ' + msg.volume);
          changeVolume(msg.volume);
        }


        if(msg.type == "scaleInfo"){
          currentScale = msg.scale;
          console.log('scale: ' + currentScale);
          changeScale(currentScale);
        }

        if(msg.type == "scrollInfo"){
          scrollHeight = msg.scrollHeight;
          // console.log('scroll height: ' + scrollHeight);
          bendSynthFunction(scrollHeight);
        }

        if(msg.type == "drumInfo"){
          if(msg.state == "on"){
            console.log("drums are on")
            toggleDrums("on");
          } else {
            console.log("drums are off")
            toggleDrums("off");
          }
        }

        if(msg.type == "modeInfo"){
          if(msg.mode == "live"){
            console.log("live mode")
            toggleMode("live");
          } else {
            console.log("history mode")
            toggleMode("history");
          }
        }

				if(msg.type == "historyModePlaybackInfo"){
          playbackRecording();
        }

   });
})
