/**
 * Created by qoder on 16/6/23.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');

function changeAdminPass(req, res, next) {
    if (req.user.role === '学生') {
        res.json({
            code: 10005,
            data: {
                Msg: '用户没有权限'
            }
        })
    }

    if (req.query.id) {
        const id = req.query.id;
        const condition = {id: id};

        const update = {
            $set: {
                password:req.body.password
            }
        };

        Users.update(condition, update, function (err, info) {
            if (err) {
                res.json({
                    code: 90009,
                    data: {
                        Msg: '修改用户密码失败'
                    }
                })
            } else {
                if (info.n === 1) {
                    res.json({
                        code: 10000,
                        data: {
                            Msg: '修改用户密码成功'
                        }
                    })
                } else {
                    res.json({
                        code: 10011,
                        data: {
                            Msg: '用户不存在'
                        }
                    })
                }
            }
        })
    } else {
        res.json({
            code: 10001,
            data: {
                Msg: '数据请求格式错误'
            }
        })
    }
}

module.exports = changeAdminPass;