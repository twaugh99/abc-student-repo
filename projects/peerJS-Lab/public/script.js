let socket = io();
let myPeerID;

function getMouseImage(){
  let img = document.createElement("img");
  img.src = "mouse.png";
  img.className = "mouse";
  document.body.appendChild(img);
  return img;
}
let myMouse = getMouseImage()
document.body.addEventListener("mousemove", function(iMovedMouse){
  console.log(iMovedMouse);
  myMouse.style.left = iMovedMouse.clientX - 20 + "px";
  myMouse.style.top = iMovedMouse.clientY - 10 +"px";
})

socket.on("welcomeToAT&T", function(welcomePack){
  //go to at&t shop to sign up for new landline
  console.log("Welcome to AT&T, this is your phone number.");
  console.log("Wait for the technician to come to your house and connect you.");
  console.log(welcomePack);

  //nowe we have our own phone number
  myPeerID = welcomePack.yourPeerID;
  let peer = new Peer(myPeerID);

  peer.on('open', function(id) {
    //nowe we are ready to connect to peers
    console.log('Technician: Your phone number (peer ID) is: ' + id);

    console.log("who to call?");
    for(let i = 0; i < welcomePack.pleaseCall.length; i++){
      let callThisNumber = welcomePack.pleaseCall[i];
      if(callThisNumber != myPeerID){
        console.log("calling", callThisNumber);
        let conn = peer.connect(callThisNumber);
      }
    }
  });

  peer.on('connection', function(conn){
    console.log("i am being connected with someone on the network");
  })
})
