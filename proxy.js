const WebSocket = require('ws');
const net = require('net');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  const tcp = net.createConnection(4629, 'dagnam.xyz');

  tcp.on('data', d => ws.send(d));
  ws.on('message', d => tcp.write(d));
});

console.log('Stratum Proxy running on ws://localhost:8080/ws');
