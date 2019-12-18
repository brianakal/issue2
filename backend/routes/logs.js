var express = require('express');
var router = express.Router();

const Log = require('../models').logs
const sequelize = require('../models').sequelize
const Op = require('sequelize').Op

/* GET logs page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addLog', async (req, res, next) => {
  const result = await Log.create({
      from: req.body.from,
      to: req.body.to,
      message: req.body.message,
      created_at: new Date,
      updated_at: new Date,
  })
  res.json(result)
});

module.exports = router;
