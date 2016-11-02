/**
 * Created by qoder on 16/9/24.
 */
const mongoose = require('mongoose');
const graduate = require('../../../../models/Graduates');
const graduateModel = mongoose.model('graduate');

function getGraduateMsg(req, res, next) {
    if (req.user.role !== '学生') {
        res.json({code: 10005, data: {msg: '您没有权限'}});
        return false;
    } else {
        if (req.user.students.role === '毕业生') {
            const condition = {id: req.user.id};
            graduateModel.findOne(condition).exec((err, graduate)=> {
                if (err) {
                    res.json({code: -1, data: {msg: '未知错误'}})
                } else {
                    res.json({code: 10000, data: {graduate: graduate}});
                }
            })
        } else {
            res.json({code: 10005, data: {msg: '您不是毕业生'}});
        }
    }
}


module.exports = getGraduateMsg;
