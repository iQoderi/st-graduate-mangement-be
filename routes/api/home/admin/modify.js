/**
 * Created by qoder on 16/6/16.
 */
/**
 * Created by qoder on 16/6/16.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');
const resHandler = require('../../../library/resHandler');

function modifyAdmin(req, res, next) {
    if (res.user.role === '学生') {
        res.json({
            code: 10005,
            data: {
                Msg: '用户没有权限'
            }
        })
    }
    if (req.body.id) {
        const condition = {id: req.body.id};
        Users.remove(condition, function (err) {
            if (err) {
                res.json({
                    code: 90007,
                    data: {
                        Msg: '删除失败'
                    }
                })
            } else {
                res.json({
                    code: 10000,
                    data: {
                        Msg: '删除成功'
                    }
                })
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

module.exports = modifyAdmin;