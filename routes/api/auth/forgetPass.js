/**
 * Created by qoder on 16/6/9.
 */
const mongoose = require('mongoose');
const moment = require('moment');
const tokenCreator = require('../../../library/tokenCreator');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');
const emailSender=require('../../../library/emailSender');
const unKnownError = require('../../../library/unknownError');
const resHandler = require('../../../library/resHandler');
const resetPassTpl=require('../../../template/resetPassTpl');
const localhost=require('../../../config/localhost');


function forgetPass(req, res) {
    if (req.body.email) {
        const condition = {email: req.body.email};
        Users.findOne(condition, function (err, user) {
            if (err) {
                unKnownError(res);
            } else {
                if (user) {
                    const email=req.body.email;
                    const expires = moment().add(7,'days').valueOf();
                    const id=user.id;
                    const token = tokenCreator(id,expires);
                    const subject='东北大学秦皇岛分校数学与统计学院大学生就业择业平台';
                    const html=resetPassTpl.replace(/authLink/g,localhost+'/users/resetPass/confirmmail?Token='+token+'&email='+email+'&subject='+encodeURI(subject));
                    const mailOptions = {
                        from: 'neuqstbysgl@163.com',
                        to: email,
                        subject:subject,
                        text: '欢迎使用东北大学秦皇岛分校大学生就业择业平台',
                        html: html
                    };
                    emailSender(mailOptions,res);
                } else {
                    resHandler(10011, res);
                }
            }
        })
    } else {
        resHandler(10001, res);
    }
}

module.exports = forgetPass;