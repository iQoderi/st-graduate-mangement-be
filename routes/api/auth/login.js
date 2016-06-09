/**
 * Created by qoder on 16/6/9.
 */
/*登录*/
const mongoose = require('mongoose');
const moment = require('moment');
const tokenCreator=require('../../../library/tokenCreator');
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
                        const expires = moment().add(7,'days').valueOf();
                        const id=user.id;
                        const token = tokenCreator(id,expires);
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