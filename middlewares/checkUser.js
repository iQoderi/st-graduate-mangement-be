/**
 * Created by qoder on 16/11/3.
 */
const mongoose = require('mongoose');
const UserModel = require('../models/Users');
const Users = mongoose.model('Users');

function checkToken(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    var token = req.headers['token'] || req.query.Token || req.query.token;
    if (token) {
        const condition = {"token.token": token};
        Users.findOne(condition).exec((err, user)=> {
            if (err) {

            } else {

            }
        })
    } else {
        res.json({code: 10003, data: {msg: "用户没有登录"}});
    }
}


module.exports = checkToken;