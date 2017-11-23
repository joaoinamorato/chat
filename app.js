var app = require('./config/server');

var server = app.listen(80, function(){
    console.log('Server ON');
});

var io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', function(socket){
    console.log('Usuário conectou');
    
    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });


    socket.on('msgToServer', function(data){
        socket.emit(
            'msgToClient', 
            {username: data.username, msg: data.content }
        );

        socket.broadcast.emit(
            'msgToClient', 
            {username: data.username, msg: data.content }
        );

    });
});