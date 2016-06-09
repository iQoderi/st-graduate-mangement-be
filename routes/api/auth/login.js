/**
 * Created by qoder on 16/6/9.
 */
/*登录*/
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jwt-simple');
const jwtTokenSecret=require('../../../config/id_rsa');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');
const unKnownError = require('../../../library/unknownError');
const resHandler = require('../../../library/resHandler');

function login(req, res, next) {
    if (req.body.email && req.body.password) {
        Users.findOne(req.body, function (err, user) {
            if (err) {
                unKnownError(res);
            } else {
                if (user) {
                    if (user.isActive) {
                        const expires = moment().add('days', 7).valueOf();
                        const id=user.id;
                        const token = jwt.encode({
                            iss:id,
                            exp: expires
                        }, jwtTokenSecret);
                        console.log(token);
                        res.json({
                            code:10000,
                            data:{
                                Msg:'登录成功',
                                token:token
                            }
                        });
                    } else {
                        resHandler(10009, res);
                    }
                } else {
                    resHandler(10010, res);
                }
            }
        })
    } else {
        resHandler(10001, res);
    }
}

module.exports = login;