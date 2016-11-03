/**
 * Created by qoder on 16-6-9.
 */
const nodemailer = require('nodemailer');

const EMAIL_ACCOUNT_USER = '841599872@qq.com';
const EMAIL_ACCOUNT_PASSWORD = 'ntjtzgbntbxzbdib';
const YOUR_NAME = '东北大学秦皇岛分校大学生就业择业平台';

var smtpTransport = nodemailer.createTransport('SMTP', {
    host: "smtp.qq.com",   //主机
    secureConnection: true,   //使用SSL,
    port: 465,    //SMTP端口
    auth: {
        user: EMAIL_ACCOUNT_USER,
        pass: EMAIL_ACCOUNT_PASSWORD
    }
});

exports.sendMail = function (fromAddress, toAddress, subject, content, next) {
    var success = true;
    var mailOptions = {
        // NOTE: the fromAdress can actually be different than the email address you're sending it from. Which is good and bad I suppose. Use it wisely.
        from: YOUR_NAME + ' <' + fromAddress + '>',
        to: toAddress,
        subject: subject,
        html: content
    };

    // send the email!
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            success = false;
        }
        else {
            console.log('[INFO] Message Sent: ' + response.message);
        }
        next(error, success);
    });
};