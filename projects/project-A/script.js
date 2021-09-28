// console.log('loaded');

// console.log('screen width: '+ screen.width);
// console.log('screen height: '+ screen.height);


let windowsONOFF = 0;

let window0;
let window1;
let window2;
let window3;
let window4;
let window5;
let window6;
let window7;
let window8;
let window9;
let window10;
let window11;

let eachWidth = screen.width/4.28;
let eachHeight = (screen.height-150)/3;

document.getElementById("button").addEventListener("click", ()=>{
  //starting the Puzzle

  //protects the user from accidentally opening way too many pop-ups
  if(windowsONOFF == 1){
    window0.close();
    window1.close();
    window2.close();
    window3.close();
    window4.close();
    window5.close();
    window6.close();
    window7.close();
    window8.close();
    window9.close();
    window10.close();
    window11.close();

    windowsONOFF = 0;
  }

  generateWindows();
  determineGoalposts();
  windowsONOFF = 1;

  // console.log('windows on? ' + windowsONOFF);

})


let window0GoalpostX;
let window0GoalpostY;
let window1GoalpostX;
let window1GoalpostY;
let window2GoalpostX;
let window2GoalpostY;
let window3GoalpostX;
let window3GoalpostY;
let window4GoalpostX;
let window4GoalpostY;
let window5GoalpostX;
let window5GoalpostY;
let window6GoalpostX;
let window6GoalpostY;
let window7GoalpostX;
let window7GoalpostY;
let window8GoalpostX;
let window8GoalpostY;
let window9GoalpostX;
let window9GoalpostY;
let window10GoalpostX;
let window10GoalpostY;
let window11GoalpostX;
let window11GoalpostY;

function determineGoalposts(){

  window0GoalpostX = 0;
  window0GoalpostY = 0;

  window1GoalpostX = eachWidth;
  window1GoalpostY = 0;

  window2GoalpostX = eachWidth*2;
  window2GoalpostY = 0;

  window3GoalpostX = eachWidth*3;
  window3GoalpostY = 0;



  window4GoalpostX = 0;
  window4GoalpostY = eachHeight;

  window5GoalpostX = eachWidth;
  window5GoalpostY = eachHeight;

  window6GoalpostX = eachWidth*2;
  window6GoalpostY = eachHeight;

  window7GoalpostX = eachWidth*3;
  window7GoalpostY = eachHeight;



  window8GoalpostX = 0;
  window8GoalpostY = eachHeight*2;

  window9GoalpostX = eachWidth;
  window9GoalpostY = eachHeight*2;

  window10GoalpostX = eachWidth*2;
  window10GoalpostY = eachHeight*2;

  window11GoalpostX = eachWidth*3;
  window11GoalpostY = eachHeight*2;

}

let window0X;
let window0Y;
let window1X;
let window1Y;
let window2X;
let window2Y;
let window3X;
let window3Y;
let window4X;
let window4Y;
let window5X;
let window5Y;
let window6X;
let window6Y;
let window7X;
let window7Y;
let window8X;
let window8Y;
let window9X;
let window9Y;
let window10X;
let window10Y;
let window11X;
let window11Y;

function updatePlaceHolderXYVariables(){
  window0X = window0.screenX;
  window0Y = window0.screenY;
  window1X = window1.screenX;
  window1Y = window1.screenY;
  window2X = window2.screenX;
  window2Y = window2.screenY;
  window3X = window3.screenX;
  window3Y = window3.screenY;
  window4X = window4.screenX;
  window4Y = window4.screenY;
  window5X = window5.screenX;
  window5Y = window5.screenY;
  window6X = window6.screenX;
  window6Y = window6.screenY;
  window7X = window7.screenX;
  window7Y = window7.screenY;
  window8X = window8.screenX;
  window8Y = window8.screenY;
  window9X = window9.screenX;
  window9Y = window9.screenY;
  window10X = window10.screenX;
  window10Y = window10.screenY;
  window11X = window11.screenX;
  window11Y = window11.screenY;
}



let tolerance = 200;

function checkIfSolved(){

  updatePlaceHolderXYVariables();

  points = 0;


//window 0
  window0X = window0X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window0X++;
    if(window0X == window0GoalpostX){
      points++;
    }
  }

  window0Y = window0Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window0Y++;
    if(window0Y == window0GoalpostY){
      points++;
    }
  }

//window 1
  window1X = window1X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window1X++;
    if(window1X == window1GoalpostX){
      points++;
    }
  }

  window1Y = window1Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window1Y++;
    if(window1Y == window1GoalpostY){
      points++;
    }
  }

//window 2
  window2X = window2X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window2X++;
    if(window2X == window2GoalpostX){
      points++;
    }
  }

  window2Y = window2Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window2Y++;
    if(window2Y == window2GoalpostY){
      points++;
    }
  }

//window 2
  window2X = window2X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window2X++;
    if(window2X == window2GoalpostX){
      points++;
    }
  }

  window2Y = window2Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window2Y++;
    if(window2Y == window2GoalpostY){
      points++;
    }
  }

//window 3
  window3X = window3X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window3X++;
    if(window3X == window3GoalpostX){
      points++;
    }
  }

  window3Y = window3Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window3Y++;
    if(window3Y == window3GoalpostY){
      points++;
    }
  }

//window 4
  window4X = window4X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window4X++;
    if(window4X == window4GoalpostX){
      points++;
    }
  }

  window4Y = window4Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window4Y++;
    if(window4Y == window4GoalpostY){
      points++;
    }
  }

//window 5
  window5X = window5X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window5X++;
    if(window5X == window5GoalpostX){
      points++;
    }
  }

  window5Y = window5Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window5Y++;
    if(window5Y == window5GoalpostY){
      points++;
    }
  }

//window 6
  window6X = window6X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window6X++;
    if(window6X == window6GoalpostX){
      points++;
    }
  }

  window6Y = window6Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window6Y++;
    if(window6Y == window6GoalpostY){
      points++;
    }
  }

//window 7
  window7X = window7X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window7X++;
    if(window7X == window7GoalpostX){
      points++;
    }
  }

  window7Y = window7Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window7Y++;
    if(window7Y == window7GoalpostY){
      points++;
    }
  }

//window 8
  window8X = window8X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window8X++;
    if(window8X == window8GoalpostX){
      points++;
    }
  }

  window8Y = window8Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window8Y++;
    if(window8Y == window8GoalpostY){
      points++;
    }
  }

//window 9
  window9X = window9X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window9X++;
    if(window9X == window9GoalpostX){
      points++;
    }
  }

  window9Y = window9Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window9Y++;
    if(window9Y == window9GoalpostY){
      points++;
    }
  }

//window 10
  window10X = window10X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window10X++;
    if(window10X == window10GoalpostX){
      points++;
    }
  }

  window10Y = window10Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window10Y++;
    if(window10Y == window10GoalpostY){
      points++;
    }
  }

//window 11
  window11X = window11X - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window11X++;
    if(window11X == window11GoalpostX){
      points++;
    }
  }

  window11Y = window11Y - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    window11Y++;
    if(window11Y == window11GoalpostY){
      points++;
    }
  }


  console.log(points + "points");
}

function newWindow(i, parameters){
  // console.log('i = '+i);
  if(i == 0){
    window0 = window.open("window"+i+".html", "window"+i, parameters);

    window0.addEventListener("click", ()=>{
      console.log("window 0 X: "+ window0.screenX);
      console.log("window 0 Y: "+ window0.screenY);
      checkIfSolved();
    })
  }

  if(i == 1){
    window1 = window.open("window"+i+".html", "window"+i, parameters);

    window1.addEventListener("click", ()=>{
      console.log("window 1 X: "+ window1.screenX);
      console.log("window 1 Y: "+ window1.screenY);
      checkIfSolved();
    })
  }

  if(i == 2){
    window2 = window.open("window"+i+".html", "window"+i, parameters);

    window2.addEventListener("click", ()=>{
      console.log("window 2 X: "+ window2.screenX);
      console.log("window 2 Y: "+ window2.screenY);
      checkIfSolved();
    })
  }

  if(i == 3){
    window3 = window.open("window"+i+".html", "window"+i, parameters);

    window3.addEventListener("click", ()=>{
      console.log("window 3 X: "+ window3.screenX);
      console.log("window 3 Y: "+ window3.screenY);
      checkIfSolved();
    })
  }

  if(i == 4){
    window4 = window.open("window"+i+".html", "window"+i, parameters);

    window4.addEventListener("click", ()=>{
      console.log("window 4 X: "+ window4.screenX);
      console.log("window 4 Y: "+ window4.screenY);
      checkIfSolved();
    })
  }

  if(i == 5){
    window5 = window.open("window"+i+".html", "window"+i, parameters);

    window5.addEventListener("click", ()=>{
      console.log("window 5 X: "+ window5.screenX);
      console.log("window 5 Y: "+ window5.screenY);
      checkIfSolved();
    })
  }

  if(i == 6){
    window6 = window.open("window"+i+".html", "window"+i, parameters);

    window6.addEventListener("click", ()=>{
      console.log("window 6 X: "+ window6.screenX);
      console.log("window 6 Y: "+ window6.screenY);
      checkIfSolved();
    })
  }

  if(i == 7){
    window7 = window.open("window"+i+".html", "window"+i, parameters);

    window7.addEventListener("click", ()=>{
      console.log("window 7 X: "+ window7.screenX);
      console.log("window 7 Y: "+ window7.screenY);
      checkIfSolved();
    })
  }

  if(i == 8){
    window8 = window.open("window"+i+".html", "window"+i, parameters);

    window8.addEventListener("click", ()=>{
      console.log("window 8 X: "+ window8.screenX);
      console.log("window 8 Y: "+ window8.screenY);
      checkIfSolved();
    })
  }

  if(i == 9){
    window9 = window.open("window"+i+".html", "window"+i, parameters);

    window9.addEventListener("click", ()=>{
      console.log("window 9 X: "+ window9.screenX);
      console.log("window 9 Y: "+ window9.screenY);
      checkIfSolved();
    })
  }

  if(i == 10){
    window10 = window.open("window"+i+".html", "window"+i, parameters);

    window10.addEventListener("click", ()=>{
      console.log("window 10 X: "+ window10.screenX);
      console.log("window 10 Y: "+ window10.screenY);
      checkIfSolved();
    })
  }

  if(i == 11){
    window11 = window.open("window"+i+".html", "window"+i, parameters);

    window11.addEventListener("click", ()=>{
      console.log("window 11 X: "+ window11.screenX);
      console.log("window 11 Y: "+ window11.screenY);
      checkIfSolved();
    })
  }
}

function generateWindows(){
  console.log("main script each width: " + eachWidth);

  let max = screen.width;
  let min = 0;


  for(let i = 0; i < 12; i++){
    let randomLeft = (Math.random()*(max - min))-eachWidth;
    let randomTop = (Math.random()*(max - min))-eachHeight;

    // console.log('random left: '+ randomLeft);
    // console.log('random top: '+ randomTop);


    let parameters = "resizable=no,height="+eachHeight+",width="+eachWidth+",left="+randomLeft+",top="+randomTop+",titlebar=no,toolbar=no,scrollbars=no";

    // console.log(parameters);
    console.log(i);
    newWindow(i, parameters);
  }
  // console.log('windows generated');


}



function windowMoved(){

}
