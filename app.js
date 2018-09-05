var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var currentConnections = {};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    log('a user connected');
    socket.on('disconnect', function () {
        log('user disconnected');
    });
    socket.on('chat message', function (name, msg) {
        io.emit('chat message', name + ': ' + msg);
    });
});

http.listen(3000, function () {
    log('listening on *:3000');
});

function log(msg) {
    console.log(msg);
}