let socket = io("https://luminous-good-shallot.glitch.me");
let others = [];
let myId;
let testMode = false;

//receiveMyId
socket.on('singleId', function(msg) {
  console.log("My ID:", msg.value)
  myId = msg.value
});
// here I receive updated whenever someone disconnects or connects to the socket server.
socket.on('updatedClients', function(msg) {
  console.log("updatedClients", msg)
  others = msg.value
});

//---------------

let all = document.getElementById("all");
let allbutme = document.getElementById("allbutme");
let randomSingle = document.getElementById("randomSingle");
let buttonOutput = document.getElementById("buttonOutput");


randomSingle.addEventListener("click", function(){
  console.log('randomSingle')
  if(others.length>0){
    let ranFloat = Math.random()+others.length;
    let ranIdx = Math.floor(ranFloat);
    let randomOtherId = others[ranIdx];
    socket.emit('button1ToSingle', {id: randomOtherId});
  }
})



function buttonReceived(){
  buttonOutput.style.backgroundColor = "red";
  document.body.style.backgroundColor = "gray";
  setTimeout(function(){
    buttonOutput.style.backgroundColor = "black";
    document.body.style.backgroundColor = "white";
  }, 500)
}

all.addEventListener("click", ()=>{
  console.log("clicked");
  socket.emit("button1ToAll");
})

allbutme.addEventListener("click", ()=>{
  console.log("clicked");
  socket.emit("button1ToAllButMe");
})

socket.on('button1', function(msg) {
  if(testMode && msg.from != myId){return}
  console.log(msg);
  buttonReceived();
});

let checkbox = document.getElementById("checkbox");
let meToggle = document.getElementById("meToggle");

let interval = 5;

function checkChecked(){
  if(checkbox.checked){
    console.log("checked");
    if(meToggle.checked){
      socket.emit("button1ToAllButMe");
      buttonOutput.width = buttonOutput.width + interval;
      buttonOutput.height = buttonOutput.heightheight + interval;

    } else {
      socket.emit("button1ToAll");
      buttonOutput.width = buttonOutput.width + interval;
      buttonOutput.height = buttonOutput.heightheight + interval;

    }
  } else {
    buttonOutput.width = 100;
    buttonOutput.height = 100;
  }
}
//
// myRange.addEventListener("changed", ()=>{
//   console.log(myRange.value);
// })

let checkCheckedInterval = setInterval(checkChecked, 20);
