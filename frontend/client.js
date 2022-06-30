const socket=io('http://localhost:8000');

const form = document.getElementById('send-form');
const message = document.getElementById('messageInp');
const msgContainer = document.querySelector('.container');

const user = prompt("Please enter your name");

socket.emit('new-user-joined', user);