/**
 * Created by qoder on 16/6/17.
 */

const mongoose = require('mongoose');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');
const hash=require('../../../../library/hash');


function changePass(req, res, next) {
    req.body.oldPassword=hash(req.user.email,req.body.oldPassword);
    if (req.body.oldPassword && req.body.password) {
        const condition = {id: req.user.id, password: req.body.oldPassword};
        const update = {$set: {password: req.body.password}};
        Users.update(condition, update).exec((err, info)=> {
            if (err) {
                res.json({code: 10012, data: {msg: "修改密码失败"}});
            } else {
                if (info.n != 1) {
                    res.json({code: 10013, data: {msg: '旧密码错误'}})
                } else {
                    if (info.ok == 1) {
                        res.json({code: 10000, data: {msg: '修改密码成功'}})
                    }
                }
            }
        });
    } else {
        res.json({code: 10001, data: {msg: "请求格式错误"}})
    }
}


module.exports = changePass;