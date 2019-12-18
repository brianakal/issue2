var express = require('express');
var router = express.Router();

const Log = require('../models').logs
const sequelize = require('../models').sequelize
const Op = require('sequelize').Op

/* GET pengumuman page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addPengumuman', async (req, res, next) => {
  const result = await Log.create({
      pengumuman: req.body.pengumuman,
      created_by: req.body.created_by,
      isread: 1,
      created_at: new Date,
      updated_at: new Date,
  })
  res.json(result)
});

router.get('/hitungNotifikasi', async (req, res, next) => {
  const result = await Tasks.findAndCountAll({
    where: {
      isread: 1
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
