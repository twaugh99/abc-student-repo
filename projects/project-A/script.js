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

document.getElementById("button").addEventListener("click", ()=>{
  //starting the Puzzle
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
  windowsONOFF = 1;
  console.log('windows on? ' + windowsONOFF);

})


function checkIfSolved(){

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
  let eachWidth = screen.width/4.28;
  let eachHeight = (screen.height-150)/3;
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
