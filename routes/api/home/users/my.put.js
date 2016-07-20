/**
 * Created by qoder on 16/7/20.
 */
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

function editMyMsg(req, res, next) {
    console.log(req.user);
    const condition = {id: req.user.id};
    var updateData = req.body;
    updateData.id = req.user.id;
    updateData.email = req.user.email;
    if (req.user.role === '学生') {
        for(var item in updateData){
            if(!updateData[item]){
                updateData[item]=req.user.students[item]
            }
        }
        var update = {$set: {students: updateData}};
    } else {
        for(var item2 in updateData){
            if(!updateData[item]){
                updateData[item]=req.user.teacher[item]
            }
        }
        var update = {$set: {teacher: updateData}};
    }
    // Users.update(condition, update).exec((err, info)=> {
    //     if(err){
    //         res.json({
    //             code:-1,
    //             data:{
    //                 msg:'未知错误'
    //             }
    //         })
    //     }else{
    //         res.json({
    //
    //         })
    //     }
    // });
    console.log(update);
}

module.exports = editMyMsg;