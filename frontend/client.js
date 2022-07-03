const socket=io('http://localhost:8000');
const form = document.getElementById('send-form');
const message = document.getElementById('messageInp');
const msgContainer = document.querySelector('.container');
var gameMsg="";


// functions ---------------------------------------------------------------------------

const append = (msg, position) =>{
    // position => (msg-left, msg-right)
    const msgElement = document.createElement('div');
    msgElement.innerText = msg;
    msgElement.classList.add(position);
    msgContainer.appendChild(msgElement);
}


// socket programming and functions -------------------------------------------------------------------

const user = prompt("Please enter your name");
document.getElementById('current-username').innerHTML=`username : ${user}`;
socket.emit('new-user-joined', user);

// A new user joined
socket.on('user-joined', username=>{
    append(`${username} joined the chat`, 'user-joined');
});

// recieved a message
socket.on('recieve', data =>{
    append(`${data.name} :: ${data.message}`,'msg-left');
});


// sent a message
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    gameMsg=message.value;
    socket.emit('send', message.value);
    append(`You :: ${message.value}`, 'msg-right');
    
    message.value="";
});

// if someone disconnects
socket.on('user-left', data=>{
    append(`${data} disconnected`, 'user-disconnect');
});

// if words connected
socket.on('connected', data=>{
    append(`====== CONNECTED!!! word::${data.word1} ======`, 'connected');
});

// if words not connected
socket.on('not-connected', data=>{
    append(`${data.word1} <---TRY AGAIN---> ${data.word2}`, 'not-connected');
});