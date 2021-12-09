let videoStarted = 0;


video = document.getElementById("mainVideo");
mainVideo.width = screen.width;
mainVideo.height = screen.height;

glitterText1 = document.getElementById("glitterText1");
glitterText2 = document.getElementById("glitterText2");
glitterText3 = document.getElementById("glitterText3");
glitterText1.style.visibility = "hidden";
glitterText2.style.visibility = "hidden";
glitterText3.style.visibility = "hidden";

drum1Gif = document.getElementById("drum1Gif");
drum2Gif = document.getElementById("drum2Gif");
drum3Gif = document.getElementById("drum3Gif");
elvisGif = document.getElementById("elvisGif");
piano1Gif = document.getElementById("piano1Gif");
piano2Gif = document.getElementById("piano2Gif");
piano3Gif = document.getElementById("piano3Gif");
trumpetGif = document.getElementById("trumpetGif");
trumpetPlayerGif = document.getElementById("trumpetPlayerGif");
drum1Gif.style.visibility = "hidden";
drum2Gif.style.visibility = "hidden";
drum3Gif.style.visibility = "hidden";
elvisGif.style.visibility = "hidden";
piano1Gif.style.visibility = "hidden";
piano2Gif.style.visibility = "hidden";
piano3Gif.style.visibility = "hidden";
trumpetGif.style.visibility = "hidden";
trumpetPlayerGif.style.visibility = "hidden";

midiAudio = document.getElementById("midiAudioHTMLObject");



document.body.addEventListener('mousemove', e =>{
  // console.log(e.screenX);
  // console.log(e.screenY);
  if(videoStarted == 1){
    glitterText1.style.visibility = "visible";
    glitterText2.style.visibility = "visible";
    glitterText3.style.visibility = "visible";

    drum1Gif.style.visibility = "visible";
    drum2Gif.style.visibility = "visible";
    drum3Gif.style.visibility = "visible";
    elvisGif.style.visibility = "visible";
    piano1Gif.style.visibility = "visible";
    piano2Gif.style.visibility = "visible";
    piano3Gif.style.visibility = "visible";
    trumpetGif.style.visibility = "visible";
    trumpetPlayerGif.style.visibility = "visible";

    glitterText1.style.left = e.screenX+"px";
    glitterText1.style.top = e.screenY+"px";

    let glitterText2X = e.screenX + 50;
    let glitterText2Y = e.screenY + 50;

    glitterText2.style.left = glitterText2X+"px";
    glitterText2.style.top = glitterText2Y+"px";

    let glitterText3X = e.screenX - 50;
    let glitterText3Y = e.screenY - 50;

    glitterText3.style.left = glitterText3X+"px";
    glitterText3.style.top = glitterText3Y+"px";

    let drum1GifX = e.screenX - 150;
    let drum1GifY = e.screenY - 350;
    drum1Gif.style.left = drum1GifX+"px";
    drum1Gif.style.top = drum1GifY+"px";

    let drum2GifX = e.screenX + 380;
    let drum2GifY = e.screenY + 120;
    drum2Gif.style.left = drum2GifX+"px";
    drum2Gif.style.top = drum2GifY+"px";

    let drum3GifX = e.screenX - 150;
    let drum3GifY = e.screenY + 70;
    drum3Gif.style.left = drum3GifX+"px";
    drum3Gif.style.top = drum3GifY+"px";

    let elvisGifX = e.screenX + 100;
    let elvisGifY = e.screenY - 350;
    elvisGif.style.left = elvisGifX+"px";
    elvisGif.style.top = elvisGifY+"px";

    let piano1GifX = e.screenX + 400;
    let piano1GifY = e.screenY - 300;
    piano1Gif.style.left = piano1GifX+"px";
    piano1Gif.style.top = piano1GifY+"px";

    let piano2GifX = e.screenX + 80;
    let piano2GifY = e.screenY + 100;
    piano2Gif.style.left = piano2GifX+"px";
    piano2Gif.style.top = piano2GifY+"px";

    let piano3GifX = e.screenX - 360;
    let piano3GifY = e.screenY + 50;
    piano3Gif.style.left = piano3GifX+"px";
    piano3Gif.style.top = piano3GifY+"px";

    let trumpetGifX = e.screenX + 660;
    let trumpetGifY = e.screenY - 20;
    trumpetGif.style.left = trumpetGifX+"px";
    trumpetGif.style.top = trumpetGifY+"px";

    let trumpetPlayerGifX = e.screenX - 360;
    let trumpetPlayerGifY = e.screenY - 300;
    trumpetPlayerGif.style.left = trumpetPlayerGifX+"px";
    trumpetPlayerGif.style.top = trumpetPlayerGifY+"px";
  }
})

// let playPromise = document.getElementById('midiAudioHTMLObject');
// https://stackoverflow.com/questions/37674223/domexception-failed-to-load-because-no-supported-source-was-found/43434754

document.getElementById("mainVideo").addEventListener("click", ()=>{
    if(videoStarted == 0){
      videoStarted = 1;
      video.currentTime = 1.35;
      video.play();
      // setTimeout(() => {playPromise.play();}, 400);


      // setTimeout(() => {midiAudio.play();}, 400);

      // setTimeout(() => {MIDIjs.play('nevergonnagiveuup.mid');}, 400);

      MIDIjs.play('nevergonnagiveuup.mid');
    }
})

midiAudio.addEventListener('canplay', ()=>{
  console.log('midi audio loaded');
});
