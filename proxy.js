const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
const net = require('net');

const server = new WebSocket.Server({ 
  port: 8080,
  path: '/ws'
});

server.on('connection', (ws) => {
  console.log('Browser connected via WSS');

  const tcp = net.createConnection(4629, 'dagnam.xyz');

  tcp.on('connect', () => console.log('Connected to pool'));
  tcp.on('data', (data) => ws.send(data));
  ws.on('message', (data) => tcp.write(data));

  ws.on('close', () => tcp.destroy());
  tcp.on('close', () => ws.close());
});

console.log('WSS Proxy running on wss://localhost:8080/ws');
