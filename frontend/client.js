const socket=io('http://localhost:8000');
const form = document.getElementById('send-form');
const message = document.getElementById('messageInp');
const msgContainer = document.querySelector('.container');

const append = (msg, position) =>{
    const msgElement = document.createElement('div');
    msgElement.innerText = msg;
    msgElement.classList.add(position);
    msgContainer.appendChild(msgElement);
}

const user = prompt("Please enter your name");
socket.emit('new-user-joined', user);

socket.on('user-joined', username=>{
    append(`${username} joined the chat --------- let's go`, 'msg-right');
})

