/**
 * Created by qoder on 16-7-1.
 */
const mongoose = require('mongoose');
const graduate = require('../../../../models/Graduates');
const Users = mongoose.model('Users');
const graduateModel = mongoose.model('graduate');


function addGraduate(req, res) {
    const condition = {id: req.user.id};
    const data = {id: req.user.id};
    if (req.user.role !== '学生') {
        res.json({
            code: 90010,
            data: {
                msg: "permission  denied"
            }
        });

        return;
    }

    graduateModel.findOne(condition).exec((err, user)=> {
        if (err) {
            res.json({
                code: -1,
                data: {
                    msg: '未知错误'
                }
            });

            return;
        }
        if (user) {
            res.json({
                code: 90012,
                data: {
                    msg: '该毕业生已经存在'
                }
            });

            return;
        } else {
            try {
                const data = {
                    id: req.user.id,
                    name: req.user.students.name,
                    stuId: req.user.students.studentId,
                    academy: req.user.students.academy,
                    major: req.user.students.major,
                    qq: req.user.students.QQNumber || '无',
                    class: req.user.students.class,
                    phone: req.user.students.phone,
                    role: req.body.role,
                    skill: req.body.skill,
                    company: req.body.company,
                    job: req.body.job,
                    suggestion: req.body.suggestion || '',
                    recruit: req.body.recruit || ''
                };
            } catch (e) {
                res.json({
                    code: -1,
                    data: {
                        msg: '未知错误'
                    }
                })
            }
            var flag = true;

            for (var item in data) {
                if (!data[item] && data[item] != '') {
                    flag = false;
                    break;
                }
            }

            if (flag) {
                var graduate = new graduateModel(data);
                graduate.save((err, info)=> {
                    if (err) {
                        res.json({
                            code: 90011,
                            data: {
                                Msg: "添加毕业生失败"
                            }
                        });
                    } else {
                        console.log(info);
                        res.json({
                            code: 10000,
                            data: {
                                Msg: '添加成功'
                            }
                        })
                    }
                })
            } else {
                res.json({
                    code: 10001,
                    data: {
                        msg: '请求格式错误'
                    }
                })
            }
        }
    });
}


module.exports = addGraduate;
