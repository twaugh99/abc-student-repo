console.log('loaded');

let button = document.getElementById("button");
let box = document.getElementById("box");

let boxAngle = 0;

button.addEventListener("click", ()=>{
  boxAngle = boxAngle+1080;
  box.style.transform = "rotate("+boxAngle+"deg)";
})


let buttonAngle = 0;

box.addEventListener("click", ()=>{
  buttonAngle = buttonAngle+1080;
  button.style.transform = "rotate("+buttonAngle+"deg)";
})
