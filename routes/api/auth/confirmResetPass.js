/**
 * Created by qoder on 16/6/9.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');


//确认忘记密码重新设置密码邮件
function confirmResetPass(req, res, next) {
    const condition = {id: req.query.id};
    const update = {$set: {isActive: true}};
    Users.update(condition, update, function (err) {
        if (err) {
            res.send('激活您的账户失败,您可选择重新发送激活邮件');
        } else {
            res.render('resetPass', {email: req.query.email,id:req.user.id});
        }
    })
}


module.exports = confirmResetPass;