// console.log('loaded');

// console.log('screen width: '+ screen.width);
// console.log('screen height: '+ screen.height);


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

  generateWindows();

})


function newWindow(i, parameters){
  console.log('i = '+i);
  if(i == 0){
    window0 = window.open("window"+i+".html", "window"+i, parameters);

    window0.addEventListener("click", ()=>{
      console.log('click');
    })
  }

}

function generateWindows(){
  let eachWidth = screen.width/4;
  let eachHeight = (screen.height-150)/3;

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
