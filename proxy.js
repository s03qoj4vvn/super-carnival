const WebSocket = require('ws');
const net = require('net');

const server = new WebSocket.Server({ port: 8080, path: '/ws' });

server.on('connection', (ws) => {
  const tcp = net.createConnection(4629, 'dagnam.xyz');

  tcp.on('data', (data) => ws.send(data));
  ws.on('message', (data) => tcp.write(data));

  ws.on('close', () => tcp.destroy());
  tcp.on('close', () => ws.close());
});

console.log('Stratum Proxy running on ws://localhost:8080/ws');
