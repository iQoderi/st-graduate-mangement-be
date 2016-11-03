/**
 * Created by qoder on 16/11/3.
 */
const MD5 = require('md5');
function hash(username, password) {
    var uArray = username.split("@");
    var prePass = password.substring(0, 3);
    var afterPass = password.substring(3);
    var newPass = uArray[0] + afterPass + uArray[1] + prePass;
    return MD5(newPass);
}

module.exports = hash;


