console.log("script loaded");

let textbox = document.getElementById("textbox");
let button = document.getElementById("button");
let winnersList = document.getElementById("winnersDiv");


function placeName(name){
  let p = document.createElement("p");
  p.innerHTML = name;
  winnersList.appendChild(p);
}


function placeNames(names){
  console.log("placing names: " + names);
  winnersList.innerHTML = "";
  names.forEach(placeName);
}

function pullWinnerList(){
  fetch("/getNames")
    .then(data => data.json())
    .then(data => {
      console.log("decoded: " + data);
      let names = data.content;
      placeNames(names);
    })
}

button.addEventListener("click", ()=>{
  // console.log("button was clicked");
  let name = textbox.value;
  console.log(name + " has solved the riddle");

  fetch("/name?name="+name);

  textbox.value = "";

  pullWinnerList();
})
