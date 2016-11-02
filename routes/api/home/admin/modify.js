/**
 * Created by qoder on 16/6/16.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');

function modifyAdmin(req, res, next) {
    if (req.query.id) {
        const id = req.query.id;
        const condition = {id: id};
        const teacher = {
            id: id,
            name: req.body.name,
            phone: req.body.phone,
            role: req.body.role || '管理员',
            academy: req.body.academy,
            code: req.body.code,
            email: req.body.email
        };

        const update = {
            $set: {
                id: id, teacher: teacher,
                role: req.body.role || '管理员', isActive: true, isCompleteMsg: true}
        };
        Users.update(condition, update, function (err, info) {
            if (err) {
                res.json({code: 90009, data: {msg: '编辑信息失败'}})
            } else {
                if (info.n === 1) {
                    res.json({code: 10000, data: {msg: '编辑信息成功'}})
                } else {
                    res.json({code: 10011, data: {msg: '用户不存在'}})
                }
            }
        })
    } else {
        res.json({code: 10001, data: {msg: '数据请求格式错误'}})
    }
}

module.exports = modifyAdmin;