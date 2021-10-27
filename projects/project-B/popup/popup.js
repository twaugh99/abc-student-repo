function saveState(type, secondaryInformation) {
  if(type == "modeInfo"){
    chrome.storage.sync.set({"mode": secondaryInformation})
  }

  if(type == "volumeInfo"){
    chrome.storage.sync.set({"volume": secondaryInformation})
  }

  if(type == "drumInfo"){
    chrome.storage.sync.set({"drumMode": secondaryInformation})
  }

  if(type == "scaleInfo"){
    chrome.storage.sync.set({"scale": secondaryInformation})
  }
}

window.addEventListener('load', (event) => {
  console.log('loaded and checking for saved data');

  chrome.storage.sync.get("mode", function(obj){
     console.log(obj);
     if(obj.mode == "history") {
       document.getElementById("historyModeButton").style.backgroundColor = "white";
       document.getElementById("liveModeButton").style.backgroundColor = "#A9A9A9";
       document.getElementById("historyModePlaybackButton").style.visibility = "visible";
     }
     if(obj.mode == "live") {
       document.getElementById("historyModeButton").style.backgroundColor = "#A9A9A9";
       document.getElementById("liveModeButton").style.backgroundColor = "white";
       document.getElementById("historyModePlaybackButton").style.visibility = "hidden";
     }
  });

  chrome.storage.sync.get("drumMode", function(obj){
     console.log(obj);
     if(obj.drumMode == "on") {
       document.getElementById("drumOnButton").style.backgroundColor = "white";
       document.getElementById("drumOffButton").style.backgroundColor = "#A9A9A9";
     }
     if(obj.mode == "off") {
       document.getElementById("drumOnButton").style.backgroundColor = "#A9A9A9";
       document.getElementById("drumOffButton").style.backgroundColor = "white";
     }
  });

  chrome.storage.sync.get("volume", function(obj){
     console.log(obj.volume);
     document.getElementById('volumeSlider').value = obj.volume;
  });

  chrome.storage.sync.get("scale", function(obj){
     console.log(obj.scale);
     if(obj.scale == "C_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "0";
     }
     if(obj.scale == "Db_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "1";
     }
     if(obj.scale == "D_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "2";
     }
     if(obj.scale == "Eb_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "3";
     }
     if(obj.scale == "E_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "4";
     }
     if(obj.scale == "F_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "5";
     }
     if(obj.scale == "F#_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "6";
     }
     if(obj.scale == "G_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "7";
     }
     if(obj.scale == "Ab_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "8";
     }
     if(obj.scale == "A_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "9";
     }
     if(obj.scale == "Bb_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "10";
     }
     if(obj.scale == "B_Major"){
       document.getElementById('scaleDropdown').selectedIndex = "11";
     }
     if(obj.scale == "C_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "12";
     }
     if(obj.scale == "C#_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "13";
     }
     if(obj.scale == "D_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "14";
     }
     if(obj.scale == "Eb_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "15";
     }
     if(obj.scale == "E_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "16";
     }
     if(obj.scale == "F_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "17";
     }
     if(obj.scale == "F#_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "18";
     }
     if(obj.scale == "G_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "19";
     }
     if(obj.scale == "G#_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "20";
     }
     if(obj.scale == "A_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "21";
     }
     if(obj.scale == "Bb_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "22";
     }
     if(obj.scale == "B_Minor"){
       document.getElementById('scaleDropdown').selectedIndex = "23";
     }
  });
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
  saveState("modeInfo", "live");
  port.postMessage({type: "modeInfo", mode: "live"});
})

document.getElementById("drumOffButton").addEventListener("click", ()=>{
  document.getElementById("drumOnButton").style.backgroundColor = "#A9A9A9";
  document.getElementById("drumOffButton").style.backgroundColor = "white";
  saveState("drumInfo", "off");
  port.postMessage({type: "drumInfo", state: "off"});
})

document.getElementById("drumOnButton").addEventListener("click", ()=>{
  document.getElementById("drumOnButton").style.backgroundColor = "white";
  document.getElementById("drumOffButton").style.backgroundColor = "#A9A9A9";
  saveState("drumInfo", "on");
  port.postMessage({type: "drumInfo", state: "on"});
})

document.getElementById("volumeSlider").addEventListener("input", ()=>{
  saveState("volumeInfo", volumeSlider.value);
  port.postMessage({type: "volumeInfo", volume: volumeSlider.value});
})

document.getElementById("scaleDropdown").addEventListener("change", ()=>{
  saveState("scaleInfo", scaleDropdown.value);
  port.postMessage({type: "scaleInfo", scale: scaleDropdown.value});
})

document.getElementById("historyModePlaybackButton").addEventListener("click", ()=>{
  port.postMessage({type: "historyModePlaybackInfo"});
})

var port = chrome.extension.connect({
      name: "Communication"
});
