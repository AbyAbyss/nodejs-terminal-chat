const server = require('net').createServer();
let counter = 0;
let sockets = {};

server.on('connection', socket => {
    socket.id = counter++;
    sockets[socket.id] = socket;

    console.log('Client is connected');
    socket.write(`Welcome user-${socket.id}!\n`);

    socket.on('data', data => {
        Object.entries(sockets).forEach(([key, _sock]) => {
            _sock.write(`user-${socket.id}: `);
            _sock.write(data);
        });
    });

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log('Client disconnected');
    });
});

server.listen(8000, () => console.log('Server started.'));