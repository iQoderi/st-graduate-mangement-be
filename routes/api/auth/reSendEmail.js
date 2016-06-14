/**
 *
 * Created by qoder on 16/6/9.
 */
const mongoose = require('mongoose');
const uuid = require('uuid');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');
const localhost = require('../../../config/localhost');
const emailSender = require('../../../library/emailSender');
const regHtml = require('../../../template/mailtpl');
const unKnownError = require('../../../library/unknownError');
const resHandler = require('../../../library/resHandler');

function reSendEmail(req, res, next) {
    if (req.body.email) {
        const condition = {email: req.body.email};
        Users.findOne(condition, function (err, user) {
            if (err) {
                unKnownError(res);
            } else {
                if (user) {
                    if(!user.isActive){
                        const  email=req.body.email;
                        const subject = '东北大学秦皇岛分校数学与统计学院大学生就业择业平台';
                        const html = regHtml.replace(/authLink/g, localhost + '/users/register/confirmmail?id=' + user.id + '&email=' + email + '&subject=' + encodeURI(subject));
                        const mailOptions = {
                            from: 'neuqstbysgl@163.com',
                            to: email,
                            subject: subject,
                            text: '欢迎使用东北大学秦皇岛分校大学生就业择业平台',
                            html: html
                        };
                        emailSender(mailOptions, res);
                    }else{
                        res.json({
                            code:90001,
                            data:{
                                Msg:'该用户已经激活账户'
                            }
                        })
                    }
                } else {
                    resHandler(10011, res);
                }
            }
        })
    } else {
        resHandler(10001, res);
    }
}


module.exports = reSendEmail;