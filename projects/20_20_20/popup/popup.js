console.log('popup script loaded');

let buttonPressed = 0;

let bell = new Audio('bell.wav');


let timer = document.getElementById("timer");

let length;
let timerInterval;





function timerFunction(){
  console.log(length);
  if(length > 1){
    length = length - 1;
    timer.innerHTML = "- " + length + " -";
  } else {
    length = length - 1;
    timer.innerHTML = "- " + length + " -";
    clearInterval(timerInterval);
    bell.play();
  }
}

bell.addEventListener("ended", function(){
  window.close();
});

document.getElementById("button").addEventListener("click", ()=>{
  if(buttonPressed == 0){
    //20 second clock
    length = 20;
    timer.innerHTML = "- " + length + " -";
    timerInterval = setInterval(timerFunction, 1000);
  }
})
