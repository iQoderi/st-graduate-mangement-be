/**
 * Created by qoder on 16-11-7.
 */
'use strict';
const MD5 = require('md5');
const tokenCreator=require('../library/tokenCreator');
const decodeJWT=require('../library/decodeJwt');

module.exports = function (req, res, next) {
    const verifyCode = req.body.verifyCode;
    const serverVerifyCode=decodeJWT(res.cookie['verifyCode']);
    if (verifyCode) {
        if (verifyCode.toLowerCase() === serverVerifyCode.iss.toLowerCase()) {
            if(serverVerifyCode.exp>Date.now()){
                next();
            }else{
                res.json({code:90021,data:{msg:'验证码过期'}})
            }
        } else {
            res.json({code: 90020, data: {msg: '验证码错误'}})
        }
    } else {
        res.json({code: 90019, data: {msg: "请输入验证码"}})
    }
}