/**
 * Created by qoder on 16/6/9.
 */
const transporter = require('../config/sendEmail');
const resHandler = require('../library/resHandler');
function emailSender(data,res) {
    transporter.sendMail(data, function (err, info) {
        if (err) {
            resHandler(10007, res);
        } else {
            if (info) {
                resHandler(10002, res);
            }
        }
    });
}


module.exports = emailSender;