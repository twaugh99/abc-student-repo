let timer = 0;
let currentState;

console.log('background script loaded');

chrome.idle.setDetectionInterval(120);

chrome.idle.onStateChanged.addListener((newState)=>{
  console.log("state changed to: " + newState);
  currentState = newState;
  timer = 0;
})

function upCounter(){
  console.log(timer);
  if(timer < 1200){
    timer++;
  } else {
    window.open("popup/popup.html", '_blank');
    timer = 0;
  }
}


let bigCounter = setInterval(upCounter, 1000);
