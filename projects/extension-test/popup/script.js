function receivedTabsFromChrome(tabs){
  let currentTab = tabs[0];
  chrome.tabs.sendMessage(currentTab.id, {msg: "It's me, the Popup Window!"})
}


chrome.tabs.query({active:true, currentWindow: true

})
