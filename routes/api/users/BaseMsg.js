/**
 * Created by qoder on 16-6-14.
 */
const mongoose = require('mongoose');
const moment = require('moment');
const tokenCreator = require('../../../library/tokenCreator');
const UserModel = require('../../../models/Users');
const Users = mongoose.model('Users');
const unKnownError = require('../../../library/unknownError');
const resHandler = require('../../../library/resHandler');

function BaseMsg(req, res, next) {
    const condition = {id: req.user.id};
    req.body.id = req.user.id;
    req.body.email = req.user.email;
    const update = {$set: {students: req.body, name: req.body.name, isCompleteMsg: true}};
    Users.update(condition, update, function (err, update) {
        if (err) {
            unKnownError(res);
        } else {
            if (update.ok === 1) {
                res.json({
                    code: 10000,
                    data: {
                        Msg: '保存信息完成'
                    }
                })
            } else {
                res.json({
                    code: 90006,
                    data: {
                        Msg: '保存信息失败'
                    }
                })
            }
        }
    });
}

module.exports = BaseMsg;