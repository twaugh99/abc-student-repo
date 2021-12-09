const express = require('express');
const app = express(); //handles routes
const http = require('http'); //knows how to speak http
const server = http.createServer(app); //create a server and route
const { Server } = require("socket.io"); //knows how to speak websocket
const io = new Server(server); //create socket server that builds on top of http server


app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });


//event listener for new connections to the socket
io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);

  socket.on('chat message', (msg) => {
   console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.id);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
