var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    code:10000,
    data:{
      name:'胡兴国',
      is:'sb'
    }
  })
});


module.exports = router;
