/**
 *
 * Created by qoder on 16/6/9.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');

//确认注册邮件
function confirmEmail(req, res) {
    const condition = {id: req.query.id};
    const update = {$set: {isActive: true}};
    Users.update(condition, update, function (err) {
        if (err) {
            res.send('激活您的账户失败,您可选择重新发送激活邮件');
        } else {
            res.render('confirmRegSucc', {email: req.query.email});
        }
    })
}


module.exports = confirmEmail;