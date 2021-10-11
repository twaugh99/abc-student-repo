console.log('script loaded in popup');

let song = new Audio("the7thElement.wav");

song.play();
console.log('playing song');

function receivedTabsFromChrome(tabs){
  let currentTab = tabs[0];
  chrome.tabs.sendMessage(currentTab.id, {msg: "do the stuff"})
}

chrome.tabs.query({active: true, currentWindow: true}, receivedTabsFromChrome)
