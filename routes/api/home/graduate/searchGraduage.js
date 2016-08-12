/**
 * Created by qoder on 16/8/11.
 */
const mongoose = require('mongoose');
const graduate = require('../../../../models/Graduates');
const graduateModel = mongoose.model('graduate');

function searchGraduate(req, res, next) {
    const condition = {};
    if (req.body.academy && req.body.academy != '全部') {
        condition.academy = req.body.academy;
    }
    
    if (req.body.major) {
        condition.major = req.body.major;
    }

    if (req.body.stuId) {
        condition.stuId = req.body.stuId;
    }

    var start = 0;
    var pageSize = 10;
    if (req.query.pageSize) {
        pageSize = parseInt(req.query.pageSize);
    }
    if (req.query.start <= 0) {
        req.query.start = 1;
    }
    if (req.query.start) {
        start = (req.query.start - 1) * pageSize;
    }
    var myCount = 0;
    graduateModel.count(condition).exec((err, count)=> {
        if (err) {
            res.json({
                code: 90013,
                data: {
                    msg: '查找毕业生失败'
                }
            })
        } else {
            myCount = count;
            graduateModel.find(condition, {}, {
                skip: start,
                limit: pageSize
            }).exec((err, user)=> {
                console.log(user);
                if (err) {
                    res.json({
                        code: 90013,
                        data: {
                            msg: '查找毕业生失败'
                        }
                    })
                } else {
                    res.json({
                        code: 10000,
                        data: {
                            msg: '查找成功',
                            count: myCount,
                            graduate: user
                        }
                    })
                }
            });
        }
    })
}

module.exports = searchGraduate;