/**
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

function register(req, res) {
    if (req.body.email && req.body.password) {
        const email = req.body.email;
        Users.findOne({email: email}, function (err, user) {
            if (err) {
                unKnownError(res);
            } else {
                if (user) {
                    resHandler(10008, res);
                } else {
		    req.body.id = uuid.v1();
                    const subject = '东北大学秦皇岛分校数学与统计学院大学生就业择业平台';
                    const html = regHtml.replace(/authLink/g, localhost + '/users/register/confirmmail?id=' + req.body.id + '&email=' + email + '&subject=' + encodeURI(subject));
                    const mailOptions = {
                        from: 'neuqstbysgl@163.com',
                        to: email,
                        subject: subject,
                        text: '欢迎使用东北大学秦皇岛分校大学生就业择业平台',
                        html: html
                    };
                    Users.create(req.body, function (err) {
                        if (err) {
                            unKnownError(res);
                        } else {
                            emailSender(mailOptions, res);
                        }
                    });
                }
            }
        });
    } else {
        resHandler(10001, res);
    }
}

module.exports = register;
