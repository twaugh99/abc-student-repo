let currentMode = "live";

function saveState(type, secondaryInformation) {
  if(type == "modeInfo"){
    console.log('info type: ' + type);
    console.log('secondaryInformation: ' + secondaryInformation);

    chrome.storage.sync.set({'modeValue': secondaryInformation}, function() {
      let testCheck = localStorage.getItem('modeValue');
      console.log(testCheck);
      console.log('mode saved');

    });
  }

  if(type == "volumeInfo"){
    console.log('info type: ' + type);
    console.log('secondaryInformation: ' + secondaryInformation);

    chrome.storage.sync.set({'volumeValue': secondaryInformation}, function() {
      let testCheck = localStorage.getItem('volumeValue');
      console.log(testCheck);
      console.log('mode saved');

    });
  }
}


window.addEventListener('load', (event) => {
  console.log('loaded and checking for saved data');
    if(localStorage.getItem('mode') == "history") {
      document.getElementById("historyModeButton").style.backgroundColor = "white";
      document.getElementById("liveModeButton").style.backgroundColor = "#A9A9A9";
      document.getElementById("historyModePlaybackButton").style.visibility = "visible";
    }
    if(localStorage.getItem('mode') == "live") {
      document.getElementById("historyModeButton").style.backgroundColor = "#A9A9A9";
      document.getElementById("liveModeButton").style.backgroundColor = "white";
      document.getElementById("historyModePlaybackButton").style.visibility = "hidden";
    }
});


document.getElementById("historyModeButton").style.backgroundColor = "#A9A9A9";
document.getElementById("drumOnButton").style.backgroundColor = "#A9A9A9";
document.getElementById("historyModePlaybackButton").style.visibility = "hidden";

document.getElementById("historyModeButton").addEventListener("click", ()=>{
  document.getElementById("historyModeButton").style.backgroundColor = "white";
  document.getElementById("liveModeButton").style.backgroundColor = "#A9A9A9";
  document.getElementById("historyModePlaybackButton").style.visibility = "visible";
  saveState("modeInfo", "history");
  port.postMessage({type: "modeInfo", mode: "history"});
})

document.getElementById("liveModeButton").addEventListener("click", ()=>{
  document.getElementById("historyModeButton").style.backgroundColor = "#A9A9A9";
  document.getElementById("liveModeButton").style.backgroundColor = "white";
  document.getElementById("historyModePlaybackButton").style.visibility = "hidden";
  port.postMessage({type: "modeInfo", mode: "live"});
})

document.getElementById("drumOffButton").addEventListener("click", ()=>{
  document.getElementById("drumOnButton").style.backgroundColor = "#A9A9A9";
  document.getElementById("drumOffButton").style.backgroundColor = "white";
  port.postMessage({type: "drumInfo", state: "off"});
})

document.getElementById("drumOnButton").addEventListener("click", ()=>{
  document.getElementById("drumOnButton").style.backgroundColor = "white";
  document.getElementById("drumOffButton").style.backgroundColor = "#A9A9A9";
  port.postMessage({type: "drumInfo", state: "on"});
})

document.getElementById("volumeSlider").addEventListener("input", ()=>{
  saveState("volumeInfo", volumeSlider.value);
  port.postMessage({type: "volumeInfo", volume: volumeSlider.value});
})

document.getElementById("scaleDropdown").addEventListener("change", ()=>{
  port.postMessage({type: "scaleInfo", scale: scaleDropdown.value});
})

var port = chrome.extension.connect({
      name: "Communication"
});
