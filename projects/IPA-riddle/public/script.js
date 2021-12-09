console.log('script loaded');
let button = document.getElementById("button");
let textbox = document.getElementById("textbox");

button.addEventListener("click", ()=>{
  // console.log("button was clicked");
  let answer = textbox.value;
  console.log("the user has answered: " + answer);
  window.location.href = "/answer?word=" + answer;
})
