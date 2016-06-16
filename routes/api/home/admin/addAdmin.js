/**
 * Created by qoder on 16/6/16.
 */
const mongoose = require('mongoose');
const uuid = require('uuid');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');
const resHandler = require('../../../../library/resHandler');


function addAdmin(req, res, next) {
    if (req.user.role === '学生') {
        resHandler(10005, res);
    } else {
        const email = req.body.email;
        Users.findOne({email: email}, function (err, user) {
            if (err) {
                res.json({
                    code: 10008,
                    data: {
                        Msg: '添加失败'
                    }
                })
            } else {
                if (user) {
                    resHandler(10008, res);
                } else {
                    const id = uuid.v1();
                    const teacher = {
                        id: id,
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        role: req.body.role,
                        academy: req.body.academy,
                        code:req.body.code
                    };
                    const conditions = {
                        id: id,
                        email: req.body.email,
                        password: req.body.password,
                        teacher: teacher,
                        role: req.body.role || '管理员',
                        isActive: true,
                        isCompleteMsg: true
                    };
                    Users.create(conditions, function (err, user) {
                        console.log(err);
                        if (err) {
                            res.json({
                                code: 10008,
                                data: {
                                    Msg: '添加失败'
                                }
                            })
                        } else {
                            res.json({
                                code: 10000,
                                data: {
                                    Msg: '添加管理员成功'
                                }
                            });
                        }
                    })
                }
            }
        });
    }
}

module.exports = addAdmin;