// node server
// hasndles socket io logic

const io=require('socket.io')(8000);

const users = {};

io.on('connection', socket=>{

    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        console.log("New User", name);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message=>{
        socket.broadcast.emit('recieve', {message: message, name:users[socket.id]})
    });
})
