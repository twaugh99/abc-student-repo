console.log('script loaded');


console.log('loaded');

let range = document.getElementById('myRange');


//Add Project Links Here
linkArray = ["","https://twaugh99.github.io/abc-student-repo/projects/multiplicity-project", "https://twaugh99.github.io/abc-student-repo/projects/time-project", "", "https://github.com/twaugh99/abc-student-repo/blob/master/projects/bug-extension.zip", "", "", "", "", "", "", "https://twaugh99.github.io/abc-student-repo/projects/project-A", "", ""]
iconArray = ["","assets/multiplicityIcon.png", "assets/timeIcon.png", "", "assets/bugIcon.png", "", "", "", "", "", "", "assets/projectAIcon.png", "", ""]
titleArray = ["","Multiplicity Project  (9/9/21)", "Time Project  (9/9/21)", "", "Bug Extension (10/12/21)", "", "", "", "", "", "", "Project A  (9/30/21)", "", ""]


function inputHappened(){
  // console.log(range.value);
  currentSelection = range.value;

  // console.log(currentSelection);

  document.getElementById('link').href = linkArray[currentSelection];

  // console.log("intended current link " + linkArray[currentSelection]);
  // console.log("current link " + document.getElementById('link').href);

  if(currentSelection < 11){
    document.getElementById('link').innerHTML = "Mini Project " + currentSelection;
  } else {
    document.getElementById('link').innerHTML = "Big Project " + (currentSelection-10);
  }

  document.getElementById('icon').src = iconArray[currentSelection];
  document.getElementById('descriptionPTag').innerHTML = titleArray[currentSelection];


}

document.getElementById("icon").addEventListener("click", ()=>{
  // console.log('click');
  window.location.href = linkArray[currentSelection];
})

range.addEventListener("input", inputHappened);
