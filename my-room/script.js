console.log('script loaded');


console.log('loaded');

let range = document.getElementById('myRange');


//Add Project Links Here
linkArray = ["","https://twaugh99.github.io/abc-student-repo/projects/multiplicity-project/index.html", "", "", "", "", "", "", "", "", "", "", "", ""]
iconArray = ["","assets/multiplicityIcon.png", "", "", "", "", "", "", "", "", "", "", "", ""]


function inputHappened(){
  // console.log(range.value);
  currentSelection = range.value;

  console.log(currentSelection);

  document.getElementById('link').href = linkArray[currentSelection];
  console.log("intended current link " + linkArray[currentSelection]);
  console.log("current link " + document.getElementById('link').href);

  if(currentSelection < 11){
    document.getElementById('link').innerHTML = "Mini Project " + currentSelection;
  } else {
    document.getElementById('link').innerHTML = "Big Project " + (currentSelection-10);
  }

  document.getElementById('icon').src = iconArray[currentSelection];

}

range.addEventListener("input", inputHappened);
