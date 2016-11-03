/**
 * Created by qoder on 16/6/9.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');


//确认忘记密码重新设置密码邮件
function confirmResetPass(req, res, next) {
    const condition = {"token.token": req.query.token};
    const update = {$set: {isActive: true}};
    Users.update(condition, update, function (err) {
        if (err) {
            res.send('修改密码失败');
        } else {
            res.render('resetPass', {email: req.query.email,id:req.user.token.token});
        }
    })
}


module.exports = confirmResetPass;