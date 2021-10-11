console.log('this is running');

let url = [];
for(let i = 0; i < 6; i++){
  url[i] = "vitasgif"+(i+1)+".gif";
}
console.log(url);

function chooseRandomGif(){
  let rand = Math.random() * url.length;
  // console.log(rand);
  if(rand < 1){
    return chrome.runtime.getURL("popup/vitasgifs/vitasgif1.gif");
  }
  if(rand > 1 && rand < 2){
    return chrome.runtime.getURL("popup/vitasgifs/vitasgif2.gif");
  }
  if(rand > 2 && rand < 3){
    return chrome.runtime.getURL("popup/vitasgifs/vitasgif3.gif");
  }
  if(rand > 3 && rand < 4){
    return chrome.runtime.getURL("popup/vitasgifs/vitasgif4.gif");
  }
  if(rand > 4 && rand < 5){
    return chrome.runtime.getURL("popup/vitasgifs/vitasgif5.gif");
  }
  if(rand > 5 && rand < 6){
    return chrome.runtime.getURL("popup/vitasgifs/vitasgif6.gif");
  }
}

function makeVitas(){
  let img = document.getElementsByTagName("img");
  // console.log("img: " + img[]);
  for(let i = 0; i < img.length; i++){
    img[i].src = chooseRandomGif();
  }
}

function repl(find, replace){
  console.log("replacing", find, "with", replace)
  // info on the regular expression here: https://www.designcise.com/web/tutorial/how-to-replace-all-occurrences-of-a-word-in-a-javascript-string
  var finder = new RegExp(find,"g");
  // we replace the entire website's content with itself, but replace every occurence of
  // the word that "finder" carries with the word that "replace" carries
  // e.g. repl("Moon", "Potato")
  document.body.innerHTML = document.body.innerHTML.replace(finder, replace);
}

function makeCyrillic(){
  console.log('making cyrillic');
  // repl("a", "aaaa");
  //unfortunately, my plan of changing all the text to cyrillic on the page was much more complicated than I thought it was going to be
  //I was struggling to get the russian UTF characters to work without breaking the page. Also, because I want to replace all the text not specific words the function wasn't working because it was replacing some non-string text in the code
}

let blackwhite = 0;
let isStrobing = 0;
let rainbow = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"]
let currentColor = 0;

interval = setInterval(function(){
  if(isStrobing == 1){
    if(blackwhite == 0){
      if(currentColor < rainbow.length){
        document.body.style.background = rainbow[currentColor];
        currentColor++;
      } else {
        currentColor = 0;
        document.body.style.background = rainbow[currentColor];
        currentColor++;
      }
      blackwhite = 1;
    } else {
      document.body.style.background = "black";
      blackwhite = 0;
    }
  }
  console.log("interval running");
}, 100);



function gotMessage(){
  console.log("received message");
  makeVitas();
  isStrobing = 1;
  // makeCyrillic();
}

chrome.runtime.onMessage.addListener(gotMessage);
