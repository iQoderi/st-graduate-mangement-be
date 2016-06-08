const express = require('express');
const router = express.Router();

const sendEmail=require('../config/sendEmail');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    name:'Qoder',
    content:'haha'
  })
});

module.exports = router;
