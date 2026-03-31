const net = require('net');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('error', () => {});
});

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        try {
            if (data.length >= 8) {
                const angle = data.readFloatLE(4);
                const payload = JSON.stringify({ angle });
                
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(payload);
                    }
                });
            }
        } catch (err) {}
    });

    socket.on('error', () => {});
});

server.on('error', () => {});

server.listen(9000, '0.0.0.0');
