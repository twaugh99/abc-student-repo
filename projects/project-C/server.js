let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);


app.use(express.static('public'))


let activePlayers = [];
let activePlayersIDs = [];

let orchestraRoomPlayers = [];
let orchestraRoomPlayersIDs = [];

let rockRoomPlayers = [];
let rockRoomPlayersIDs = [];

let electronicRoomPlayers = [];
let electronicRoomPlayersIDs = [];

let orchestraMelodyVolume;
let orchestraChordVolume;
let rockMelodyVolume;
let rockChordVolume;
let electronicMelodyVolume;
let electronicChordVolume;
let orchestraMelodyRelease;
let orchestraChordRelease;
let rockMelodyRelease;
let rockChordRelease;
let electronicMelodyRelease;
let electronicChordRelease;
let drum1orchestra;
let drum2orchestra;
let drum3orchestra;
let drum4orchestra;
let drum5orchestra;
let drum6orchestra;
let drum7orchestra;
let drum8orchestra;
let drum1rock;
let drum2rock;
let drum3rock;
let drum4rock;
let drum5rock;
let drum6rock;
let drum7rock;
let drum8rock;
let drum1electronic;
let drum2electronic;
let drum3electronic;
let drum4electronic;
let drum5electronic;
let drum6electronic;
let drum7electronic;
let drum8electronic;

let orchestraSynthTaken;
let orchestraDrumTaken;
let rockSynthTaken;
let rockDrumTaken;
let electronicSynthTaken;
let electronicDrumTaken;


let orchestraSynthPlayerID;
let orchestraDrumPlayerID;
let rockSynthPlayerID;
let rockDrumPlayerID;
let electronicSynthPlayerID;
let electronicDrumPlayerID;


io.on('connection', (socket)=>{
  console.log('a player connected', socket.id);
  io.emit("orchestraRoomPlayers", orchestraRoomPlayers);
  io.emit("orchestraRoomPlayersIDs", orchestraRoomPlayersIDs);
  io.emit("rockRoomPlayers", rockRoomPlayers);
  io.emit("rockRoomPlayersIDs", rockRoomPlayersIDs);
  io.emit("electronicRoomPlayers", electronicRoomPlayers);
  io.emit("electronicRoomPlayersIDs", electronicRoomPlayersIDs);
  io.emit("activePlayers", activePlayers);
  io.emit("activePlayersIDs", activePlayersIDs);


  if(orchestraSynthTaken != null){
    io.emit("orchestraSynthTaken", orchestraSynthTaken);
  }

  if(orchestraDrumTaken != null){
    io.emit("orchestraDrumTaken", orchestraDrumTaken);
  }

  if(rockSynthTaken != null){
    io.emit("rockSynthTaken", rockSynthTaken);
  }

  if(rockDrumTaken != null){
    io.emit("rockDrumTaken", rockDrumTaken);
  }

  if(electronicSynthTaken != null){
    io.emit("electronicSynthTaken", electronicSynthTaken);
  }

  if(electronicDrumTaken != null){
    io.emit("electronicDrumTaken", electronicDrumTaken);
  }

  if(orchestraMelodyRelease != null){
    io.emit("orchestraShortReleaseSliderValue", orchestraMelodyRelease*1000);
    io.emit("orchestraShortRelease", orchestraMelodyRelease);
  }

  if(orchestraChordRelease != null){
    io.emit("orchestraLongReleaseSliderValue", orchestraChordRelease*1000);
    io.emit("orchestraLongRelease", orchestraChordRelease);
  }

  if(rockMelodyRelease != null){
    io.emit("rockShortReleaseSliderValue", rockMelodyRelease*1000);
    io.emit("rockShortRelease", rockMelodyRelease);
  }

  if(rockChordRelease != null){
    io.emit("rockLongReleaseSliderValue", rockChordRelease*1000);
    io.emit("rockLongRelease", rockChordRelease);
  }

  if(electronicMelodyRelease != null){
    io.emit("electronicShortReleaseSliderValue", electronicMelodyRelease*1000);
    io.emit("electronicShortRelease", electronicMelodyRelease);
  }

  if(rockChordRelease != null){
    io.emit("electronicLongReleaseSliderValue", electronicChordRelease*1000);
    io.emit("electronicLongRelease", electronicChordRelease);
  }


  socket.on('disconnect', ()=>{
    console.log('a player disconnected', socket.id);

    for(let i = 0; i < activePlayersIDs.length; i++){
      if(socket.id == activePlayersIDs[i]){
        activePlayersIDs.splice(i, 1);
        activePlayers.splice(i, 1);
        console.log(activePlayers);
        console.log(activePlayersIDs);
        io.emit("activePlayers", activePlayers);
        io.emit("activePlayersIDs", activePlayersIDs);
      }
    }
    for(let i = 0; i < orchestraRoomPlayersIDs.length; i++){
      if(socket.id == orchestraRoomPlayersIDs[i]){
        orchestraRoomPlayers.splice(i, 1);
        orchestraRoomPlayersIDs.splice(i, 1);
        console.log(orchestraRoomPlayers);
        console.log(orchestraRoomPlayersIDs);
        io.emit("orchestraRoomPlayers", orchestraRoomPlayers);
        io.emit("orchestraRoomPlayersIDs", orchestraRoomPlayersIDs);
      }
    }

    for(let i = 0; i < rockRoomPlayersIDs.length; i++){
      if(socket.id == rockRoomPlayersIDs[i]){
        rockRoomPlayers.splice(i, 1);
        rockRoomPlayersIDs.splice(i, 1);
        console.log(rockRoomPlayers);
        console.log(rockRoomPlayersIDs);
        io.emit("rockRoomPlayers", rockRoomPlayers);
        io.emit("rockRoomPlayersIDs", rockRoomPlayersIDs);
      }
    }

    for(let i = 0; i < electronicRoomPlayersIDs.length; i++){
      if(socket.id == electronicRoomPlayersIDs[i]){
        electronicRoomPlayers.splice(i, 1);
        electronicRoomPlayersIDs.splice(i, 1);
        console.log(electronicRoomPlayers);
        console.log(electronicRoomPlayersIDs);
        io.emit("electronicRoomPlayers", electronicRoomPlayers);
        io.emit("electronicRoomPlayersIDs", electronicRoomPlayersIDs);
      }
    }

    if(socket.id == orchestraSynthPlayerID){
      orchestraSynthTaken = false;
      io.emit("orchestraSynthTaken", false);
    }

    if(socket.id == orchestraDrumPlayerID){
      orchestraDrumTaken = false;
      io.emit("orchestraDrumTaken", false);
    }

    if(socket.id == rockSynthPlayerID){
      rockSynthTaken = false;
      io.emit("rockSynthTaken", false);
    }

    if(socket.id == rockDrumPlayerID){
      rockDrumTaken = false;
      io.emit("rockDrumTaken", false);
    }

    if(socket.id == electronicSynthPlayerID){
      electronicSynthTaken = false;
      io.emit("electronicSynthTaken", false);
    }

    if(socket.id == electronicDrumPlayerID){
      electronicDrumTaken = false;
      io.emit("electronicDrumTaken", false);
    }

  });
  socket.on('name', (name)=>{
    activePlayers.push(name);
    activePlayersIDs.push(socket.id);
    console.log(activePlayers);
    console.log(activePlayersIDs);
    io.emit("activePlayers", activePlayers);
    io.emit("activePlayersIDs", activePlayersIDs);
  });

  socket.on("joinedOrchestra", ()=>{
    console.log(socket.id + " joined the orchestra room");
    for(let i = 0; i < activePlayersIDs.length; i++){
      if(activePlayersIDs[i] == socket.id){
        orchestraRoomPlayers.push(activePlayers[i])
        orchestraRoomPlayersIDs.push(socket.id);
        activePlayersIDs.splice(i, 1);
        activePlayers.splice(i, 1);
        io.emit("orchestraRoomPlayers", orchestraRoomPlayers);
        io.emit("orchestraRoomPlayersIDs", orchestraRoomPlayersIDs);
        io.emit("activePlayers", activePlayers);
        io.emit("activePlayersIDs", activePlayersIDs);
      }
    }
  });

  socket.on("joinedRock", ()=>{
    console.log(socket.id + " joined the rock room");
    for(let i = 0; i < activePlayersIDs.length; i++){
      if(activePlayersIDs[i] == socket.id){
        rockRoomPlayers.push(activePlayers[i])
        rockRoomPlayersIDs.push(socket.id);
        activePlayersIDs.splice(i, 1);
        activePlayers.splice(i, 1);
        io.emit("rockRoomPlayers", rockRoomPlayers);
        io.emit("rockRoomPlayersIDs", rockRoomPlayersIDs);
        io.emit("activePlayers", activePlayers);
        io.emit("activePlayersIDs", activePlayersIDs);
      }
    }
  });

  socket.on("joinedElectronic", ()=>{
    console.log(socket.id + " joined the electronic room");
    for(let i = 0; i < activePlayersIDs.length; i++){
      if(activePlayersIDs[i] == socket.id){
        electronicRoomPlayers.push(activePlayers[i])
        electronicRoomPlayersIDs.push(socket.id);
        activePlayersIDs.splice(i, 1);
        activePlayers.splice(i, 1);
        io.emit("electronicRoomPlayers", electronicRoomPlayers);
        io.emit("electronicRoomPlayersIDs", electronicRoomPlayersIDs);
        io.emit("activePlayers", activePlayers);
        io.emit("activePlayersIDs", activePlayersIDs);
      }
    }
  });

  socket.on("leftOrchestra", ()=>{
    console.log(socket.id + " left the orchestra room");
    for(let i = 0; i < orchestraRoomPlayers.length; i++){
      if(orchestraRoomPlayersIDs[i] == socket.id){
        activePlayers.push(orchestraRoomPlayers[i])
        activePlayersIDs.push(socket.id);
        orchestraRoomPlayersIDs.splice(i, 1);
        orchestraRoomPlayers.splice(i, 1);
      }
    }
    // console.log(activePlayers);
    // console.log(activePlayersIDs);
    io.emit("activePlayers", activePlayers);
    io.emit("activePlayersIDs", activePlayersIDs);
    io.emit("orchestraRoomPlayers", orchestraRoomPlayers);
    io.emit("orchestraRoomPlayersIDs", orchestraRoomPlayersIDs);
  });

  socket.on("leftRock", ()=>{
    console.log(socket.id + " left the rock room");
    for(let i = 0; i < rockRoomPlayers.length; i++){
      if(rockRoomPlayersIDs[i] == socket.id){
        activePlayers.push(rockRoomPlayers[i])
        activePlayersIDs.push(socket.id);
        rockRoomPlayersIDs.splice(i, 1);
        rockRoomPlayers.splice(i, 1);
      }
    }
    // console.log(activePlayers);
    // console.log(activePlayersIDs);
    io.emit("activePlayers", activePlayers);
    io.emit("activePlayersIDs", activePlayersIDs);
    io.emit("rockRoomPlayers", rockRoomPlayers);
    io.emit("rockRoomPlayersIDs", rockRoomPlayersIDs);
  });

  socket.on("leftElectronic", ()=>{
    console.log(socket.id + " left the electronic room");
    for(let i = 0; i < electronicRoomPlayers.length; i++){
      if(electronicRoomPlayersIDs[i] == socket.id){
        activePlayers.push(electronicRoomPlayers[i])
        activePlayersIDs.push(socket.id);
        electronicRoomPlayersIDs.splice(i, 1);
        electronicRoomPlayers.splice(i, 1);
      }
    }
    // console.log(activePlayers);
    // console.log(activePlayersIDs);
    io.emit("activePlayers", activePlayers);
    io.emit("activePlayersIDs", activePlayersIDs);
    io.emit("electronicRoomPlayers", electronicRoomPlayers);
    io.emit("electronicRoomPlayersIDs", electronicRoomPlayersIDs);
  });


  socket.on('message', (data)=>{
    console.log(data);
    if(data.room == "orchestra"){
      console.log("message was sent from orchestra room");
      //send message to everyone in orchestra room
      for(let i = 0; i < orchestraRoomPlayersIDs.length; i++){
        io.to(orchestraRoomPlayersIDs[i]).emit("incoming", data);
      }
    }
    if(data.room == "rock"){
      console.log("message was sent from rock room");
      //send message to everyone in rock room
      for(let i = 0; i < rockRoomPlayersIDs.length; i++){
        io.to(rockRoomPlayersIDs[i]).emit("incoming", data);
      }
    }
    if(data.room == "electronic"){
      console.log("message was sent from electronic room");
      //send message to everyone in electronic room
      for(let i = 0; i < electronicRoomPlayersIDs.length; i++){
        io.to(electronicRoomPlayersIDs[i]).emit("incoming", data);
      }
    }
  })

  socket.on('orchestraSynthTakenTOSERVER', (boolean, playerID)=>{
    orchestraSynthTaken = boolean;
    orchestraSynthPlayerID = playerID;
    console.log(orchestraSynthPlayerID);
    io.emit('orchestraSynthTaken', boolean);
  })

  socket.on('orchestraDrumTakenTOSERVER', (boolean, playerID)=>{
    orchestraDrumTaken = boolean;
    orchestraDrumPlayerID = playerID;
    io.emit('orchestraDrumTaken', boolean);
  })

  socket.on('rockSynthTakenTOSERVER', (boolean, playerID)=>{
    rockSynthTaken = boolean;
    rockSynthPlayerID = playerID;
    io.emit('rockSynthTaken', boolean);
  })

  socket.on('rockDrumTakenTOSERVER', (boolean, playerID)=>{
    rockDrumTaken = boolean;
    rockDrumPlayerID = playerID;
    io.emit('rockDrumTaken', boolean);
  })

  socket.on('electronicSynthTakenTOSERVER', (boolean, playerID)=>{
    electronicSynthTaken = boolean;
    electronicSynthPlayerID = playerID;
    io.emit('electronicSynthTaken', boolean);
  })

  socket.on('electronicDrumTakenTOSERVER', (boolean, playerID)=>{
    electronicDrumTaken = boolean;
    electronicDrumPlayerID = playerID;
    io.emit('electronicDrumTaken', boolean);
  })


  socket.on('orchestraDrumPlayed', (senderID, number)=>{
    for(let i = 0; i < orchestraRoomPlayersIDs.length; i++){
      if(senderID != orchestraRoomPlayersIDs[i]){
        io.to(orchestraRoomPlayersIDs[i]).emit("playDrum", number);
      }
    }
  })

  socket.on('rockDrumPlayed', (senderID, number)=>{
    for(let i = 0; i < rockRoomPlayersIDs.length; i++){
      if(senderID != rockRoomPlayersIDs[i]){
        io.to(rockRoomPlayersIDs[i]).emit("playDrum", number);
      }
    }
  })

  socket.on('electronicDrumPlayed', (senderID, number)=>{
    for(let i = 0; i < electronicRoomPlayersIDs.length; i++){
      if(senderID != electronicRoomPlayersIDs[i]){
        io.to(electronicRoomPlayersIDs[i]).emit("playDrum", number);
      }
    }
  })

  socket.on('orchestraNotePlayed', (senderID, number)=>{
    for(let i = 0; i < orchestraRoomPlayersIDs.length; i++){
      if(senderID != orchestraRoomPlayersIDs[i]){
        io.to(orchestraRoomPlayersIDs[i]).emit("playNote", number);
      }
    }
  })

  socket.on('rockNotePlayed', (senderID, number)=>{
    for(let i = 0; i < rockRoomPlayersIDs.length; i++){
      if(senderID != rockRoomPlayersIDs[i]){
        io.to(rockRoomPlayersIDs[i]).emit("playNote", number);
      }
    }
  })

  socket.on('electronicNotePlayed', (senderID, number)=>{
    for(let i = 0; i < electronicRoomPlayersIDs.length; i++){
      if(senderID != electronicRoomPlayersIDs[i]){
        io.to(electronicRoomPlayersIDs[i]).emit("playNote", number);
      }
    }
  })

  socket.on('orchestraChordPlayed', (senderID, number)=>{
    for(let i = 0; i < orchestraRoomPlayersIDs.length; i++){
      if(senderID != orchestraRoomPlayersIDs[i]){
        io.to(orchestraRoomPlayersIDs[i]).emit("playChord", number);
      }
    }
  })

  socket.on('rockChordPlayed', (senderID, number)=>{
    for(let i = 0; i < rockRoomPlayersIDs.length; i++){
      if(senderID != rockRoomPlayersIDs[i]){
        io.to(rockRoomPlayersIDs[i]).emit("playChord", number);
      }
    }
  })

  socket.on('electronicChordPlayed', (senderID, number)=>{
    for(let i = 0; i < electronicRoomPlayersIDs.length; i++){
      if(senderID != electronicRoomPlayersIDs[i]){
        io.to(electronicRoomPlayersIDs[i]).emit("playChord", number);
      }
    }
  })



  socket.on('drawOrchestraNote', (senderID, mouseX, mouseY)=>{
    for(let i = 0; i < orchestraRoomPlayersIDs.length; i++){
      if(senderID != orchestraRoomPlayersIDs[i]){
        io.to(orchestraRoomPlayersIDs[i]).emit("drawNote", mouseX, mouseY);
      }
    }
  })

  socket.on('drawRockNote', (senderID, mouseX, mouseY)=>{
    for(let i = 0; i < rockRoomPlayersIDs.length; i++){
      if(senderID != rockRoomPlayersIDs[i]){
        io.to(rockRoomPlayersIDs[i]).emit("drawNote", mouseX, mouseY);
      }
    }
  })

  socket.on('drawElectronicNote', (senderID, mouseX, mouseY)=>{
    for(let i = 0; i < electronicRoomPlayersIDs.length; i++){
      if(senderID != electronicRoomPlayersIDs[i]){
        io.to(electronicRoomPlayersIDs[i]).emit("drawNote", mouseX, mouseY);
      }
    }
  })

  socket.on('drawOrchestraChord', (senderID, mouseX, mouseY)=>{
    for(let i = 0; i < orchestraRoomPlayersIDs.length; i++){
      if(senderID != orchestraRoomPlayersIDs[i]){
        io.to(orchestraRoomPlayersIDs[i]).emit("drawChord", mouseX, mouseY);
      }
    }
  })

  socket.on('drawRockChord', (senderID, mouseX, mouseY)=>{
    for(let i = 0; i < rockRoomPlayersIDs.length; i++){
      if(senderID != rockRoomPlayersIDs[i]){
        io.to(rockRoomPlayersIDs[i]).emit("drawChord", mouseX, mouseY);
      }
    }
  })

  socket.on('drawElectronicChord', (senderID, mouseX, mouseY)=>{
    for(let i = 0; i < electronicRoomPlayersIDs.length; i++){
      if(senderID != electronicRoomPlayersIDs[i]){
        io.to(electronicRoomPlayersIDs[i]).emit("drawChord", mouseX, mouseY);
      }
    }
  })

  socket.on("orchestraShortReleaseSliderChanged", (sliderValue)=>{
    orchestraMelodyRelease = sliderValue/1000;
    io.emit("orchestraShortReleaseSliderValue", sliderValue);
    io.emit("orchestraShortRelease", sliderValue/1000);
  })

  socket.on("orchestraLongReleaseSliderChanged", (sliderValue)=>{
    orchestraChordRelease = sliderValue/1000;
    io.emit("orchestraLongReleaseSliderValue", sliderValue);
    io.emit("orchestraLongRelease", sliderValue/1000);
  })

  socket.on("rockShortReleaseSliderChanged", (sliderValue)=>{
    rockMelodyRelease = sliderValue/1000;
    io.emit("rockShortReleaseSliderValue", sliderValue);
    io.emit("rockShortRelease", sliderValue/1000);
  })

  socket.on("rockLongReleaseSliderChanged", (sliderValue)=>{
    rockChordRelease = sliderValue/1000;
    io.emit("rockLongReleaseSliderValue", sliderValue);
    io.emit("rockLongRelease", sliderValue/1000);
  })

  socket.on("electronicShortReleaseSliderChanged", (sliderValue)=>{
    electronicMelodyRelease = sliderValue/1000;
    io.emit("electronicShortReleaseSlider", sliderValue);
    io.emit("electronicShortRelease", sliderValue/1000);
  })

  socket.on("electronicLongReleaseSliderChanged", (sliderValue)=>{
    electronicChordRelease = sliderValue/1000;
    io.emit("electronicLongReleaseSlider", sliderValue);
    io.emit("electronicLongRelease", sliderValue/1000);
  })


  socket.on("orchestraDrum1VolumeSlider", (sliderValue)=>{
    io.emit("orchestraDrum1VolumeSliderChanged", sliderValue);
  })
  socket.on("orchestraDrum2VolumeSlider", (sliderValue)=>{
    io.emit("orchestraDrum2VolumeSliderChanged", sliderValue);
  })
  socket.on("orchestraDrum3VolumeSlider", (sliderValue)=>{
    io.emit("orchestraDrum3VolumeSliderChanged", sliderValue);
  })
  socket.on("orchestraDrum4VolumeSlider", (sliderValue)=>{
    io.emit("orchestraDrum4VolumeSliderChanged", sliderValue);
  })
  socket.on("orchestraDrum5VolumeSlider", (sliderValue)=>{
    io.emit("orchestraDrum5VolumeSliderChanged", sliderValue);
  })
  socket.on("orchestraDrum6VolumeSlider", (sliderValue)=>{
    io.emit("orchestraDrum6VolumeSliderChanged", sliderValue);
  })
  socket.on("orchestraDrum7VolumeSlider", (sliderValue)=>{
    io.emit("orchestraDrum7VolumeSliderChanged", sliderValue);
  })
  socket.on("orchestraDrum8VolumeSlider", (sliderValue)=>{
    io.emit("orchestraDrum8VolumeSliderChanged", sliderValue);
  })
  socket.on("rockDrum1VolumeSlider", (sliderValue)=>{
    io.emit("rockDrum1VolumeSliderChanged", sliderValue);
  })
  socket.on("rockDrum2VolumeSlider", (sliderValue)=>{
    io.emit("rockDrum2VolumeSliderChanged", sliderValue);
  })
  socket.on("rockDrum3VolumeSlider", (sliderValue)=>{
    io.emit("rockDrum3VolumeSliderChanged", sliderValue);
  })
  socket.on("rockDrum4VolumeSlider", (sliderValue)=>{
    io.emit("rockDrum4VolumeSliderChanged", sliderValue);
  })
  socket.on("rockDrum5VolumeSlider", (sliderValue)=>{
    io.emit("rockDrum5VolumeSliderChanged", sliderValue);
  })
  socket.on("rockDrum6VolumeSlider", (sliderValue)=>{
    io.emit("rockDrum6VolumeSliderChanged", sliderValue);
  })
  socket.on("rockDrum7VolumeSlider", (sliderValue)=>{
    io.emit("rockDrum7VolumeSliderChanged", sliderValue);
  })
  socket.on("rockDrum8VolumeSlider", (sliderValue)=>{
    io.emit("rockDrum8VolumeSliderChanged", sliderValue);
  })
  socket.on("electronicDrum1VolumeSlider", (sliderValue)=>{
    io.emit("electronicDrum1VolumeSliderChanged", sliderValue);
  })
  socket.on("electronicDrum2VolumeSlider", (sliderValue)=>{
    io.emit("electronicDrum2VolumeSliderChanged", sliderValue);
  })
  socket.on("electronicDrum3VolumeSlider", (sliderValue)=>{
    io.emit("electronicDrum3VolumeSliderChanged", sliderValue);
  })
  socket.on("electronicDrum4VolumeSlider", (sliderValue)=>{
    io.emit("electronicDrum4VolumeSliderChanged", sliderValue);
  })
  socket.on("electronicDrum5VolumeSlider", (sliderValue)=>{
    io.emit("electronicDrum5VolumeSliderChanged", sliderValue);
  })
  socket.on("electronicDrum6VolumeSlider", (sliderValue)=>{
    io.emit("electronicDrum6VolumeSliderChanged", sliderValue);
  })
  socket.on("electronicDrum7VolumeSlider", (sliderValue)=>{
    io.emit("electronicDrum7VolumeSliderChanged", sliderValue);
  })
  socket.on("electronicDrum8VolumeSlider", (sliderValue)=>{
    io.emit("electronicDrum8VolumeSliderChanged", sliderValue);
  })



  socket.on("orchestraMelodyVolumeSliderChanged", (sliderValue)=>{
    io.emit("orchestraMelodyVolumeSlider", sliderValue);
  })

  socket.on("orchestraChordVolumeSliderChanged", (sliderValue)=>{
    io.emit("orchestraChordVolumeSlider", sliderValue);
  })

  socket.on("rockMelodyVolumeSliderChanged", (sliderValue)=>{
    io.emit("rockMelodyVolumeSlider", sliderValue);
  })

  socket.on("rockChordVolumeSliderChanged", (sliderValue)=>{
    io.emit("rockChordVolumeSlider", sliderValue);
  })

  socket.on("electronicMelodyVolumeSliderChanged", (sliderValue)=>{
    io.emit("electronicMelodyVolumeSlider", sliderValue);
  })

  socket.on("electronicChordVolumeSliderChanged", (sliderValue)=>{
    io.emit("electronicChordVolumeSlider", sliderValue);
  })
});



http.listen(3000, () => {
  console.log('listening on *:3000');
});
