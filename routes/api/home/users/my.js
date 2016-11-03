/**
 * Created by qoder on 16/6/17.
 */
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

function My(req, res, next) {
    const condition = {id: req.user.id};
    console.log(req.user,3123123213);
    const options = {password:0,_id:0};
    Users.findOne(condition, options).exec((err, users)=> {
        if (err) {
            unKnownError(res);
        } else {
            if (users) {
                res.json({code: 10000, data: {msg: '获取用户信息成功', users: users}})
            } else {
                res.json({code: 10010, data: {msg: '用户不存在'}})
            }
        }
    })
}

module.exports = My;