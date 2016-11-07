/**
 * Created by qoder on 16-11-7.
 */
"use strict";
require('../../../models/Users');
const mongoose = require('mongoose');
const Users = mongoose.model("Users");
const verifyCoder = require('../../../library/verifyCoder');

module.exports = (req, res)=> {
    const verifyCode = verifyCoder();
    var text = verifyCode.text;
    var buffer = verifyCode.buffer;
    req.session.verifyCode = text;
    console.log(req.session);
    res.end(buffer);
}