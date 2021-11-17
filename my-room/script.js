console.log('script loaded');

let previewText = document.getElementById("previewText");

let projects = [miniProject1, miniProject2, miniProject3, miniProject4, miniProject5, miniProject6, miniProject7, bigProject1, bigProject2, bigProject3];
let projectsHREF = ["https://twaugh99.github.io/abc-student-repo/projects/multiplicity-project", "https://twaugh99.github.io/abc-student-repo/projects/time-project", "", "https://github.com/twaugh99/abc-student-repo/blob/master/projects/bug-extension.zip", "https://github.com/twaugh99/abc-student-repo/blob/master/projects/gift_project.zip", "https://ipa-riddle.glitch.me/", "https://simon-says-abc.glitch.me/", "https://twaugh99.github.io/abc-student-repo/projects/project-A", "https://github.com/twaugh99/abc-student-repo/blob/master/projects/project-B/README.md", ""];
let projectsInfo = ["Multiplicity Project  (9/9/21)", "Time Project  (9/9/21)", "", "Bug Extension (10/12/21)", "20-20-20 Extension (10/21/21)", "IPA Riddle (11/11/21)", "Simon Says (11/18/21)", "Project A  (9/30/21)", "SwipeySynth (10/27/21)", ""]


for(let i = 0; i < projects.length; i++){
  console.log(i);
  projects[i].addEventListener("click", ()=>{
    window.location.href = projectsHREF[i];
  })

  projects[i].addEventListener("mouseenter", ()=>{
    previewText.innerHTML = projectsInfo[i];
  })

  projects[i].addEventListener("mouseout", ()=>{
    previewText.innerHTML = "";
  })
}
