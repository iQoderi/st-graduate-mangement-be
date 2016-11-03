/**
 * Created by qoder on 16-6-7.
 */
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const secretKey = require('./../config/id_rsa');
const UserModel = require('../models/Users');
const Users = mongoose.model('Users');
const unKnownError = require('../library/unknownError');
const resHandler = require('../library/resHandler');


function checkToken(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    var token = req.headers['token'] || req.query.Token;
    if (token) {
        try {
            const decoded = jwt.decode(token, secretKey);
            if (decoded.exp <= Date.now()) {
                resHandler(10006, res);
            } else {
                const condition = {id: decoded.iss};
                Users.findOne(condition, function (err, user) {
                    if (err) {
                        unKnownError(res);
                    } else {
                        if (user) {
                            req.user = user;
                            next();
                        } else {
                            resHandler(10006, res);
                        }
                    }
                })
            }
        } catch (e) {
            resHandler(10006, res);
        }
    } else {
        resHandler(10006, res);
    }
}

module.exports = checkToken;
