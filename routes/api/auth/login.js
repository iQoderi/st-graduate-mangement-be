/**
 * Created by qoder on 16/6/9.
 */
/*登录*/
const mongoose = require('mongoose');
const moment = require('moment');
const tokenCreator = require('../../../library/token');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');
const unKnownError = require('../../../library/unknownError');
const resHandler = require('../../../library/resHandler');

function login(req, res, next) {
    if (req.body.email && req.body.password) {
        Users.findOne(req.body).exec((err, user)=> {
            if (err) {
                unKnownError(res);
            } else {
                if (user) {
                    if(!user.isBlock){
                        if (user.isActive) {
                            const id = user.id;
                            const expires = moment().add(7, 'days').valueOf();
                            const createAt=Date.now();
                            const token = tokenCreator(createAt, expires,id);
                            if (user.isCompleteMsg) {
                                res.json({code: 10000, data: {msg: '登录成功', token: token.token}});
                            } else {
                                res.json({code: 90010, data: {msg: '登录成功,请完善信息', token: token.token}});
                            }
                        } else {
                            resHandler(10009, res);
                        }
                    }else{
                        res.json({code:10014, data:{msg:'账户已被冻结'}})
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
