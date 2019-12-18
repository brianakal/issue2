const WebSocket = require('ws');

const wss = new WebSocket.Server({
   port: process.env.WS_PORT|| 8001 
})

wss.on('connection', ws => {
  ws.on('message', data => {

    console.log('incoming data', data)

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);

      }
    })
  })
})



/* 
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8000 })

wss.on('connection', ws => {
  ws.on('message', data => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})
 */