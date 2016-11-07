const express = require('express');
const router = express.Router();
const ccap = require('ccap')();


// var captcha2 = ccap(width, height, offset);

// var captcha3 = ccap({
//
//   width:256,//set width,default is 256
//
//   height:60,//set height,default is 60
//
//   offset:40,//set text spacing,default is 40
//
//   quality:100,//set pic quality,default is 50
//
//   generate:function(){//Custom the function to generate captcha text
//
//     //generate captcha text here
//
//     return text;//return the captcha text
//
//   }
//
// });


/* GET home page. */
router.get('/', function (req, res, next) {
    var ary = ccap.get();
    var text = ary[0];
    var buffer = ary[1];
    req.session.verifyCode = text;
    res.send(text);
});


module.exports = router;
