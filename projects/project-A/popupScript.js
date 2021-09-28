console.log("popup script loaded");

let eachWidth = screen.width/4;
let eachHeight = (screen.height-150)/3;

console.log("eachWidth: " + eachWidth);
console.log("eachHeight: " + eachHeight);
console.log("popup script each width: " + eachWidth);


let image = document.getElementById("puzzleImage");

image.style.height = eachHeight+"px";
image.style.width = eachWidth+"px";
