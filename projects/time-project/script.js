// console.log('script loaded');

let speed = 1000;

let alarmSound = new Audio('alarm.wav');

function cantClick(){
  return false;
}

function updateTime(id, checkNo, chunkNo){
  console.log(id);
  console.log(checkNo);
  console.log(chunkNo);


}

function createcheckboxFR(id, checkNo, chunkNo){
  // console.log("id: "+id);
  // console.log("checkbox number: "+checkNo+", chunk number: "+chunkNo);

  let newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.id = id;
  newCheckbox

  document.getElementById("div"+chunkNo).appendChild(newCheckbox);

  let addedCheckbox = document.getElementById(id);
  addedCheckbox.addEventListener("click", function(){
    console.log(chunkNo);
    console.log(checkNo);
    currentMinute = chunkNo;
    currentSecond = checkNo;

    for(let i = 1; i < currentMinute; i++){
      for(let x = 1; x < 61; x++){
        let currentCheckUpdateTime = document.getElementById("chunk"+i+"checkbox"+x);
        console.log(currentCheckUpdateTime);
        currentCheckUpdateTime.checked = true;
      }
    }
    for(let y = 1; y < currentSecond; y++){
      let currentCheckUpdateTime = document.getElementById("chunk"+currentMinute+"checkbox"+y);
      currentCheckUpdateTime.checked = true;
    }
  } );

  // updateTime(id, checkNo, chunkNo)
}

let currentMinute = 1;
let currentSecond = 1;

let intervalExists = 0;
let interval;

function startClock(count){
  if(intervalExists == 1){
    clearInterval(interval);
  }

  interval = setInterval(function(){ checkNextBox(count); }, speed);
  timerON = true;
  intervalExists = 1;

}

function checkNextBox(count){
  count++;
  if(currentMinute < count){
    if(currentSecond < 61){
      // console.log("currently checking: chunk"+currentMinute+"checkbox"+currentSecond);
      document.getElementById("chunk"+currentMinute+"checkbox"+currentSecond).checked = true;
      currentSecond++;
    } else {
      currentMinute++;
      currentSecond = 1;
    }
  } else {
    timerFinished();
  }
}

let timerON = false;

function timerFinished(){
  if(timerON == true){
    alarmSound.play();
    alert("🚨 Timer Finished 🚨");

    timerON = false;
  }
}

function createDivs(count){
  count++;
  for(let i = 1; i < count; i++){

    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "div"+i);

    // and give it some content
    // let placeholderTitle = document.createTextNode("[Div #"+i+"]  ");

    // add the text node to the newly created div
    // newDiv.appendChild(placeholderTitle);

    // add the newly created element and its content into the DOM
    // const currentDiv = document.getElementById("div"+count);
    document.getElementById("hugeDiv").appendChild(newDiv);
  }
}


function generateMinuteChunk(chunk){
  for(let i = 1; i < 61; i++){
    let checkboxName = "chunk"+chunk+"checkbox"+i;
    // console.log(checkboxName);

    //create checkboxes with the id from checkboxName
    createcheckboxFR(checkboxName, i, chunk);

  }
}

function clearHugeDivAndReset(){
  document.getElementById("hugeDiv").innerHTML = "";

  currentMinute = 1;
  currentSecond = 1;
}


function generateAllCheckboxes(amount){
  amount++;
  for(let i = 1; i < amount; i++){
    generateMinuteChunk(i);
    // console.log('ran '+i+' times');
  }
}


document.getElementById("button").addEventListener("click", ()=>{
  // console.log(textbox.value);
  if(textbox.value != ""){
    // console.log("generating "+textbox.value+" minutes of checkboxes");

    //RESET
    clearHugeDivAndReset();

    //START PROGRAM
    createDivs(textbox.value);
    generateAllCheckboxes(textbox.value);
    startClock(textbox.value);
  }
})
