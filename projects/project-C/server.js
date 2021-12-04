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

  socket.on('orchestraSynthTaken', (boolean)=>{
    io.emit('orchestraSynthTaken', boolean);
  })

  socket.on('orchestraDrumTaken', (boolean)=>{
    io.emit('orchestraDrumTaken', boolean);
  })

  socket.on('rockSynthTaken', (boolean)=>{
    io.emit('rockSynthTaken', boolean);
  })

  socket.on('rockDrumTaken', (boolean)=>{
    io.emit('rockDrumTaken', boolean);
  })

  socket.on('electronicSynthTaken', (boolean)=>{
    io.emit('electronicSynthTaken', boolean);
  })

  socket.on('electronicDrumTaken', (boolean)=>{
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
    io.emit("orchestraShortReleaseSliderValue", sliderValue);
    io.emit("orchestraShortRelease", sliderValue/1000);
  })

  socket.on("orchestraLongReleaseSliderChanged", (sliderValue)=>{
    io.emit("orchestraLongReleaseSliderValue", sliderValue);
    io.emit("orchestraLongRelease", sliderValue/1000);
  })

  socket.on("rockShortReleaseSliderChanged", (sliderValue)=>{
    io.emit("rockShortReleaseSliderValue", sliderValue);
    io.emit("rockShortRelease", sliderValue/1000);
  })

  socket.on("rockLongReleaseSliderChanged", (sliderValue)=>{
    io.emit("rockLongReleaseSliderValue", sliderValue);
    io.emit("rockLongRelease", sliderValue/1000);
  })

  socket.on("electronicShortReleaseSliderChanged", (sliderValue)=>{
    io.emit("electronicShortReleaseSlider", sliderValue);
    io.emit("electronicShortRelease", sliderValue/1000);
  })

  socket.on("electronicLongReleaseSliderChanged", (sliderValue)=>{
    io.emit("electronicLongReleaseSlider", sliderValue);
    io.emit("electronicLongRelease", sliderValue/1000);
  })
});



http.listen(3000, () => {
  console.log('listening on *:3000');
});
