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
    var token = req.headers['token'] || req.query.Token || req.query.token||req.query.id;
    if (token) {
        const condition = {"token.token": token};
        Users.findOne(condition).exec((err, user)=> {
            if (err) {
                res.json({code:-1,data:{msg:'未知错误'}});
            } else {
                if(user){
                    var now=Date.now();
                    if(now>=user.token.expiresIn){
                        res.json({code:10006,data:{msg:'登录已过期'}});
                    }else{
                        req.user=user;
                        next();
                    }
                }else{
                    res.json({code:10006,data:{msg:'登录已过期'}});
                }
            }
        })
    } else {
        res.json({code: 10003, data: {msg: "用户没有登录"}});
    }
}


module.exports = checkToken;