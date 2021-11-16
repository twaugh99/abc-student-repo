console.log('script loaded');

let socket = io();
let namebox = document.getElementById("namebox");
let button = document.getElementById("button");
let playersList = document.getElementById("playersList");
let playerCounterText = document.getElementById("playerCounterText");
let startGameButton = document.getElementById("startGameButton");

let sessionID;
let activePlayers = [];
let activePlayersIDs = [];

let isSimon = false;
let letterCurrentlyActive = false;

socket.on("players", (players)=>{
  sessionID = socket.id;
  console.log("my ID is " + sessionID);
  // console.log(players);
  activePlayers = [];

  for(let i = 0; i < players.length; i++){
    activePlayers.push(players[i]);
  }

  console.log(activePlayers);


  if(activePlayers.length == 1){
    playerCounterText.innerHTML = "1 player is currently online";
  } else {
    if(activePlayers.length > 0){
      playerCounterText.innerHTML = activePlayers.length + " players are currently online";
    } else {
      playerCounterText.innerHTML = "No players are currently online";
    }
  }

  if(activePlayers.length > 2){
    stage2HeaderText.innerHTML = "Waiting for Simon to start the game"
  } else {
    stage2HeaderText.innerHTML = "Waiting for Players"
  }

  playersList.innerHTML = "";
  for(let i = 0; i < activePlayers.length; i++){
    console.log("adding " + activePlayers[i] + " to the list");
    let h5 = document.createElement("h5");
    if(i == 0){
      h5.innerHTML = activePlayers[i] + "(Simon)";
    } else {
      h5.innerHTML = activePlayers[i];
    }
    playersList.appendChild(h5);
  }
})

socket.on("playersIDs", (ids)=>{
  activePlayersIDs = [];
  for(let i = 0; i < ids.length; i++){
    activePlayersIDs.push(ids[i]);
    console.log(activePlayersIDs);
  }
})


let currentLetter;

function simonSays(command){
  console.log("Simon Says: " + command);
  socket.emit("simonCommand", command);
  currentLetter = command;
  console.log('current letter: ' + currentLetter);
}

function playerSays(guess){
  console.log("Player Guesses: " + guess);
  if(guess == currentLetter){
    letterCurrentlyActive = false;
    socket.emit("solved", sessionID);
  }
}

socket.on("simon", (id)=>{
  console.log("simon's id is: " + id);
  console.log("my id is: " + sessionID);

  if(activePlayers.length > 2){
    if(sessionID == id){
      startGameButton.style.display = "unset";
      stage2HeaderText.innerHTML = "Other players are waiting for you to start the game"
      isSimon = true;
      console.log("i am simon");
      let simonInputListener = document.addEventListener("keyup", function(event){
        console.log('simon has pressed button ' + event.keyCode);
        if(letterCurrentlyActive == false){
          if(isSimon == true){
            if(event.keyCode === 49){
              simonSays("1");
            }
            if(event.keyCode === 50){
              simonSays("2");
            }
            if(event.keyCode === 51){
              simonSays("3");
            }
            if(event.keyCode === 52){
              simonSays("4");
            }
            if(event.keyCode === 53){
              simonSays("5");
            }
            if(event.keyCode === 54){
              simonSays("6");
            }
            if(event.keyCode === 55){
              simonSays("7");
            }
            if(event.keyCode === 56){
              simonSays("8");
            }
            if(event.keyCode === 57){
              simonSays("9");
            }
            if(event.keyCode === 48){
              simonSays("0");
            }
            if(event.keyCode === 81){
              simonSays("Q");
            }
            if(event.keyCode === 87){
              simonSays("W");
            }
            if(event.keyCode === 69){
              simonSays("E");
            }
            if(event.keyCode === 82){
              simonSays("R");
            }
            if(event.keyCode === 84){
              simonSays("T");
            }
            if(event.keyCode === 89){
              simonSays("Y");
            }
            if(event.keyCode === 85){
              simonSays("U");
            }
            if(event.keyCode === 73){
              simonSays("I");
            }
            if(event.keyCode === 79){
              simonSays("O");
            }
            if(event.keyCode === 80){
              simonSays("P");
            }
            if(event.keyCode === 65){
              simonSays("A");
            }
            if(event.keyCode === 83){
              simonSays("S");
            }
            if(event.keyCode === 68){
              simonSays("D");
            }
            if(event.keyCode === 70){
              simonSays("F");
            }
            if(event.keyCode === 71){
              simonSays("G");
            }
            if(event.keyCode === 72){
              simonSays("H");
            }
            if(event.keyCode === 74){
              simonSays("J");
            }
            if(event.keyCode === 75){
              simonSays("K");
            }
            if(event.keyCode === 76){
              simonSays("L");
            }
            if(event.keyCode === 90){
              simonSays("Z");
            }
            if(event.keyCode === 88){
              simonSays("X");
            }
            if(event.keyCode === 67){
              simonSays("C");
            }
            if(event.keyCode === 86){
              simonSays("V");
            }
            if(event.keyCode === 66){
              simonSays("B");
            }
            if(event.keyCode === 78){
              simonSays("N");
            }
            if(event.keyCode === 77){
              simonSays("M");
            }
          }
        }
      })
    } else {
      isSimon = false;
      console.log("i am not simon");
      let playerEventListener = document.addEventListener("keyup", function(event){
        console.log('player ' + sessionID + 'has pressed button ' + event.keyCode);
        if(letterCurrentlyActive == true){
          if(isSimon == false){
            if(event.keyCode === 49){
              playerSays("1");
            }
            if(event.keyCode === 50){
              playerSays("2");
            }
            if(event.keyCode === 51){
              playerSays("3");
            }
            if(event.keyCode === 52){
              playerSays("4");
            }
            if(event.keyCode === 53){
              playerSays("5");
            }
            if(event.keyCode === 54){
              playerSays("6");
            }
            if(event.keyCode === 55){
              playerSays("7");
            }
            if(event.keyCode === 56){
              playerSays("8");
            }
            if(event.keyCode === 57){
              playerSays("9");
            }
            if(event.keyCode === 48){
              playerSays("0");
            }
            if(event.keyCode === 81){
              playerSays("Q");
            }
            if(event.keyCode === 87){
              playerSays("W");
            }
            if(event.keyCode === 69){
              playerSays("E");
            }
            if(event.keyCode === 82){
              playerSays("R");
            }
            if(event.keyCode === 84){
              playerSays("T");
            }
            if(event.keyCode === 89){
              playerSays("Y");
            }
            if(event.keyCode === 85){
              playerSays("U");
            }
            if(event.keyCode === 73){
              playerSays("I");
            }
            if(event.keyCode === 79){
              playerSays("O");
            }
            if(event.keyCode === 80){
              playerSays("P");
            }
            if(event.keyCode === 65){
              playerSays("A");
            }
            if(event.keyCode === 83){
              playerSays("S");
            }
            if(event.keyCode === 68){
              playerSays("D");
            }
            if(event.keyCode === 70){
              playerSays("F");
            }
            if(event.keyCode === 71){
              playerSays("G");
            }
            if(event.keyCode === 72){
              playerSays("H");
            }
            if(event.keyCode === 74){
              playerSays("J");
            }
            if(event.keyCode === 75){
              playerSays("K");
            }
            if(event.keyCode === 76){
              playerSays("L");
            }
            if(event.keyCode === 90){
              playerSays("Z");
            }
            if(event.keyCode === 88){
              playerSays("X");
            }
            if(event.keyCode === 67){
              playerSays("C");
            }
            if(event.keyCode === 86){
              playerSays("V");
            }
            if(event.keyCode === 66){
              playerSays("B");
            }
            if(event.keyCode === 78){
              playerSays("N");
            }
            if(event.keyCode === 77){
              playerSays("M");
            }
          }
        }
      })
    }
  }
})

function updateScore(score){
  console.log(score);
  for(let i = 0; i < score.length; i++){
    if(score[i] != null){
      console.log("Player " + i + "has a score of " + score[i]);
      document.getElementById("scorePlayer"+i).innerHTML = activePlayers[i] + ": " + score[i];
    }
  }
}

socket.on("ending_game", ()=>{
  changeRoom("lobby");
  if(activePlayers.length > 1){
    if(isSimon == true){
      startGameButton.style.display = "unset";
    }
  } else {
    startGameButton.style.display = "none";
  }
})

socket.on("starting_game", ()=>{
  changeRoom("gameRoom");
})

socket.on("updatedScore", (scorerID, score)=>{
  letterCurrentlyActive = false;
  simonCommandObject.innerHTML = "";
  let scorer;
  for(let i = 0; i < activePlayersIDs.length; i++){
    if(scorerID == activePlayersIDs[i]);
    scorer = activePlayers[i];
  }
  simonInstructionsText.innerHTML = "Player " + scorer + " scored a point; Press another key";
  updateScore(score);
})

let simonCommandObject = document.getElementById("simonCommandObject");

socket.on("simondCommandFromServer", (command)=>{
  letterCurrentlyActive = true;
  currentLetter = command;
  if(isSimon == false){
    simonCommandObject.innerHTML = command;
  } else {
    simonInstructionsText.innerHTML = "Sent: " + command + "; Waiting for players";

  }
})

socket.on("updateScoreboard", ()=>{
  updateScoreboard();
})

//stage 1 is the intro screen, stage 2 is the lobby, stage 3 is the game
let stage1Div = document.getElementById("stage1Div");
let stage2Div = document.getElementById("stage2Div");
let stage3Div = document.getElementById("stage3Div");
stage2Div.style.display = "none";
stage3Div.style.display = "none";

function updateScoreboard(){
  scoreboardContentDiv.innerHTML = "";
  for(let i = 0; i < activePlayers.length; i++){
    console.log("adding " + activePlayers[i] + " to the list");
    let h2 = document.createElement("h2");
    h2.setAttribute("id", "scorePlayer"+i);

    if(i == 0){
      // h5.innerHTML = activePlayers[i] + "(Simon)";
    } else {
      h2.innerHTML = activePlayers[i] + ": 0";
    }
    scoreboardContentDiv.appendChild(h2);
  }
}

function changeRoom(room){
  console.log("going to the " + room);
  if(room == "instructionsAndNameRoom"){
    stage1Div.style.display = "unset";
    stage2Div.style.display = "none";
    stage3Div.style.display = "none";
  }
  if(room == "lobby"){
    stage1Div.style.display = "none";
    stage2Div.style.display = "unset";
    stage3Div.style.display = "none";
    startGameButton.style.display = "none";
  }
  if(room == "gameRoom"){
    stage1Div.style.display = "none";
    stage2Div.style.display = "none";
    stage3Div.style.display = "unset";
    simonInstructionsDiv.style.display = "none";


    updateScoreboard();

    if(isSimon == true){
      playerInstructionsDiv.style.display = "none";
      simonInstructionsDiv.style.display = "unset";
    } else {
      playerInstructionsDiv.style.display = "unset";
      simonInstructionsDiv.style.display = "none";
    }
  }
}

startGameButton.addEventListener("click", ()=>{
  //send a message to the server to change everyone's room to gameRoom
  //server sends back message to everyone's client to call changeRoom("gameRoom");
  simonInstructionsText.innerHTML = "Press any number or letter key";
  socket.emit("start_the_game");
})

//send name and id to server's "waiting room" until enough players are in the game
button.addEventListener("click", ()=>{
  let nameValue = namebox.value.trim();
  if(nameValue != ""){
    socket.emit("name", nameValue);
    namebox.placeholder = "Entering Lobby...";
    namebox.value = "";
    changeRoom("lobby");
  } else {
    namebox.placeholder = "Please enter a name to proceed";
    namebox.value = "";
  }
})

namebox.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    button.click();
  }
})
