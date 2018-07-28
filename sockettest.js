var io = require('socket.io')(7070);
var first = false
var socket1 = null

io.on('connection', (socket, err )=> {
    if(err)
    {
        console.log(`Connection Error ${err}`)
    }
    else{
        console.log(`Connected to Client: ${socket.id}`)
        if(first){
            socket.join(first)
            io.of('/').in(first).clients((error, clients) => {
                if (error) throw error;
                console.log(clients);
                });
            console.log('message',`${socket.id} has joined the party!`)

         }
        else{
            first = socket.id
            socket1 = socket
        }
    }
    socket.on('message', (msg,err) => {
        if(err){
            console.log(`Message Error ${err}`)
        }
        else{
            console.log(`Message received from ${socket.id}: Content: ${msg}`)
            socket.broadcast.emit('message',msg)
        }
    })
})
console.log(`Listening on http://localhost:7070/`);
