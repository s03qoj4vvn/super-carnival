const WebSocket = require('ws');
const net = require('net');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('[Proxy] Browser connected');

  const tcp = net.createConnection(4629, 'dagnam.xyz');

  tcp.on('connect', () => console.log('[Proxy] Connected to pool dagnam.xyz:4629'));
  tcp.on('data', (data) => ws.send(data));
  ws.on('message', (data) => tcp.write(data));

  ws.on('close', () => tcp.destroy());
  tcp.on('close', () => {
    console.log('[Proxy] Pool disconnected');
    ws.close();
  });
});

console.log('[Proxy] Listening on ws://localhost:8080');
