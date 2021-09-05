console.log('loaded');

let range = document.getElementById('myRange');

console.log(range);


// function changeHappened(){
//   console.log('a change happened');
// }
//
// range.addEventListener("change", changeHappened);


function inputHappened(){
  console.log('a input happened');
  let value = range.value;
  valueDisplay.innerHTML = value;
  valueDisplay.style.left = value*2 + "px";
  range.style.left = 100-value + "px";
}

range.addEventListener("input", inputHappened);
