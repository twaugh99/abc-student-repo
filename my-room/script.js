console.log('script loaded');


console.log('loaded');

let range = document.getElementById('myRange');


//Add Project Links Here
linkArray = ["", "", "", "", "", "", "", "", "", "", "", "", ""]
iconArray = ["", "", "", "", "", "", "", "", "", "", "", "", ""]


function inputHappened(){
  // console.log(range.value);
  currentSelection = range.value;
  document.getElementById('link').href = linkArray[currentSelection];
  if(currentSelection < 11){
    document.getElementById('link').innerHTML = "Mini Project " + currentSelection;
  } else {
    document.getElementById('link').innerHTML = "Big Project " + (currentSelection-10);
  }

  document.getElementById('icon').src = iconArray[currentSelection];
}

range.addEventListener("input", inputHappened);
