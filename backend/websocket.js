const WebSocket = require('ws')

const Log = require('./models').log
const sequelize = require('./models').sequelize
const Op = require('sequelize').Op

const fs = require('fs')

const wss = new WebSocket.Server({ port: 8000 })

wss.on('connection', ws => {
  ws.on('message', data => {

    const payload = JSON.parse(data)

    wss.clients.forEach(async(client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);

        //simpan ke database
        const result = await Log.create({
            from: payload.from,
            to: payload.to,
            message: payload.message,
            created_at: new Date,
            updated_at: new Date,
        })

        fs.appendFile('logger.log', data + "\n", (err) => {

        })
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