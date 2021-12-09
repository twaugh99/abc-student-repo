let socket = io();


let form = document.getElementById('form');
let input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(input.value);
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
