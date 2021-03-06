/**
 * Created by qoder on 16/6/9.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');
const localhost = require('../../../config/localhost');
const unKnownError = require('../../../library/unknownError');
const resHandler = require('../../../library/resHandler');
const hash=require('../../../library/hash');

function passNew(req, res, next) {
    if (req.body.password && req.query.id) {
        const condition = {"token.token": req.query.id};
        const password =hash(req.user.email,req.body.password);
        const update = {$set: {password: password}};
        Users.update(condition, update, function (err, user) {
            if (err) {
                unKnownError(res);
            } else {
                if (user.n === 1) {
                    res.json({code: 10000, data: {msg: '密码修改成功'}})
                } else {
                    res.json({code: 90002, data: {msg: '邮件验证失败'}})
                }
            }
        })
    } else {
        resHandler(10001, res);
    }
}

module.exports = passNew;