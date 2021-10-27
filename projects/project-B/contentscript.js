console.log('content script loaded');

//listen for inputs
//send inputs to background script

document.addEventListener("click", (e)=>{
  console.log('click');
  port.postMessage({type: "clickInfo", mouseX: e.pageX, mouseY: e.pageY});
})

document.addEventListener("scroll", ()=>{
  console.log('scroll');
  port.postMessage({type: "scrollInfo", scrollHeight: document.documentElement.scrollTop});
})

document.addEventListener("mousemove", (e)=>{
  console.log('mousemove');
  // console.log('mouse x: ' + e.pageX);
  // console.log('mouse y: ' + e.pageY);
  port.postMessage({type: "mouseInfo", mouseX: e.pageX, mouseY: e.pageY});
})

document.addEventListener("mouseleave", (e)=>{
  console.log('mouseleave');
  port.postMessage("mouseleave");
})

document.addEventListener("mouseenter", (e)=>{
  console.log('mouseenter');
  port.postMessage("mouseenter");
})


var port = chrome.extension.connect({
      name: "Communication"
});
