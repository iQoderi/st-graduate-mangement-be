/**
 * Created by qoder on 16/7/21.
 */
const mongoose = require('mongoose');
const GraduateModel = require('../../../../models/Users');
const Graduate = mongoose.model('graduate');

function test(req, res) {
    const condition = {id: req.user.id};
    Graduate.find(condition)

        .exec((err, user)=> {
            res.json({
                user: user
            })
        })
}


module.exports=test;