let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let players = [];
let playersIDs = [];
let score = [];
let inGame = false;

function addPlayer(name, id){
  players.push(name);
  playersIDs.push(id);
  console.log("the current players online are: " + players);
  io.emit("players", players);
  io.emit("playersIDs", playersIDs);
  //send a special message to simon to let their client knows they are simon
  //send to first ID in playersIDs array
  io.emit("simon", playersIDs[0]);
}

app.use(express.static('public'))

io.on('connection', (socket)=>{
  console.log('a player connected', socket.id);


  socket.on('disconnect', ()=>{
    let originalSimonID = playersIDs[0];
    console.log('a player disconnected', socket.id);
    for(let i = 0; i < playersIDs.length; i++){
      if(socket.id == playersIDs[i]){
        playersIDs.splice(i, 1);
        players.splice(i, 1);
        io.emit("players", players);
        io.emit("playersIDs", playersIDs);
        io.emit("updateScoreboard");
      }
    }
    if(players.length < 3 || socket.id == originalSimonID){
      if(inGame == true){
        score = [];
        io.emit("simon", playersIDs[0]);
        io.emit("ending_game");
        inGame = false;
      }
    }
  })

  socket.on('name', (name)=>{
    console.log(name + " has entered the lobby");
    console.log(name + "'s ID is " + socket.id);
    addPlayer(name, socket.id);
  })

  socket.on('start_the_game', ()=>{
    inGame = true;
    score = [];
    io.emit("starting_game");
  })

  socket.on('simonCommand', (command)=>{
    io.emit("simondCommandFromServer", command);
  })

  socket.on('solved', (scorerID)=>{
    console.log(scorerID + " scored");
    for(let i = 0; i < players.length; i++){
      if(playersIDs[i] == scorerID){
        if(score[i] == null){
          score[i] = 1;
        } else {
          if(score[i] == 2){
            score = [];

            // Change the order of players to make the winner become simon (first player in the array)
            players.unshift(players.splice(i, 1)[0]);
            playersIDs.unshift(playersIDs.splice(i, 1)[0]);

            //update client-side player arrays
            io.emit("players", players);
            io.emit("playersIDs", playersIDs);

            //tell the winner's client they are simon
            io.emit("simon", playersIDs[0]);

            io.emit("ending_game");

          } else {
            score[i] = score[i] + 1;
          }
        }
        console.log(score[i])
      }
    }
    io.emit("updatedScore", scorerID, score);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
