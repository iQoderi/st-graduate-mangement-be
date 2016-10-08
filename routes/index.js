var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    code:10000,
    data:{
      name:'齐超',
      is:'shuaibi'
    }
  })
});


module.exports = router;
