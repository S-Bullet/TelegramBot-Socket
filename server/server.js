const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    //res.send('<h1>Hello world</h1>');

    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('💚A client connected.');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        io.emit('chat message', msg);
    });

    // const interval = setInterval(() => {
    //     console.log('#####')
    //     // Get data from the data source
    //     const data = getData();
    
    //     // Send the data to the client
    //     socket.emit('data', data);
    // }, 1000);

    socket.on('disconet', () => {
        console.log('💥A client disconnected.');

        //clearInterval(interval);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});  