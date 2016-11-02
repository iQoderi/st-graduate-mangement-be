/**
 * Created by qoder on 16/9/24.
 */
const mongoose = require('mongoose');
const graduate = require('../../../../models/Graduates');
const graduateModel = mongoose.model('graduate');

function updateGraduate(req, res, next) {
    const condition = {id: req.user.id};
    if (req.user.role !== '学生') {
        res.json({code: 90010, data: {msg: "permission  denied"}});
        return;
    }

    try {
        var data = {
            id: req.user.id,
            name: req.user.students.name,
            stuId: req.user.students.studentId,
            academy: req.user.students.academy,
            major: req.user.students.major,
            qq: req.user.students.QQNumber || '无',
            class: req.user.students.class,
            phone: req.user.students.phone,
            skill: req.body.skill,
            question: req.body.question,
            company: req.body.company,
            job: req.body.job,
            suggestion: req.body.suggestion,
            recruit: req.body.recruit
        };
    } catch (e) {
        res.json({code: -1, data: {msg: '未知错误'}})
    }

    var flag = true;
    for (var item in data) {
        if (!data[item]) {flag = false;break;}
    }

    if (flag) {
        graduateModel.update(condition, data).exec((err, info)=> {
            if (err) {
                res.json({code: 90011, data: {msg: "更新毕业生信息失败"}});
            } else {
                res.json({code: 10000, data: {msg: '添加成功'}})
            }
        })
    } else {
        res.json({code: 10001, data: {msg: '请求格式错误'}})
    }
}


module.exports = updateGraduate;