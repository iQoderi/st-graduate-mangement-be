/**
 * Created by qoder on 16/7/20.
 */
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const graduateModel=require('../../../../models/Graduates');
const Graduate=mongoose.model('graduate');

function editMyMsg(req, res, next) {
    const condition = {id: req.user.id};
    var updateData = req.body;
    updateData.id = req.user.id;
    updateData.email = req.user.email;
    if (req.user.role === '学生') {
        for (var item in req.user.teacher) {
            if (!updateData[item]) {
                updateData[item] = req.user.students[item]
            }
        }
        var update = {$set: {students: updateData}};
    } else {
        for (var item2 in req.user.students) {
            if (!updateData[item]) {
                updateData[item] = req.user.teacher[item]
            }
        }
        var update = {$set: {teacher: updateData}};
    }

    Users.update(condition, update).exec((err, info)=> {
        if (err) {
            res.json({
                code: -1,
                data: {
                    msg: '未知错误'
                }
            })
        } else {
            if (info.n === 1) {
		if(req.user.role==='学生'){
			const updateBys={
				name:updateData.name,
				stuId:updateData.studentId,
				academy:updateData.academy,
				major:updateData.major,
				class:updateData.class,
				phone:updateData.phone,
				qq:updateData.QQNumber
				
			};
			Graduate.update(condition,updateBys).exec((err,info)=>{
			});
		}
                res.json({
                    code: 10000,
                    data: {
                        msg: '修改个人信息成功'
                    }
                })
            } else {
                res.json({
                    code: 10011,
                    data: {
                        msg: "用户未找到"
                    }
                })
            }
        }
    });
}

module.exports = editMyMsg;
