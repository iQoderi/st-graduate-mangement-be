/**
 * Created by qoder on 16/7/22.
 */
const mongoose = require('mongoose');
const graduate = require('../../../../models/Graduates');
const Users = mongoose.model('Users');
const graduateModel = mongoose.model('graduate');


function modifyGraduate(req, res, next) {
    const data = {
        skill: req.body.skill,
        company: req.body.company,
        job: req.body.job,
        suggestion: req.body.suggestion||'',
        recruit: req.body.recruit||''
    };

    var flag = true;
    for (var item in data) {
        if (!data[item]&&data[item]!='') {
            flag = false;
            res.json({
                code: 10001,
                data: {
                    msg: '请求格式错误'
                }
            });

            return;
        }
    }

    if (flag) {
        const condition = {id: req.user.id};
        const update = {$set: data};
        graduateModel.update(condition, update).exec((err, info)=> {
            if (err) {
                res.json({
                    code: -1,
                    data: {
                        msg: '未知错误'
                    }
                })
            }
            if (info.n < 1) {
                res.json({
                    code: 10011,
                    data: {
                        msg: '用户没有找到'
                    }
                })
            } else {
                console.log(info);
                res.json({
                    code: 10000,
                    data: {
                        msg: '修改毕业信息成功'
                    }
                })
            }
        })
    }
}

module.exports = modifyGraduate;
