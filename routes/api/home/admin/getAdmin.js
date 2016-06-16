/**
 * Created by qoder on 16/6/17.
 */
const mongoose = require('mongoose');
const teacher = mongoose.model('Users');
const resHandler = require('../../../../library/resHandler');

function getAdmin(req, res, next) {
    if (req.user.role === '学生') {
        res.json({
            code: 10005,
            data: {
                Msg: '用户没有权限'
            }
        })
    }

    var start = 1;
    var pageSize = 10;
    if (req.query.pageSize) {
        pageSize = parseInt(req.query.pageSize);
    }
    if (req.query.start <= 0) {
        req.query.start = 1;
    }
    if (req.query.start) {
        start = (start - 1) * pageSize;
    }

    var myCount = 0;
    teacher.count({teacher: {$size: 1}}).exec((err, count)=> {
        if (err) {
            res.json({
                code: 90010,
                data: {
                    Msg: '获取列表失败'
                }
            })
        } else {
            myCount = count;
        }
    });
    teacher.find({teacher: {$size: 1}}, {teacher: 1, _id: 0}, {skip: start, limit: pageSize}).exec((err, data)=> {
        if (err) {
            res.json({
                code: 90010,
                data: {
                    Msg: '获取列表失败'
                }
            })
        } else {
            res.json({
                code: 10000,
                data: {
                    Msg: '获取成功',
                    count: myCount,
                    pages: data
                }
            })
        }
    });
}


module.exports = getAdmin;