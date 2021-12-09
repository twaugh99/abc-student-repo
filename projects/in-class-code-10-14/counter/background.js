console.log('background script loaded');
let counter = 0;

chrome.storage.local.get(['counterInStorage'], function(result){
  console.log('got this from storage');
  console.log('value is currently', result.counterInStorage);
  counter = result.counterInStorage;
})

function handleMessage(request, sender, sendResponse) {
  console.log(request);
  if(request.type == "increaseCounter"){
    counter++;
    console.log('counter in the background script: ', counter);
    //increase counter in local storage
    chrome.storage.local.set({counterInStorage: counter})
  }else if(request.type == "getCount"){
    sendResponse(counter);
  }
  // console.log("console in background: ", counter);
}

browser.runtime.onMessage.addListener(handleMessage);
