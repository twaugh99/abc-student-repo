console.log('script loaded');

function generateSquares(){

  document.getElementById("rectanglesDiv").innerHTML = "";


  let numberOfSquares = document.getElementById("textbox").value;
  // console.log(numberOfSquares + ' squares');

  for(let i = 0; i < numberOfSquares; i++){

    let img = document.createElement('img');
    img.src = 'whiteRectangle.png';

    document.getElementById("rectanglesDiv").appendChild(img);
  }

  // console.log(document.getElementById("rectanglesDiv"));
  console.log(numberOfSquares + " Squares Generated");
}
