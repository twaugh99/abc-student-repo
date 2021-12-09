console.log('loaded');

let button = document.querySelector("#button");
console.log(button);

let count = document.querySelector("#count");
let counter = 0;


let message = {type: "getCount"};
browser.runtime.sendMessage(message, (response)=>{
  console.log('background script sent this to me', response);
});


button.addEventListener("click", ()=>{
  counter++;
  //tell background script that the counter has been increased

  let message = {type: "increaseCounter"};
  browser.runtime.sendMessage(message);

  count.innerHTML = counter;
})
