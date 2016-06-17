/**
 * Created by qoder on 16/6/17.
 */

const mongoose = require('mongoose');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');
const unKnownError = require('../../../../library/unknownError');
const resHandler = require('../../../../library/resHandler');


function changePass(req, res, next) {
    if (req.body.oldPassword && req.body.password) {
        const condition = {id: req.user.id, password: req.body.oldPassword};
        const update = {$set: {password: req.body.password}};
        Users.update(condition, update).exec((err, info)=> {
            if (err) {
                res.json({
                    code: 10012,
                    data: {
                        Msg: "修改密码失败"
                    }
                });
            } else {
                if (info.n != 1) {
                    res.json({
                        code: 10013,
                        data: {
                            Msg: '旧密码错误'
                        }
                    })
                } else {
                    if (info.ok == 1) {
                        res.json({
                            code: 10000,
                            data: {
                                Msg: '修改密码成功'
                            }
                        })
                    }
                }
            }
        });
    } else {
        res.json({
            code: 10001,
            data: {
                Msg: "请求格式错误"
            }
        })
    }
}



module.exports = changePass;