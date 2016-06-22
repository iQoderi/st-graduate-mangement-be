/**
 * Created by qoder on 16/6/17.
 */
const mongoose = require('mongoose');
const moment = require('moment');
const tokenCreator = require('../../../../library/tokenCreator');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');
const unKnownError = require('../../../../library/unknownError');
const resHandler = require('../../../../library/resHandler');


function My(req, res, next) {
    const condition = {id: req.user.id};
    const options = {id: 1, name: 1, email: 1, _id: 0, role: 1,isCompleteMsg:1,isActive:1};
    Users.findOne(condition, options).exec((err, users)=> {
        if (err) {
            unKnownError(res);
        } else {
            if (users) {
                res.json({
                    code: 10000,
                    data: {
                        Msg: '获取用户信息成功',
                        users: users
                    }
                });
            } else {
                res.json({
                    code: 10010,
                    data: {
                        Msg: '用户不存在'
                    }
                })
            }
        }
    })
}


module.exports = My;