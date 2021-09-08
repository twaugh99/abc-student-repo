function duplicateDiv() {
  console.log(document.getElementById('buttonsDiv').innerHTML);

  document.getElementById('buttonsDiv').innerHTML = document.getElementById('buttonsDiv').innerHTML += document.getElementById('buttonsDiv').innerHTML;
}
