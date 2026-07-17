const WebSocket = require('ws');
const net = require('net');

console.log('Proxy starting...');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Browser connected to proxy');

  const tcp = net.createConnection(4629, 'dagnam.xyz');

  tcp.on('connect', () => {
    console.log('✅ Connected to pool dagnam.xyz:4629');
  });

  tcp.on('data', (data) => {
    console.log('Pool -> Browser:', data.toString().slice(0,100));
    ws.send(data);
  });

  ws.on('message', (data) => {
    console.log('Browser -> Pool:', data.toString().slice(0,100));
    tcp.write(data);
  });

  ws.on('close', () => tcp.destroy());
  tcp.on('close', () => ws.close());
});

console.log('Proxy listening on port 8080');
