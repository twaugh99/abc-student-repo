let backgroundColor = 2;

function duplicateDiv() {
  // console.log(document.getElementById('buttonsDiv').innerHTML);

  document.getElementById('buttonsDiv').innerHTML = document.getElementById('buttonsDiv').innerHTML += document.getElementById('buttonsDiv').innerHTML;
  updateBackgroundColor();
}

function updateBackgroundColor(){
  backgroundColor = backgroundColor*2;
  // console.log('background color: ' + backgroundColor);
  document.body.style.backgroundColor = rgbToHex(255-backgroundColor, 255-backgroundColor, 255-backgroundColor);;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  if(r > 0){
    // console.log("#" + componentToHex(r) + componentToHex(g) + componentToHex(b));
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  } else {
    return "#000000";
  }
}
//Code from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
