// console.log('loaded');

// console.log('screen width: '+ screen.width);
// console.log('screen height: '+ screen.height);


let windowsONOFF = 0;

let windows = [];

for(let i = 0; i < 12; i++){
  windows[i] = "window"+i;
}

let windowSolved = [];

for(let i = 0; i < 12; i++){
  windowSolved[i] = 0;
}

// console.log(windowSolved);


// console.log(windows);

let eachWidth = screen.width/4;

let eachHeight = (screen.height-120)/3;
let eachHeight2 = screen.height/3;


function closeAllWindows(){

  for(let i = 0; i < 12; i++){
    windows[i].close();
  }

  windowsONOFF = 0;
}


let barks = [];

for(let i = 0; i < 12; i++){
  barks[i] = new Audio;
  barks[i].src = "barks/bark"+i+".mp3";
}

// console.log(barks);

function startBarking(){
  for(let i = 0; i < 12; i++){
    // if(windowSolved == 0){
      barks[i].play();
    // }
  }
}

//defining goalposts
let windowGoalpostX = [];
let windowGoalpostY = [];

//filling in goalpost information based on screen size (runs once on startup)
function determineGoalposts(){
  let count = 0;

  for(let i = 0; i < 3; i++){
    for(let y = 0; y < 4; y++){
      // console.log('i: '+i+', y: '+y);
      windowGoalpostX[count] = eachWidth*y;
      windowGoalpostY[count] = eachHeight2*i;
      count++;
    }
  }

  // console.log("goalposts: ");
  // console.log(windowGoalpostX);
  // console.log(windowGoalpostY);
}

//defining placeholder XY arrays that will be modified in order to allow for some tolerance when checking if solved
let windowX = [];
let windowY = [];

function updatePlaceHolderXYVariables(){

  for(let i = 0; i < 12; i++){
    windowX[i] = windows[i].screenX;
  }

  for(let i = 0; i < 12; i++){
    windowY[i] = windows[i].screenY;
  }

  // console.log(windows);
  // console.log(windowX);
  // console.log(windowY);

}

let tolerance = 200;

function updateSound(){
  for(let i = 0; i < 12; i++){
    if(windowSolved[i] == 1){
      barks[i].volume = 0;
    } else {
      barks[i].volume = 1;
    }
  }
}

function checkIfCompleted(){
  let solvedCount = 0;
  for(let i = 0; i < 12; i++){
    if(windowSolved[i] == 1){
      solvedCount++;
    }
  }
  if(solvedCount == 12){
    document.body.style.backgroundImage = "url('dogTile.png')";
    document.getElementById("button").innerHTML = "🐕 AGAIN? 🐕";

    document.body.style.backgroundColor = "white";
    closeAllWindows();

  }
}


function xSolved(i){
  windowY[i] = windowY[i] - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    windowY[i]++;
    if(windowY[i] == windowGoalpostY[i]){
      // points++;
      windowSolved[i] = 1;
      console.log("window " + i + " solved: " + windowSolved[i]);
      updateSound();
      checkIfCompleted();
    }
  }
}

function ySolved(i){
  windowX[i] = windowX[i] - (tolerance/2);
  for(let z = 0; z < tolerance; z++){
    windowX[i]++;
    if(windowX[i] == windowGoalpostX[i]){
      // points++;
      windowSolved[i] = 1;
      console.log("window " + i + " solved: " + windowSolved[i]);
      updateSound();
      checkIfCompleted();
    }
  }
}

function checkIfSolved(){

  updatePlaceHolderXYVariables();

  points = 0;
  for(let i = 0; i < 12; i++){
    windowSolved[i] = 0;
  }

  for(let i = 0; i < 12; i++){

    //X
    windowX[i] = windowX[i] - (tolerance/2);
    for(let z = 0; z < tolerance; z++){
      windowX[i]++;
      if(windowX[i] == windowGoalpostX[i]){
        points++;
        xSolved(i);
      }
    }

    //Y
    windowY[i] = windowY[i] - (tolerance/2);
    for(let z = 0; z < tolerance; z++){
      windowY[i]++;
      if(windowY[i] == windowGoalpostY[i]){
        points++;
        ySolved(i);
      }
    }

  }

}

function newWindow(i, parameters){
  // console.log('i = '+i);

  windows[i] = window.open("window"+i+".html", "window"+i, parameters);

  // windows[i].addEventListener("click", ()=>{
  //   console.log("window "+i+" X: "+ windows[i].screenX);
  //   console.log("window "+i+" Y: "+ windows[i].screenY);
  //   checkIfSolved();
  // })
}

function generateWindows(){
  // console.log("main script each width: " + eachWidth);

  for(let i = 0; i < 12; i++){
    let randomLeft = (Math.random() * screen.width) - eachWidth;
    let randomTop = (Math.random() * screen.width) - eachHeight;

    // console.log('random left: '+ randomLeft);
    // console.log('random top: '+ randomTop);

    let parameters = "resizable=no,height="+eachHeight+",width="+eachWidth+",left="+randomLeft+",top="+randomTop+",titlebar=no,toolbar=no,scrollbars=no";

    // console.log(parameters);
    // console.log(i);
    newWindow(i, parameters);
  }
  // console.log('windows generated');
}

setInterval(()=>{
  if(windowsONOFF == 1){
    checkIfSolved();
  }
}, 200); //check every 50 milliseconds!


document.getElementById("googleHomepage").addEventListener("click", ()=>{
  //starting the Puzzle

  //protects the user from accidentally opening way too many pop-ups


  document.getElementById("googleHomepage").src = "googlehomepageinverted.png";
  document.body.style.backgroundColor = "black";


  if(windowsONOFF == 1){
    closeAllWindows();
  }

  determineGoalposts();


  setTimeout(function() {
    generateWindows();

    startBarking();

    windowsONOFF = 1;

  }, 500);
  // console.log('windows on? ' + windowsONOFF);

})
