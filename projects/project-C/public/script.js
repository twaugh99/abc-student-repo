console.log("script loaded");

let socket = io();




//Preloading Synths
let ac = new AudioContext();

Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
})
Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
})
Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
})
Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
})
Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
})


//DRUM KITS
let drum1orchestra = new Audio("assets/drums/orchestra/tom2.wav");
let drum2orchestra = new Audio("assets/drums/orchestra/tom1.wav");
let drum3orchestra = new Audio("assets/drums/orchestra/tambourine.wav");
let drum4orchestra = new Audio("assets/drums/orchestra/triangle.wav");
let drum5orchestra = new Audio("assets/drums/orchestra/snare.wav");
let drum6orchestra = new Audio("assets/drums/orchestra/woodblock1.wav");
let drum7orchestra = new Audio("assets/drums/orchestra/woodblock2.wav");
let drum8orchestra = new Audio("assets/drums/orchestra/crash.wav");

let drum1rock = new Audio("assets/drums/rock/kick.wav");
let drum2rock = new Audio("assets/drums/rock/hihat.wav");
let drum3rock = new Audio("assets/drums/rock/tom1.wav");
let drum4rock = new Audio("assets/drums/rock/tom2.wav");
let drum5rock = new Audio("assets/drums/rock/snare.wav");
let drum6rock = new Audio("assets/drums/rock/oh.wav");
let drum7rock = new Audio("assets/drums/rock/ride.wav");
let drum8rock = new Audio("assets/drums/rock/crash.wav");

let drum1electronic = new Audio("assets/drums/electronic/kick.wav");
let drum2electronic = new Audio("assets/drums/electronic/perc1.wav");
let drum3electronic = new Audio("assets/drums/electronic/perc2.wav");
let drum4electronic = new Audio("assets/drums/electronic/perc3.wav");
let drum5electronic = new Audio("assets/drums/electronic/clap.wav");
let drum6electronic = new Audio("assets/drums/electronic/hihat.wav");
let drum7electronic = new Audio("assets/drums/electronic/snare.wav");
let drum8electronic = new Audio("assets/drums/electronic/crash.wav");

let orchestraDrums = [drum1orchestra, drum2orchestra, drum3orchestra, drum4orchestra, drum5orchestra, drum6orchestra, drum7orchestra, drum8orchestra]
let rockDrums = [drum1rock, drum2rock, drum3rock, drum4rock, drum5rock, drum6rock, drum7rock, drum8rock]
let electronicDrums = [drum1electronic, drum2electronic, drum3electronic, drum4electronic, drum5electronic, drum6electronic, drum7electronic, drum8electronic]


let wheelValue = 0;
let gameStarted = false;

let sessionID;

let activePlayers = [];
let activePlayersIDs = [];

let orchestraRoomPlayers = [];
let orchestraRoomPlayersIDs = [];

let rockRoomPlayers = [];
let rockRoomPlayersIDs = [];

let electronicRoomPlayers = [];
let electronicRoomPlayersIDs = [];

let currentRole = null;

let circleToFill = false;
let drum1ToFill = false;
let drum2ToFill = false;
let drum3ToFill = false;
let drum4ToFill = false;
let drum5ToFill = false;
let drum6ToFill = false;
let drum7ToFill = false;
let drum8ToFill = false;

let orchestraSynthTaken = false;
let orchestraDrumTaken = false;
let rockSynthTaken = false;
let rockDrumTaken = false;
let electronicSynthTaken = false;
let electronicDrumTaken = false;

let receivedNoteToDraw = false;
let receivedNoteX;
let receivedNoteY;

let receivedChordToDraw = false;
let receivedChordX;
let receivedChordY;



let namebox = document.getElementById("namebox");
let button = document.getElementById("button");


let synthRoleButton = document.getElementById("synthRoleButton");
let drumRoleButton = document.getElementById("drumRoleButton");
// let fxRoleButton = document.getElementById("fxRoleButton");
let lobbyActivePlayersDiv = document.getElementById("lobbyActivePlayersDiv");
let lobbyDiv = document.getElementById("lobbyDiv");

let orchestraRoomPlayerCountText = document.getElementById("orchestraRoomPlayerCountText");
let rockRoomPlayerCountText = document.getElementById("rockRoomPlayerCountText");
let electronicRoomPlayerCountText = document.getElementById("electronicRoomPlayerCountText");

let playersInMyRoomDiv = document.getElementById("playersInMyRoomDiv");


function preload() {
  courier = loadFont('assets/fonts/COURBD.TTF');
}



synthRoleButton.addEventListener("click", ()=>{
  if(currentRole == null){
    if(currentRoom == "orchestra"){
      if(orchestraSynthTaken == false){
        orchestraSynthTaken = true;
        synthRoleButton.style.backgroundColor = "white";
        synthRoleButton.style.color = "black";
        synthControlsDiv.style.display = "unset";

        orchestraSlidersDiv.style.display = "unset";
        rockSlidersDiv.style.display = "none";
        electronicSlidersDiv.style.display = "none";

        currentRole = "synth";
        //tell the server that the role has been taken
        socket.emit("orchestraSynthTaken", true);
      }
    }
    if(currentRoom == "rock"){
      if(rockSynthTaken == false){
        rockSynthTaken = true;
        synthRoleButton.style.backgroundColor = "white";
        synthRoleButton.style.color = "black";
        synthControlsDiv.style.display = "unset";

        orchestraSlidersDiv.style.display = "none";
        rockSlidersDiv.style.display = "unset";
        electronicSlidersDiv.style.display = "none";

        currentRole = "synth";
        //tell the server that the role has been taken
        socket.emit("rockSynthTaken", true);
      }
    }
    if(currentRoom == "electronic"){
      if(electronicSynthTaken == false){
        electronicSynthTaken = true;
        synthRoleButton.style.backgroundColor = "white";
        synthRoleButton.style.color = "black";
        synthControlsDiv.style.display = "unset";

        orchestraSlidersDiv.style.display = "none";
        rockSlidersDiv.style.display = "none";
        electronicSlidersDiv.style.display = "unset";

        currentRole = "synth";
        //tell the server that the role has been taken
        socket.emit("electronicSynthTaken", true);
      }
    }
    return;
  }

  if(currentRole == "synth"){
    currentRole = null;
    if(currentRoom == "orchestra"){
      orchestraSynthTaken = false;
      //tell the server that the synth role is open
      socket.emit("orchestraSynthTaken", false);
    }
    if(currentRoom == "rock"){
      rockSynthTaken = false;
      //tell the server that the synth role is open
      socket.emit("rockSynthTaken", false);
    }
    if(currentRoom == "electronic"){
      electronicSynthTaken = false;
      //tell the server that the synth role is open
      socket.emit("electronicSynthTaken", false);
    }
    synthRoleButton.style.backgroundColor = "black";
    synthRoleButton.style.color = "white";
    drumControlsDiv.style.display = "none";
    synthControlsDiv.style.display = "none";
    return;
  }

  if(currentRole == "drum"){
    if(currentRoom == "orchestra"){
      if(orchestraSynthTaken == false){
        orchestraSynthTaken = true;
        orchestraDrumTaken = false;
        synthRoleButton.style.backgroundColor = "white";
        synthRoleButton.style.color = "black";
        drumRoleButton.style.backgroundColor = "black";
        drumRoleButton.style.color = "white";
        synthControlsDiv.style.display = "unset";
        drumControlsDiv.style.display = "none";

        orchestraSlidersDiv.style.display = "unset";
        rockSlidersDiv.style.display = "none";
        electronicSlidersDiv.style.display = "none";

        currentRole = "synth";
        //tell the server that the role has been taken
        //tell the server that the other role is now open
        socket.emit("orchestraSynthTaken", true);
        socket.emit("orchestraDrumTaken", false);
      }
    }
    if(currentRoom == "rock"){
      if(rockSynthTaken == false){
        rockSynthTaken = true;
        rockDrumTaken = false;
        synthRoleButton.style.backgroundColor = "white";
        synthRoleButton.style.color = "black";
        drumRoleButton.style.backgroundColor = "black";
        drumRoleButton.style.color = "white";
        synthControlsDiv.style.display = "unset";
        drumControlsDiv.style.display = "none";

        orchestraSlidersDiv.style.display = "none";
        rockSlidersDiv.style.display = "unset";
        electronicSlidersDiv.style.display = "none";

        currentRole = "synth";
        //tell the server that the role has been taken
        //tell the server that the other role is now open
        socket.emit("rockSynthTaken", true);
        socket.emit("rockDrumTaken", false);
      }
    }
    if(currentRoom == "electronic"){
      if(electronicSynthTaken == false){
        electronicSynthTaken = true;
        electronicDrumTaken = false;
        synthRoleButton.style.backgroundColor = "white";
        synthRoleButton.style.color = "black";
        drumRoleButton.style.backgroundColor = "black";
        drumRoleButton.style.color = "white";
        synthControlsDiv.style.display = "unset";
        drumControlsDiv.style.display = "none";

        orchestraSlidersDiv.style.display = "none";
        rockSlidersDiv.style.display = "none";
        electronicSlidersDiv.style.display = "unset";

        currentRole = "synth";
        //tell the server that the role has been taken
        //tell the server that the other role is now open
        socket.emit("electronicSynthTaken", true);
        socket.emit("electronicDrumTaken", false);
      }
    }
    return;
  }
});




drumRoleButton.addEventListener("click", ()=>{
  if(currentRole == null){
    if(currentRoom == "orchestra"){
      if(orchestraDrumTaken == false){
        orchestraDrumTaken = true;
        drumRoleButton.style.backgroundColor = "white";
        drumRoleButton.style.color = "black";
        drumControlsDiv.style.display = "unset";
        synthControlsDiv.style.display = "none";

        currentRole = "drum";
        //tell the server that the role has been taken
        socket.emit("orchestraDrumTaken", true);
      }
    }
    if(currentRoom == "rock"){
      if(rockDrumTaken == false){
        rockDrumTaken = true;
        drumRoleButton.style.backgroundColor = "white";
        drumRoleButton.style.color = "black";
        drumControlsDiv.style.display = "unset";
        synthControlsDiv.style.display = "none";

        currentRole = "drum";
        //tell the server that the role has been taken
        socket.emit("rockDrumTaken", true);
      }
    }
    if(currentRoom == "electronic"){
      if(electronicDrumTaken == false){
        electronicDrumTaken = true;
        drumRoleButton.style.backgroundColor = "white";
        drumRoleButton.style.color = "black";
        drumControlsDiv.style.display = "unset";
        synthControlsDiv.style.display = "none";

        currentRole = "drum";
        //tell the server that the role has been taken
        socket.emit("electronicDrumTaken", true);
      }
    }
    return;
  }

  if(currentRole == "drum"){
    currentRole = null;
    if(currentRoom == "orchestra"){
      orchestraDrumTaken = false;
      //tell the server that the synth role is open
      socket.emit("orchestraDrumTaken", false);
    }
    if(currentRoom == "rock"){
      rockDrumTaken = false;
      //tell the server that the synth role is open
      socket.emit("rockDrumTaken", false);
    }
    if(currentRoom == "electronic"){
      electronicDrumTaken = false;
      //tell the server that the synth role is open
      socket.emit("electronicDrumTaken", false);
    }
    drumRoleButton.style.backgroundColor = "black";
    drumRoleButton.style.color = "white";
    drumControlsDiv.style.display = "none";
    return;
  }

  if(currentRole == "synth"){
    if(currentRoom == "orchestra"){
      if(orchestraDrumTaken == false){
        orchestraDrumTaken = true;
        orchestraSynthTaken = false;
        drumRoleButton.style.backgroundColor = "white";
        drumRoleButton.style.color = "black";
        synthRoleButton.style.backgroundColor = "black";
        synthRoleButton.style.color = "white";
        drumControlsDiv.style.display = "unset";
        synthControlsDiv.style.display = "none";

        currentRole = "drum";
        //tell the server that the role has been taken
        //tell the server that the other role is now open
        socket.emit("orchestraDrumTaken", true);
        socket.emit("orchestraSynthTaken", false);
      }
    }
    if(currentRoom == "rock"){
      if(rockDrumTaken == false){
        rockDrumTaken = true;
        rockSynthTaken = false;
        drumRoleButton.style.backgroundColor = "white";
        drumRoleButton.style.color = "black";
        synthRoleButton.style.backgroundColor = "black";
        synthRoleButton.style.color = "white";
        drumControlsDiv.style.display = "unset";
        synthControlsDiv.style.display = "none";

        currentRole = "drum";
        //tell the server that the role has been taken
        //tell the server that the other role is now open
        socket.emit("rockDrumTaken", true);
        socket.emit("rockSynthTaken", false);
      }
    }
    if(currentRoom == "electronic"){
      if(electronicDrumTaken == false){
        electronicDrumTaken = true;
        electronicSynthTaken = false;
        drumRoleButton.style.backgroundColor = "white";
        drumRoleButton.style.color = "black";
        synthRoleButton.style.backgroundColor = "black";
        synthRoleButton.style.color = "white";
        drumControlsDiv.style.display = "unset";
        synthControlsDiv.style.display = "none";

        currentRole = "drum";

        //tell the server that the role has been taken
        //tell the server that the other role is now open
        socket.emit("electronicDrumTaken", true);
        socket.emit("electronicSynthTaken", false);

      }
    }
    return;
  }
});






let chatbox = document.getElementById("chat");
let messagebox = document.getElementById("message");
let sendbutton = document.getElementById("send");

sendbutton.addEventListener("click", ()=>{
  console.log('clicked');
  let message = messagebox.value.trim();
  console.log(message);
  if(message != ""){
    let data = {name: myName, message: message, room: currentRoom}
    socket.emit('message', data);
    console.log(data);
  }
  messagebox.value = "";
})

socket.on("incoming", (data)=>{
  console.log(data);
  let name = data.name;
  let message = data.message;
  let li = document.createElement("li");
  let p = document.createElement("p");
  p.innerHTML = "<span class = 'sender'>"+name+":</span> " + message;
  li.appendChild(p);
  chatbox.appendChild(li);
  chatbox.scrollTop = chatbox.scrollHeight;
})

messagebox.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    sendbutton.click();
  }
})






let orchestraShortRelease = 1;
let orchestraLongRelease = 2;
let rockShortRelease = 1;
let rockLongRelease = 2;
let electronicShortRelease = 1;
let electronicLongRelease = 2;


let heightMarkers = [0, 50, 100, 150, 200, 250, 300, 350, 400];


let octave = 4;
function playNote(){
  for(let i = 0; i < 8; i++){
    if(mouseY > heightMarkers[i] && mouseY < heightMarkers[i+1]){
      console.log("note " + (i+1));
      if(currentRoom == "orchestra"){
        if(i+1 == 1){
          Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
            french_horn.play('G4').stop(ac.currentTime + orchestraShortRelease);
          })
          socket.emit("orchestraNotePlayed", sessionID, 1);
        }
        if(i+1 == 2){
          Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
            french_horn.play('F4').stop(ac.currentTime + orchestraShortRelease);
          })
          socket.emit("orchestraNotePlayed", sessionID, 2);
        }
        if(i+1 == 3){
          Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
            french_horn.play('Eb4').stop(ac.currentTime + orchestraShortRelease);
          })
          socket.emit("orchestraNotePlayed", sessionID, 3);
        }
        if(i+1 == 4){
          Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
            french_horn.play('D4').stop(ac.currentTime + orchestraShortRelease);
          })
          socket.emit("orchestraNotePlayed", sessionID, 4);
        }
        if(i+1 == 5){
          Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
            french_horn.play('C4').stop(ac.currentTime + orchestraShortRelease);
          })
          socket.emit("orchestraNotePlayed", sessionID, 5);
        }
        if(i+1 == 6){
          Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
            french_horn.play('Bb3').stop(ac.currentTime + orchestraShortRelease);
          })
          socket.emit("orchestraNotePlayed", sessionID, 6);
        }
        if(i+1 == 7){
          Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
            french_horn.play('A3').stop(ac.currentTime + orchestraShortRelease);
          })
          socket.emit("orchestraNotePlayed", sessionID, 7);
        }
        if(i+1 == 8){
          Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
            french_horn.play('G3').stop(ac.currentTime + orchestraShortRelease);
          })
          socket.emit("orchestraNotePlayed", sessionID, 8);
        }
      }

      if(currentRoom == "rock"){
        if(i+1 == 1){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('C4').stop(ac.currentTime + rockShortRelease);
          })
          socket.emit("rockNotePlayed", sessionID, 1);
        }
        if(i+1 == 2){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('B3').stop(ac.currentTime + rockShortRelease);
          })
          socket.emit("rockNotePlayed", sessionID, 2);
        }
        if(i+1 == 3){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('A3').stop(ac.currentTime + rockShortRelease);
          })
          socket.emit("rockNotePlayed", sessionID, 3);
        }
        if(i+1 == 4){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('G3').stop(ac.currentTime + rockShortRelease);
          })
          socket.emit("rockNotePlayed", sessionID, 4);
        }
        if(i+1 == 5){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('F3').stop(ac.currentTime + rockShortRelease);
          })
          socket.emit("rockNotePlayed", sessionID, 5);
        }
        if(i+1 == 6){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('E3').stop(ac.currentTime + rockShortRelease);
          })
          socket.emit("rockNotePlayed", sessionID, 6);
        }
        if(i+1 == 7){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('D3').stop(ac.currentTime + rockShortRelease);
          })
          socket.emit("rockNotePlayed", sessionID, 7);
        }
        if(i+1 == 8){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('C3').stop(ac.currentTime + rockShortRelease);
          })
          socket.emit("rockNotePlayed", sessionID, 8);
        }
      }
      if(currentRoom == "electronic"){
        if(i+1 == 1){
          Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
            synth_brass_1.play('Eb5').stop(ac.currentTime + electronicShortRelease);
          })
          socket.emit("electronicNotePlayed", sessionID, 1);
        }
        if(i+1 == 2){
          Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
            synth_brass_1.play('D5').stop(ac.currentTime + electronicShortRelease);
          })
          socket.emit("electronicNotePlayed", sessionID, 2);
        }
        if(i+1 == 3){
          Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
            synth_brass_1.play('C5').stop(ac.currentTime + electronicShortRelease);
          })
          socket.emit("electronicNotePlayed", sessionID, 3);
        }
        if(i+1 == 4){
          Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
            synth_brass_1.play('Bb4').stop(ac.currentTime + electronicShortRelease);
          })
          socket.emit("electronicNotePlayed", sessionID, 4);
        }
        if(i+1 == 5){
          Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
            synth_brass_1.play('Ab4').stop(ac.currentTime + electronicShortRelease);
          })
          socket.emit("electronicNotePlayed", sessionID, 5);
        }
        if(i+1 == 6){
          Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
            synth_brass_1.play('G4').stop(ac.currentTime + electronicShortRelease);
          })
          socket.emit("electronicNotePlayed", sessionID, 6);
        }
        if(i+1 == 7){
          Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
            synth_brass_1.play('F4').stop(ac.currentTime + electronicShortRelease);
          })
          socket.emit("electronicNotePlayed", sessionID, 7);
        }
        if(i+1 == 8){
          Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
            synth_brass_1.play('Eb4').stop(ac.currentTime + electronicShortRelease);
          })
          socket.emit("electronicNotePlayed", sessionID, 8);
        }
      }
    }
  }
}


function playChord(){
  for(let i = 0; i < 8; i++){
    if(mouseY > heightMarkers[i] && mouseY < heightMarkers[i+1]){
      console.log("note " + (i+1));
      if(currentRoom == "orchestra"){
        if(i+1 == 1){
          Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
            choir_aahs.play('D5').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('Bb4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('G4').stop(ac.currentTime + orchestraLongRelease);
          })
          socket.emit("orchestraChordPlayed", sessionID, 1);
        }
        if(i+1 == 2){
          Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
            choir_aahs.play('C5').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('A4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('F4').stop(ac.currentTime + orchestraLongRelease);
          })
          socket.emit("orchestraChordPlayed", sessionID, 2);
        }
        if(i+1 == 3){
          Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
            choir_aahs.play('Bb4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('G4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('Eb4').stop(ac.currentTime + orchestraLongRelease);
          })
          socket.emit("orchestraChordPlayed", sessionID, 3);
        }
        if(i+1 == 4){
          Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
            choir_aahs.play('A4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('F4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('D4').stop(ac.currentTime + orchestraLongRelease);
          })
          socket.emit("orchestraChordPlayed", sessionID, 4);
        }
        if(i+1 == 5){
          Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
            choir_aahs.play('G4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('Eb4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('C4').stop(ac.currentTime + orchestraLongRelease);
          })
          socket.emit("orchestraChordPlayed", sessionID, 5);
        }
        if(i+1 == 6){
          Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
            choir_aahs.play('F4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('D4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('Bb3').stop(ac.currentTime + orchestraLongRelease);
          })
          socket.emit("orchestraChordPlayed", sessionID, 6);
        }
        if(i+1 == 7){
          Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
            choir_aahs.play('Eb4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('C4').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('A3').stop(ac.currentTime + orchestraLongRelease);
          })
          socket.emit("orchestraChordPlayed", sessionID, 7);
        }
        if(i+1 == 8){
          Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
            choir_aahs.play('D3').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('Bb3').stop(ac.currentTime + orchestraLongRelease);
            choir_aahs.play('G3').stop(ac.currentTime + orchestraLongRelease);
          })
          socket.emit("orchestraChordPlayed", sessionID, 8);
        }
      }

      if(currentRoom == "rock"){
        if(i+1 == 1){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('G4').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('E4').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('C4').stop(ac.currentTime + rockLongRelease);
          })
          socket.emit("rockChordPlayed", sessionID, 1);
        }
        if(i+1 == 2){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('F4').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('D4').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('B3').stop(ac.currentTime + rockLongRelease);
          })
          socket.emit("rockChordPlayed", sessionID, 2);
        }
        if(i+1 == 3){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('E4').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('C4').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('A3').stop(ac.currentTime + rockLongRelease);
          })
          socket.emit("rockChordPlayed", sessionID, 3);
        }
        if(i+1 == 4){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('D4').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('B3').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('G3').stop(ac.currentTime + rockLongRelease);
          })
          socket.emit("rockChordPlayed", sessionID, 4);
        }
        if(i+1 == 5){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('C4').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('A3').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('F3').stop(ac.currentTime + rockLongRelease);
          })
          socket.emit("rockChordPlayed", sessionID, 5);
        }
        if(i+1 == 6){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('B3').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('G3').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('E3').stop(ac.currentTime + rockLongRelease);
          })
          socket.emit("rockChordPlayed", sessionID, 6);
        }
        if(i+1 == 7){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('A3').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('F3').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('D3').stop(ac.currentTime + rockLongRelease);
          })
          socket.emit("rockChordPlayed", sessionID, 7);
        }
        if(i+1 == 8){
          Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
            overdriven_guitar.play('G3').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('E3').stop(ac.currentTime + rockLongRelease);
            overdriven_guitar.play('C3').stop(ac.currentTime + rockLongRelease);
          })
          socket.emit("rockChordPlayed", sessionID, 8);
        }
      }
      if(currentRoom == "electronic"){
        if(i+1 == 1){
          Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
            pad_3_polysynth.play('Bb4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('G4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('Eb4').stop(ac.currentTime + electronicLongRelease);
          })
          socket.emit("electronicChordPlayed", sessionID, 1);
        }
        if(i+1 == 2){
          Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
            pad_3_polysynth.play('Ab4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('F4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('D4').stop(ac.currentTime + electronicLongRelease);
          })
          socket.emit("electronicChordPlayed", sessionID, 2);
        }
        if(i+1 == 3){
          Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
            pad_3_polysynth.play('G4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('Eb4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('C4').stop(ac.currentTime + electronicLongRelease);
          })
          socket.emit("electronicChordPlayed", sessionID, 3);
        }
        if(i+1 == 4){
          Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
            pad_3_polysynth.play('F4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('D4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('Bb3').stop(ac.currentTime + electronicLongRelease);
          })
          socket.emit("electronicChordPlayed", sessionID, 4);
        }
        if(i+1 == 5){
          Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
            pad_3_polysynth.play('Eb4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('C4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('Ab3').stop(ac.currentTime + electronicLongRelease);
          })
          socket.emit("electronicChordPlayed", sessionID, 5);
        }
        if(i+1 == 6){
          Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
            pad_3_polysynth.play('D4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('Bb3').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('G3').stop(ac.currentTime + electronicLongRelease);
          })
          socket.emit("electronicChordPlayed", sessionID, 6);
        }
        if(i+1 == 7){
          Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
            pad_3_polysynth.play('C4').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('Ab3').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('F3').stop(ac.currentTime + electronicLongRelease);
          })
          socket.emit("electronicChordPlayed", sessionID, 7);
        }
        if(i+1 == 8){
          Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
            pad_3_polysynth.play('Bb3').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('G3').stop(ac.currentTime + electronicLongRelease);
            pad_3_polysynth.play('Eb3').stop(ac.currentTime + electronicLongRelease);
          })
          socket.emit("electronicChordPlayed", sessionID, 8);
        }
      }
    }
  }
}



function setupCanvasEventListeners(){
  let gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.addEventListener("mousedown", e => {
    if(currentRole == "synth"){
      console.log("clicked");
      if(spaceDown == true){
        console.log("playing a chord");
        playChord();
      } else {
        console.log("playing a single note");
        playNote();
      }
      circleToFill = true;
    }
  });
}



function updateDrumAnimation(number){
  number++;
  if(number == 1){
    drum1ToFill = true;
  }
  if(number == 2){
    drum2ToFill = true;
  }
  if(number == 3){
    drum3ToFill = true;
  }
  if(number == 4){
    drum4ToFill = true;
  }
  if(number == 5){
    drum5ToFill = true;
  }
  if(number == 6){
    drum6ToFill = true;
  }
  if(number == 7){
    drum7ToFill = true;
  }
  if(number == 8){
    drum8ToFill = true;
  }
}

let drumFromServer = false;

function playDrum(number, room){
  if(room == "orchestra"){
    orchestraDrums[number].currentTime = 0;
    orchestraDrums[number].play();
    if(drumFromServer == false){
      socket.emit("orchestraDrumPlayed", sessionID, number);
    }
    drumFromServer = false;
  }
  if(room == "rock"){
    rockDrums[number].currentTime = 0;
    rockDrums[number].play();
    if(drumFromServer == false){
      socket.emit("rockDrumPlayed", sessionID, number);
    }
    drumFromServer = false;
  }
  if(room == "electronic"){
    electronicDrums[number].currentTime = 0;
    electronicDrums[number].play();
    if(drumFromServer == false){
      socket.emit("electronicDrumPlayed", sessionID, number);
    }
    drumFromServer = false;
  }
  updateDrumAnimation(number);
}



let keyArray = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK']
let spaceDown = false;

document.addEventListener('keydown', function(event) {
  if(currentRole == "drum"){
    for(let i = 0; i < keyArray.length; i++){
      if(event.code == keyArray[i]){
        playDrum(i, currentRoom)
        console.log("playing drum" + i);
      }
      // console.log(i);
    }
  }
  if(currentRole == "synth"){
    if(event.code == 'Space'){
      if(spaceDown == false){
        spaceDown = true;
        console.log("space key is down");
      }
    }
  }
});

document.addEventListener('keyup', function(event) {
  if(currentRole == "synth"){
    if(event.code == 'Space'){
      spaceDown = false;
      console.log("space key is up")
    }
  }
});


function setup(){
  let cnv = createCanvas(400, 400);
  cnv.id('gameCanvas');
  cnv.parent('canvasOnlyDiv');
  setupCanvasEventListeners();
  // canvasOnlyDiv.appendChild(cnv);
}


let currentRoom;

let currentRoomText = document.getElementById("currentRoomText");

function joinRoom(room){
  chat.innerHTML = "";
  //tell the server which room the player entered, set it so that the player only receives inputs from other players in that room
  if(room == "orchestra"){
    currentRoomText.innerHTML = "Orchestra Room"
    document.body.style.backgroundColor = "#d3b792";
    socket.emit("joinedOrchestra", sessionID);
    if(orchestraDrumTaken == true){
      drumRoleButton.style.backgroundColor = "white";
      drumRoleButton.style.color = "black";
    } else {
      drumRoleButton.style.backgroundColor = "black";
      drumRoleButton.style.color = "white";
    }
    if(orchestraSynthTaken == true){
      synthRoleButton.style.backgroundColor = "white";
      synthRoleButton.style.color = "black";
    } else {
      synthRoleButton.style.backgroundColor = "black";
      synthRoleButton.style.color = "white";
    }
    currentRoom = "orchestra";
  }
  if(room == "rock"){
    currentRoomText.innerHTML = "Rock Room"
    document.body.style.backgroundColor = "#e96464";
    socket.emit("joinedRock", sessionID);
    if(rockDrumTaken == true){
      drumRoleButton.style.backgroundColor = "white";
      drumRoleButton.style.color = "black";
    } else {
      drumRoleButton.style.backgroundColor = "black";
      drumRoleButton.style.color = "white";
    }
    if(rockSynthTaken == true){
      synthRoleButton.style.backgroundColor = "white";
      synthRoleButton.style.color = "black";
    } else {
      synthRoleButton.style.backgroundColor = "black";
      synthRoleButton.style.color = "white";
    }
    currentRoom = "rock";
  }
  if(room == "electronic"){
    currentRoomText.innerHTML = "Electronic Room"
    document.body.style.backgroundColor = "#76e776";
    socket.emit("joinedElectronic", sessionID);
    if(electronicDrumTaken == true){
      drumRoleButton.style.backgroundColor = "white";
      drumRoleButton.style.color = "black";
    } else {
      drumRoleButton.style.backgroundColor = "black";
      drumRoleButton.style.color = "white";
    }
    if(electronicSynthTaken == true){
      synthRoleButton.style.backgroundColor = "white";
      synthRoleButton.style.color = "black";
    } else {
      synthRoleButton.style.backgroundColor = "black";
      synthRoleButton.style.color = "white";
    }
    currentRoom = "electronic";
  }
}

leaveRoomButton.addEventListener("click", ()=>{
  if(currentRole == "synth"){
    if(currentRoom == "orchestra"){
      orchestraSynthTaken = false;
      socket.emit("orchestraSynthTaken", false);
    }
    if(currentRoom == "rock"){
      rockSynthTaken = false;
      socket.emit("rockSynthTaken", false);
    }
    if(currentRoom == "electronic"){
      electronicSynthTaken = false;
      socket.emit("electronicSynthTaken", false);
    }
  }

  if(currentRole == "drum"){
    if(currentRoom == "orchestra"){
      orchestraDrumTaken = false;
      socket.emit("orchestraDrumTaken", false);
    }
    if(currentRoom == "rock"){
      rockDrumTaken = false;
      socket.emit("rockDrumTaken", false);
    }
    if(currentRoom == "electronic"){
      electronicDrumTaken = false;
      socket.emit("electronicDrumTaken", false);
    }
  }

  currentRole = null;
  drumControlsDiv.style.display = "none";
  synthControlsDiv.style.display = "none";

  drumRoleButton.style.backgroundColor = "black";
  drumRoleButton.style.color = "white";

  synthRoleButton.style.backgroundColor = "black";
  synthRoleButton.style.color = "white";

  changeRoom("serverRoom");
  if(currentRoom == "orchestra"){
    socket.emit("leftOrchestra", sessionID);
  }
  if(currentRoom == "rock"){
    socket.emit("leftRock", sessionID);
  }
  if(currentRoom == "electronic"){
    socket.emit("leftElectronic", sessionID);
  }
})

function changeRoom(room){
  if(room == "welcomeRoom"){
    welcomeDiv.style.display = "unset";
    serverDiv.style.display = "none";
    canvasDiv.style.display = "none";
    lobbyDiv.style.display = "none";
    synthControlsDiv.style.display = "none";
    drumControlsDiv.style.display = "none";
    // fxControlsDiv.style.display = "none";
    document.body.style.backgroundColor = "#FFFFFF";
  }
  if(room == "serverRoom"){
    welcomeDiv.style.display = "none";
    serverDiv.style.display = "unset";
    canvasDiv.style.display = "none";
    lobbyDiv.style.display = "unset";
    document.body.style.backgroundColor = "#FFFFFF";
  }
  if(room == "gameRoom"){
    welcomeDiv.style.display = "none";
    serverDiv.style.display = "none";
    canvasDiv.style.display = "unset";
    lobbyDiv.style.display = "none";
    document.body.style.backgroundColor = "#FFFFFF";
  }
}

changeRoom("welcomeRoom");


let myName;
//namebox event listeners
button.addEventListener("click", ()=>{
  let nameValue = namebox.value.trim();
  myName = nameValue;
  if(nameValue != ""){
    socket.emit("name", nameValue);
    changeRoom("serverRoom");
  } else {
    namebox.placeholder = "Please enter a name";
    namebox.value = "";
  }
})

namebox.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    button.click();
  }
})


//event listeners for clicking the room icons to join the rooms
orchestraIcon.addEventListener("click", ()=>{
  if(orchestraRoomPlayers.length < 2){
    console.log("joining orchestra room");
    changeRoom("gameRoom");
    joinRoom("orchestra");
  } else {
    console.log("orchestra room was full");
  }
})

rockIcon.addEventListener("click", ()=>{
  if(rockRoomPlayers.length < 2){
    console.log("joining rock room");
    changeRoom("gameRoom");
    joinRoom("rock");
  } else {
    console.log("rock room was full");
  }
})

electronicIcon.addEventListener("click", ()=>{
  if(electronicRoomPlayers.length < 2){
    console.log("joining electronic room");
    changeRoom("gameRoom");
    joinRoom("electronic");
  } else {
    console.log("electronic room was full");
  }
})




//these functions send inputs to the server
function sendMouseCoords(x, y){
  // console.log("x: " + x);
  // console.log("y: " + y);
}


function sendWheelInfo(change){
  change = change*2;
  wheelValue = wheelValue + change;
  console.log(wheelValue);
}





socket.on("activePlayers", (players)=>{
  sessionID = socket.id;
  console.log("my ID is " + sessionID);
  activePlayers = [];

  for(let i = 0; i < players.length; i++){
    activePlayers.push(players[i]);
  }
  console.log(activePlayers);
  lobbyActivePlayersDiv.innerHTML = "";
  for(let i = 0; i < activePlayers.length; i++){
    console.log("adding " + activePlayers[i] + " to the list");
    let h5 = document.createElement("h5");
    h5.innerHTML = activePlayers[i];
    lobbyActivePlayersDiv.appendChild(h5);
  }
})

socket.on("activePlayersIDs", (ids)=>{
  activePlayersIDs = [];
  for(let i = 0; i < ids.length; i++){
    activePlayersIDs.push(ids[i]);
  }
  console.log(activePlayersIDs);
})


socket.on("orchestraRoomPlayers", (players)=>{
  orchestraRoomPlayers = [];

  for(let i = 0; i < players.length; i++){
    orchestraRoomPlayers.push(players[i]);
  }
  console.log(orchestraRoomPlayers);
  orchestraRoomActivePlayersDiv.innerHTML = "";
  for(let i = 0; i < orchestraRoomPlayers.length; i++){
    console.log("adding " + orchestraRoomPlayers[i] + " to the list");
    let h5 = document.createElement("h5");
    h5.innerHTML = orchestraRoomPlayers[i];
    orchestraRoomActivePlayersDiv.appendChild(h5);
  }
  playersInMyRoomDiv.innerHTML = "";
  for(let i = 0; i < orchestraRoomPlayers.length; i++){
    console.log("adding " + orchestraRoomPlayers[i] + " to the list");
    let h5 = document.createElement("h5");
    h5.innerHTML = orchestraRoomPlayers[i];
    playersInMyRoomDiv.appendChild(h5);
  }
  orchestraRoomPlayerCountText.innerHTML = "Orchestra Room: (" + orchestraRoomPlayers.length + "/2)"
})

socket.on("orchestraRoomPlayersIDs", (ids)=>{
  orchestraRoomPlayersIDs = [];
  for(let i = 0; i < ids.length; i++){
    orchestraRoomPlayersIDs.push(ids[i]);
  }
  console.log(orchestraRoomPlayersIDs);
})



socket.on("rockRoomPlayers", (players)=>{
  rockRoomPlayers = [];

  for(let i = 0; i < players.length; i++){
    rockRoomPlayers.push(players[i]);
  }
  console.log(rockRoomPlayers);
  rockRoomActivePlayersDiv.innerHTML = "";
  for(let i = 0; i < rockRoomPlayers.length; i++){
    console.log("adding " + rockRoomPlayers[i] + " to the list");
    let h5 = document.createElement("h5");
    h5.innerHTML = rockRoomPlayers[i];
    rockRoomActivePlayersDiv.appendChild(h5);
  }
  playersInMyRoomDiv.innerHTML = "";
  for(let i = 0; i < rockRoomPlayers.length; i++){
    console.log("adding " + rockRoomPlayers[i] + " to the list");
    let h5 = document.createElement("h5");
    h5.innerHTML = rockRoomPlayers[i];
    playersInMyRoomDiv.appendChild(h5);
  }
  rockRoomPlayerCountText.innerHTML = "Rock Room: (" + rockRoomPlayers.length + "/2)"
})

socket.on("rockRoomPlayersIDs", (ids)=>{
  rockRoomPlayersIDs = [];
  for(let i = 0; i < ids.length; i++){
    rockRoomPlayersIDs.push(ids[i]);
  }
  console.log(rockRoomPlayersIDs);
})


socket.on("electronicRoomPlayers", (players)=>{
  electronicRoomPlayers = [];

  for(let i = 0; i < players.length; i++){
    electronicRoomPlayers.push(players[i]);
  }
  console.log(electronicRoomPlayers);
  electronicRoomActivePlayersDiv.innerHTML = "";
  for(let i = 0; i < electronicRoomPlayers.length; i++){
    console.log("adding " + electronicRoomPlayers[i] + " to the list");
    let h5 = document.createElement("h5");
    h5.innerHTML = electronicRoomPlayers[i];
    electronicRoomActivePlayersDiv.appendChild(h5);
  }
  playersInMyRoomDiv.innerHTML = "";
  for(let i = 0; i < electronicRoomPlayers.length; i++){
    console.log("adding " + electronicRoomPlayers[i] + " to the list");
    let h5 = document.createElement("h5");
    h5.innerHTML = electronicRoomPlayers[i];
    playersInMyRoomDiv.appendChild(h5);
  }
  electronicRoomPlayerCountText.innerHTML = "Electronic Room: (" + electronicRoomPlayers.length + "/2)"
})

socket.on("electronicRoomPlayersIDs", (ids)=>{
  electronicRoomPlayersIDs = [];
  for(let i = 0; i < ids.length; i++){
    electronicRoomPlayersIDs.push(ids[i]);
  }
  console.log(electronicRoomPlayersIDs);
})


socket.on("orchestraSynthTaken", (boolean)=>{
  orchestraSynthTaken = boolean;
  if(boolean == true){
    if(currentRoom == "orchestra"){
      synthRoleButton.style.backgroundColor = "white";
      synthRoleButton.style.color = "black";
    }
  } else {
    if(currentRoom == "orchestra"){
      synthRoleButton.style.backgroundColor = "black";
      synthRoleButton.style.color = "white";
    }
  }
})

socket.on("orchestraDrumTaken", (boolean)=>{
  orchestraDrumTaken = boolean;
  if(boolean == true){
    if(currentRoom == "orchestra"){
      drumRoleButton.style.backgroundColor = "white";
      drumRoleButton.style.color = "black";
    }
  } else {
    if(currentRoom == "orchestra"){
      drumRoleButton.style.backgroundColor = "black";
      drumRoleButton.style.color = "white";
    }
  }
})

socket.on("rockSynthTaken", (boolean)=>{
  rockSynthTaken = boolean;
  if(boolean == true){
    if(currentRoom == "rock"){
      synthRoleButton.style.backgroundColor = "white";
      synthRoleButton.style.color = "black";
    }
  } else {
    if(currentRoom == "rock"){
      synthRoleButton.style.backgroundColor = "black";
      synthRoleButton.style.color = "white";
    }
  }
})

socket.on("rockDrumTaken", (boolean)=>{
  rockDrumTaken = boolean;
  if(boolean == true){
    if(currentRoom == "rock"){
      drumRoleButton.style.backgroundColor = "white";
      drumRoleButton.style.color = "black";
    }
  } else {
    if(currentRoom == "rock"){
      drumRoleButton.style.backgroundColor = "black";
      drumRoleButton.style.color = "white";
    }
  }
})

socket.on("electronicSynthTaken", (boolean)=>{
  electronicSynthTaken = boolean;
  if(boolean == true){
    if(currentRoom == "electronic"){
      synthRoleButton.style.backgroundColor = "white";
      synthRoleButton.style.color = "black";
    }
  } else {
    if(currentRoom == "electronic"){
      synthRoleButton.style.backgroundColor = "black";
      synthRoleButton.style.color = "white";
    }
  }
})

socket.on("electronicDrumTaken", (boolean)=>{
  electronicDrumTaken = boolean;
  if(boolean == true){
    if(currentRoom == "electronic"){
      drumRoleButton.style.backgroundColor = "white";
      drumRoleButton.style.color = "black";
    }
  } else {
    if(currentRoom == "electronic"){
      drumRoleButton.style.backgroundColor = "black";
      drumRoleButton.style.color = "white";
    }
  }
})






socket.on("playDrum", (number)=>{
  drumFromServer = true;
  playDrum(number, currentRoom);
})

socket.on("playNote", (number)=>{
  if(currentRoom == "orchestra"){
    if(number == 1){
      Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
        french_horn.play('G4').stop(ac.currentTime + orchestraShortRelease);
      })
    }
    if(number == 2){
      Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
        french_horn.play('F4').stop(ac.currentTime + orchestraShortRelease);
      })
    }
    if(number == 3){
      Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
        french_horn.play('Eb4').stop(ac.currentTime + orchestraShortRelease);
      })
    }
    if(number == 4){
      Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
        french_horn.play('D4').stop(ac.currentTime + orchestraShortRelease);
      })
    }
    if(number == 5){
      Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
        french_horn.play('C4').stop(ac.currentTime + orchestraShortRelease);
      })
    }
    if(number == 6){
      Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
        french_horn.play('Bb3').stop(ac.currentTime + orchestraShortRelease);
      })
    }
    if(number == 7){
      Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
        french_horn.play('A3').stop(ac.currentTime + orchestraShortRelease);
      })
    }
    if(number == 8){
      Soundfont.instrument(ac, 'french_horn').then(function (french_horn) {
        french_horn.play('G3').stop(ac.currentTime + orchestraShortRelease);
      })
    }
  }

  if(currentRoom == "rock"){
    if(number == 1){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('C4').stop(ac.currentTime + rockShortRelease);
      })
    }
    if(number == 2){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('B3').stop(ac.currentTime + rockShortRelease);
      })
    }
    if(number == 3){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('A3').stop(ac.currentTime + rockShortRelease);
      })
    }
    if(number == 4){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('G3').stop(ac.currentTime + rockShortRelease);
      })
    }
    if(number == 5){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('F3').stop(ac.currentTime + rockShortRelease);
      })
    }
    if(number == 6){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('E3').stop(ac.currentTime + rockShortRelease);
      })
    }
    if(number == 7){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('D3').stop(ac.currentTime + rockShortRelease);
      })
    }
    if(number == 8){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('C3').stop(ac.currentTime + rockShortRelease);
      })
    }
  }
  if(currentRoom == "electronic"){
    if(number == 1){
      Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
        synth_brass_1.play('Eb5').stop(ac.currentTime + electronicShortRelease);
      })
    }
    if(number == 2){
      Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
        synth_brass_1.play('D5').stop(ac.currentTime + electronicShortRelease);
      })
    }
    if(number == 3){
      Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
        synth_brass_1.play('C5').stop(ac.currentTime + electronicShortRelease);
      })
    }
    if(number == 4){
      Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
        synth_brass_1.play('Bb4').stop(ac.currentTime + electronicShortRelease);
      })
    }
    if(number == 5){
      Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
        synth_brass_1.play('Ab4').stop(ac.currentTime + electronicShortRelease);
      })
    }
    if(number == 6){
      Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
        synth_brass_1.play('G4').stop(ac.currentTime + electronicShortRelease);
      })
    }
    if(number == 7){
      Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
        synth_brass_1.play('F4').stop(ac.currentTime + electronicShortRelease);
      })
    }
    if(number == 8){
      Soundfont.instrument(ac, 'synth_brass_1').then(function (synth_brass_1) {
        synth_brass_1.play('Eb4').stop(ac.currentTime + electronicShortRelease);
      })
    }
  }
})

socket.on("playChord", (number)=>{
  if(currentRoom == "orchestra"){
    if(number == 1){
      Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
        choir_aahs.play('D5').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('Bb4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('G4').stop(ac.currentTime + orchestraLongRelease);
      })
    }
    if(number == 2){
      Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
        choir_aahs.play('C5').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('A4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('F4').stop(ac.currentTime + orchestraLongRelease);
      })
    }
    if(number == 3){
      Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
        choir_aahs.play('Bb4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('G4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('Eb4').stop(ac.currentTime + orchestraLongRelease);
      })
    }
    if(number == 4){
      Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
        choir_aahs.play('A4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('F4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('D4').stop(ac.currentTime + orchestraLongRelease);
      })
    }
    if(number == 5){
      Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
        choir_aahs.play('G4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('Eb4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('C4').stop(ac.currentTime + orchestraLongRelease);
      })
    }
    if(number == 6){
      Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
        choir_aahs.play('F4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('D4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('Bb3').stop(ac.currentTime + orchestraLongRelease);
      })
    }
    if(number == 7){
      Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
        choir_aahs.play('Eb4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('C4').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('A3').stop(ac.currentTime + orchestraLongRelease);
      })
    }
    if(number == 8){
      Soundfont.instrument(ac, 'choir_aahs').then(function (choir_aahs) {
        choir_aahs.play('D3').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('Bb3').stop(ac.currentTime + orchestraLongRelease);
        choir_aahs.play('G3').stop(ac.currentTime + orchestraLongRelease);
      })
    }
  }

  if(currentRoom == "rock"){
    if(number == 1){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('G4').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('E4').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('C4').stop(ac.currentTime + rockLongRelease);
      })
    }
    if(number == 2){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('F4').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('D4').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('B3').stop(ac.currentTime + rockLongRelease);
      })
    }
    if(number == 3){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('E4').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('C4').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('A3').stop(ac.currentTime + rockLongRelease);
      })
    }
    if(number == 4){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('D4').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('B3').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('G3').stop(ac.currentTime + rockLongRelease);
      })
    }
    if(number == 5){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('C4').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('A3').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('F3').stop(ac.currentTime + rockLongRelease);
      })
    }
    if(number == 6){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('B3').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('G3').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('E3').stop(ac.currentTime + rockLongRelease);
      })
    }
    if(number == 7){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('A3').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('F3').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('D3').stop(ac.currentTime + rockLongRelease);
      })
    }
    if(number == 8){
      Soundfont.instrument(ac, 'overdriven_guitar').then(function (overdriven_guitar) {
        overdriven_guitar.play('G3').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('E3').stop(ac.currentTime + rockLongRelease);
        overdriven_guitar.play('C3').stop(ac.currentTime + rockLongRelease);
      })
    }
  }
  if(currentRoom == "electronic"){
    if(number == 1){
      Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
        pad_3_polysynth.play('Bb4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('G4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('Eb4').stop(ac.currentTime + electronicLongRelease);
      })
    }
    if(number == 2){
      Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
        pad_3_polysynth.play('Ab4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('F4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('D4').stop(ac.currentTime + electronicLongRelease);
      })
    }
    if(number == 3){
      Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
        pad_3_polysynth.play('G4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('Eb4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('C4').stop(ac.currentTime + electronicLongRelease);
      })
    }
    if(number == 4){
      Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
        pad_3_polysynth.play('F4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('D4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('Bb3').stop(ac.currentTime + electronicLongRelease);
      })
    }
    if(number == 5){
      Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
        pad_3_polysynth.play('Eb4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('C4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('Ab3').stop(ac.currentTime + electronicLongRelease);
      })
    }
    if(number == 6){
      Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
        pad_3_polysynth.play('D4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('Bb3').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('G3').stop(ac.currentTime + electronicLongRelease);
      })
    }
    if(number == 7){
      Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
        pad_3_polysynth.play('C4').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('Ab3').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('F3').stop(ac.currentTime + electronicLongRelease);
      })
    }
    if(number == 8){
      Soundfont.instrument(ac, 'pad_3_polysynth').then(function (pad_3_polysynth) {
        pad_3_polysynth.play('Bb3').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('G3').stop(ac.currentTime + electronicLongRelease);
        pad_3_polysynth.play('Eb3').stop(ac.currentTime + electronicLongRelease);
      })
    }
  }
})




socket.on("drawNote", (mouseX, mouseY)=>{
  receivedNoteToDraw = true;
  receivedNoteX = mouseX;
  receivedNoteY= mouseY;
})

socket.on("drawChord", (mouseX, mouseY)=>{
  receivedChordToDraw = true;
  receivedChordX = mouseX;
  receivedChordY= mouseY;
})


let orchestraShortReleaseSlider = document.getElementById("orchestraShortReleaseSlider");
let orchestraLongReleaseSlider = document.getElementById("orchestraLongReleaseSlider");


socket.on("orchestraShortReleaseSliderValue", (sliderValue)=>{
  orchestraShortReleaseSlider.value = sliderValue;
})

socket.on("orchestraShortRelease", (orchestraShortReleaseFromServer)=>{
  orchestraShortRelease = orchestraShortReleaseFromServer;
})

socket.on("orchestraLongReleaseSliderValue", (sliderValue)=>{
  orchestraLongReleaseSlider.value = sliderValue;
})

socket.on("orchestraLongRelease", (orchestraLongReleaseFromServer)=>{
  orchestraLongRelease = orchestraLongReleaseFromServer;
})

socket.on("rockShortReleaseSliderValue", (sliderValue)=>{
  rockShortReleaseSlider.value = sliderValue;
})

socket.on("rockShortRelease", (rockShortReleaseFromServer)=>{
  rockShortRelease = rockShortReleaseFromServer;
})

socket.on("rockLongReleaseSliderValue", (sliderValue)=>{
  rockLongReleaseSlider.value = sliderValue;
})

socket.on("rockLongRelease", (rockLongReleaseFromServer)=>{
  rockLongRelease = rockLongReleaseFromServer;
})

socket.on("electronicShortReleaseSliderValue", (sliderValue)=>{
  electronicShortReleaseSlider.value = sliderValue;
})

socket.on("electronicShortRelease", (electronicShortReleaseFromServer)=>{
  electronicShortRelease = electronicShortReleaseFromServer;
})

socket.on("electronicLongReleaseSliderValue", (sliderValue)=>{
  electronicLongReleaseSlider.value = sliderValue;
})

socket.on("electronicLongRelease", (electronicLongReleaseFromServer)=>{
  electronicLongRelease = electronicLongReleaseFromServer;
})



orchestraShortReleaseSlider.addEventListener("change", ()=>{
  orchestraShortRelease = orchestraShortReleaseSlider.value/1000;
  console.log("Orchestra Short Release is now: " + orchestraShortRelease + "s");
  socket.emit("orchestraShortReleaseSliderChanged", orchestraShortReleaseSlider.value);
})

orchestraLongReleaseSlider.addEventListener("change", ()=>{
  orchestraLongRelease = orchestraLongReleaseSlider.value/1000;
  console.log("Orchestra Long Release is now: " + orchestraLongRelease + "s");
  socket.emit("orchestraLongReleaseSliderChanged", orchestraLongReleaseSlider.value);
})

let rockShortReleaseSlider = document.getElementById("rockShortReleaseSlider");
let rockLongReleaseSlider = document.getElementById("rockLongReleaseSlider");

rockShortReleaseSlider.addEventListener("change", ()=>{
  rockShortRelease = rockShortReleaseSlider.value/1000;
  console.log("Rock Short Release is now: " + rockShortRelease + "s");
  socket.emit("rockShortReleaseSliderChanged", rockShortReleaseSlider.value);
})

rockLongReleaseSlider.addEventListener("change", ()=>{
  rockLongRelease = rockLongReleaseSlider.value/1000;
  console.log("Rock Long Release is now: " + rockLongRelease + "s");
  socket.emit("rockLongReleaseSliderChanged", rockLongReleaseSlider.value);
})

let electronicShortReleaseSlider = document.getElementById("electronicShortReleaseSlider");
let electronicLongReleaseSlider = document.getElementById("electronicLongReleaseSlider");

electronicShortReleaseSlider.addEventListener("change", ()=>{
  electronicShortRelease = electronicShortReleaseSlider.value/1000;
  console.log("Electronic Short Release is now: " + electronicShortRelease + "s");
  socket.emit("electronicShortReleaseSliderChanged", electronicShortReleaseSlider.value);
})

electronicLongReleaseSlider.addEventListener("change", ()=>{
  electronicLongRelease = electronicLongReleaseSlider.value/1000;
  console.log("Electronic Long Release is now: " + electronicLongRelease + "s");
  socket.emit("electronicLongReleaseSliderChanged", electronicLongReleaseSlider.value);
})



let drumCircleSize = 35;

function draw(){
  background(0, 0, 0, 20);

  if(currentRole == null){
    fill(255);
    textSize(30);
    strokeWeight(0);
    textAlign(CENTER, CENTER);
    textFont(courier);
    text('Select a role', 200, 185);
    text('to begin.', 200, 215);
  }



  //cursor circle
  strokeWeight(5);
  stroke(0);
  if(currentRoom == "orchestra"){
    fill("#d3b792")
  }
  if(currentRoom == "rock"){
    fill("#e96464")
  }
  if(currentRoom == "electronic"){
    fill("#76e776")
  }





  if(currentRole == "synth"){
    stroke(255);
    line(-10, 50, 410, 50);
    line(-10, 100, 410, 100);
    line(-10, 150, 410, 150);
    line(-10, 200, 410, 200);
    line(-10, 250, 410, 250);
    line(-10, 300, 410, 300);
    line(-10, 350, 410, 350);
  }

  if(currentRole == "drum"){
    stroke(255);
    line(200, -10, 200, 410);
    line(-10, 200, 410, 200);
    line(-10, 100, 410, 100);
    line(-10, 300, 410, 300);
  }



  // ellipse(mouseX, mouseY, 20, 20);

  if(currentRole == "synth"){
    if(circleToFill == true){
      if(spaceDown == true){
        if(currentRoom == "orchestra"){
          socket.emit("drawOrchestraChord", sessionID, mouseX, mouseY);
        }
        if(currentRoom == "rock"){
          socket.emit("drawRockChord", sessionID, mouseX, mouseY);
        }
        if(currentRoom == "electronic"){
          socket.emit("drawElectronicChord", sessionID, mouseX, mouseY);
        }
        ellipse(mouseX, mouseY, 150, 150);
      } else {
        if(currentRoom == "orchestra"){
          socket.emit("drawOrchestraNote", sessionID, mouseX, mouseY);
        }
        if(currentRoom == "rock"){
          socket.emit("drawRockNote", sessionID, mouseX, mouseY);
        }
        if(currentRoom == "electronic"){
          socket.emit("drawElectronicNote", sessionID, mouseX, mouseY);
        }
        ellipse(mouseX, mouseY, 50, 50);
      }
      circleToFill = false;
    }
  }

  if(receivedNoteToDraw == true){
    stroke(255);
    ellipse(receivedNoteX, receivedNoteY, 50, 50);
    receivedNoteToDraw = false;
  }

  if(receivedChordToDraw == true){
    stroke(255);
    ellipse(receivedChordX, receivedChordY, 150, 150);
    receivedChordToDraw = false;
  }


  fill(255);
  strokeWeight(0);
  if(drum1ToFill == true){
    ellipse(100, 50, drumCircleSize, drumCircleSize);
    drum1ToFill = false;
  }
  if(drum2ToFill == true){
    ellipse(300, 50, drumCircleSize, drumCircleSize);
    drum2ToFill = false;
  }
  if(drum3ToFill == true){
    ellipse(100, 150, drumCircleSize, drumCircleSize);
    drum3ToFill = false;
  }
  if(drum4ToFill == true){
    ellipse(300, 150, drumCircleSize, drumCircleSize);
    drum4ToFill = false;

  }
  if(drum5ToFill == true){
    ellipse(100, 250, drumCircleSize, drumCircleSize);
    drum5ToFill = false;

  }
  if(drum6ToFill == true){
    ellipse(300, 250, drumCircleSize, drumCircleSize);
    drum6ToFill = false;

  }
  if(drum7ToFill == true){
    ellipse(100, 350, drumCircleSize, drumCircleSize);
    drum7ToFill = false;

  }
  if(drum8ToFill == true){
    ellipse(300, 350, drumCircleSize, drumCircleSize);
    drum8ToFill = false;
  }

}