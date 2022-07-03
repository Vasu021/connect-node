// node server
// hasndles socket io logic

const io=require('socket.io')(8000);

const users = {};

// words for comparision
const words = [];
words[0]="";
words[1]="";
var index=0;

io.on('connection', socket=>{

    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        console.log("New User", name);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message=>{
        // socket.broadcast.emit('recieve', {message: message, name:users[socket.id]})
        if(index==0){
            words[index]=message;
            index++;
        }
        else{
            words[index]=message;
            socket.broadcast.emit('recieve', {message: message, name:users[socket.id]})
            if(words[0].toLowerCase()===words[1].toLowerCase()){
                io.emit('connected', {word1: words[0], word2: words[1]});
            }
            else{
                io.emit('not-connected', {word1: words[0], word2: words[1]});
            }
            index=0;
            words[0]="";
            words[1]="";
        }
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    })
})
