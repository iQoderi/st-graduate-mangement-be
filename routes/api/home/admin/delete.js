/**
 * Created by qoder on 16/6/16.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');

function rmAdmin(req, res, next) {
    if (req.query.id) {
        const condition = {id: req.query.id};
        Users.remove(condition, function (err, info) {
            if (err) {
                res.json({code: 90007, data: {msg: '删除失败'}})
            } else {
                if (info.result.n === 1) {
                    res.json({code: 10000, data: {msg: '删除成功'}})
                } else {
                    res.json({code: 10011, data: {msg: '用户不存在'}})
                }
            }
        })
    } else {
        res.json({code: 10001, data: {msg: '数据请求格式错误'}})
    }
}


module.exports = rmAdmin;