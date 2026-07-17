const WebSocket = require('ws');
const net = require('net');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Browser connected');

  const tcp = net.createConnection(4629, 'dagnam.xyz');

  tcp.on('connect', () => console.log('✅ Connected to pool'));

  tcp.on('data', (data) => {
    ws.send(data);
  });

  ws.on('message', (data) => {
    tcp.write(data);
  });

  ws.on('close', () => tcp.destroy());
  tcp.on('close', () => ws.close());
});

console.log('Proxy running on port 8080');
