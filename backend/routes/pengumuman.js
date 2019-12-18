var express = require('express');
var router = express.Router();

const Pengumuman = require('../models').pengumuman
const sequelize = require('../models').sequelize
const Op = require('sequelize').Op
const WebSocket = require('ws');

/* GET pengumuman page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 
router.post('/addPengumuman', async (req, res, next) => {
  const result = await Log.create({
      pengumuman: req.body.pengumuman,
      created_by: req.body.created_by,
      isread: 1,
      created_at: new Date,
      updated_at: new Date,
  })
  res.json(result)
}); */

router.post('/addPengumumanViaLink', async (req, res, next) => {
  const ws = new WebSocket('ws://localhost:8001');
  ws.on('open', () => {
    const data = JSON.stringify({
      from: 'Bray',
      to : 'to',
      private: false,
      message: 'Hahaha ' + (new Date()).toISOString()
    })
    ws.send(data)
  })
  
  res.end()
});

router.post('/addPengumuman', async (req, res, next) => {
  const ws = new WebSocket('ws://localhost:8001');
  ws.on('open', async () => {

    const result = await Pengumuman.create({
      created_by: req.body.created_by,
      pengumuman: req.body.message,
      isread: 0,
      created_at: new Date,
      updated_at: new Date,
      
    })

    const pengumuman = await Pengumuman.findAndCountAll({
      where: {
        isread: 0
      }
    })
  
    const data = JSON.stringify({
      created_by: req.body.created_by,
      private: false,
      message: req.body.message  + (new Date()).toISOString(),
      count: pengumuman.count
    })

    ws.send(data)
    
  })

  res.end()
});

router.get('/hitungNotifikasi', async (req, res, next) => {
  const result = await Pengumuman.findAndCountAll({
    where: {
      isread: 0
    }
      // attributes: {exclude: ['id']}
  })
  .catch ( error => {
    res.status( 400 ).send(error)
  })
  res.json(result)
  console.log(result)
});


module.exports = router;
