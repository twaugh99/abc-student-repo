console.log('loaded');

let button = document.getElementById('button');
console.log(button);

function openWindow(){

  let popupWidth = 200;
  let popupHeight = 200;

  let sw = screen.width;
  let sh = screen.height;

  let x = Math.random()*(sw-popupWidth);
  let y = Math.random()*(sh-popupHeight);



  let specifications = "width="+popupWidth+",height="+popupHeight+",left="+x+",top="+y;
  let myWindow = window.open("window", "", specifications);


  let ranTime = 1000 + Math.random()*5000;


  myWindow.addEventListener("load", ()=>{
    setTimeout(()=>{
      myWindow.close();
    }, ranTime );
  })

}

function openManyWindows(){
  for(let i = 0; i < 10; i++){
    openWindow();
  }
}


function closeWindow(){

}



button.addEventListener('click', ()=>{
  // console.log('click');
  openManyWindows();
});
