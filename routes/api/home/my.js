/**
 * Created by qoder on 16-6-16.
 */
const mongoose = require('mongoose');
const UsersModel = require('../../../models/Users');
const Users = mongoose.model('Users');


function My(req, res, next) {
    const id = req.user.id;
    const condtion = {id: id};
    Users.findOne(condtion, function (err, user) {
        if (err) {

        } else {
            if (user) {

            } else {

            }
        }
    })
}