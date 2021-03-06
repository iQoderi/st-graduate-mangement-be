/**
 * Created by qoder on 16/11/3.
 */
const MD5 = require('md5');
const uuid = require('uuid');
const mongoose = require('mongoose');
const userModel = require('../models/Users');
const Users = mongoose.model('Users');

function jwt(createAt, expireIn, userId) {
    var token = {
        createAt: createAt,
        expiresIn: expireIn,
        token: MD5(uuid.v4() + userId)
    };
    const condition = {id: userId};
    const update = {$set: {token: token}};
    Users.update(condition, update).exec((err,info)=>{});
    return token;
}

module.exports = jwt;