/**
 * Created by qoder on 16/8/11.
 */
const mongoose = require('mongoose');
const graduate = require('../../../../models/Graduates');
const uuid = require('uuid');
const graduateModel = mongoose.model('graduate');


function adminAddGraduate(req, res, next) {
    if (req.user.role !== '管理员' && req.user.role != '辅导员') {
        res.json({
            code: 90010,
            data: {
                msg: "permission  denied"
            }
        });
        return false;
    }

    try {
        var reqBody = {
            id: uuid.v1(),
            name: req.body.name,
            stuId: req.body.stuId,
            academy: req.body.academy,
            role: req.body.role,
            major: req.body.major,
            qq: req.body.QQNumber || '无',
            class: req.body.class,
            phone: req.body.phone,
            skill: req.body.skill || '未填写',
            question: req.body.question || '无',
            company: req.body.company,
            job: req.body.job,
            suggestion: req.body.suggestion || '无',
            recruit: req.body.recruit || '无'
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
    for (var item in reqBody) {
        if (!reqBody[item]) {
            flag = false;
            break;
        }
    }

    if (flag) {
        graduateModel.findOne({stuId: req.body.stuId}).exec((err, user)=> {
            if (err) {
                res.json({
                    code: 90011,
                    data: {
                        Msg: "添加毕业生失败"
                    }
                });
            } else {
                if (user) {
                    res.json({
                        code: 90012,
                        data: {
                            msg: '该毕业生已经存在'
                        }
                    })
                } else {
                    var graduate = new graduateModel(reqBody);
                    graduate.save((err, info)=> {
                        if (err) {
                            res.json({
                                code: 90011,
                                data: {
                                    Msg: "添加毕业生失败"
                                }
                            });
                        } else {
                            res.json({
                                code: 10000,
                                data: {
                                    Msg: '添加成功'
                                }
                            })
                        }
                    })
                }
            }
        });
    } else {
        res.json({
            code: 10001,
            data: {
                msg: '请求格式错误'
            }
        })
    }
}

module.exports = adminAddGraduate;