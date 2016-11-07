/**
 * Created by qoder on 16-11-7.
 */
'use strict';
const MD5 = require('md5');
module.exports = function (req, res, next) {
    const verifyCode = req.body.verifyCode;
    if (verifyCode) {
        if (verifyCode === req.session.verifyCode) {
            req.session.verifyCode = MD5('cici' + Date.now() + 'qoder');
            next();
        } else {
            req.session.verifyCode = MD5('cici' + Date.now() + 'qoder');
            res.json({
                code: 90020,
                data: {
                    msg: '验证码错误'
                }
            })
        }
    } else {
        res.json({
            code: 90019,
            data: {
                msg: "请输入验证码"
            }
        })
    }
}