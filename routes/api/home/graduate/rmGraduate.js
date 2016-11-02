/**
 * Created by qoder on 16/8/11.
 */
const mongoose = require('mongoose');
const graduate = require('../../../../models/Graduates');
const graduateModel = mongoose.model('graduate');

function rmGraduate(req, res, next) {
        const condition = {
            id: req.body.id
        };
        graduateModel.remove(condition).exec((err, info)=> {
            if (err) {
                res.json({
                    code: 90014,
                    data: {
                        msg: '删除毕业生失败'
                    }
                })
            } else {
                if (info.result.n > 0) {
                    if (info.result.ok > 0) {
                        res.json({
                            code: 10000,
                            data: {
                                msg: '删除毕业成功'
                            }
                        })
                    } else {
                        res.json({
                            code: 90014,
                            data: {
                                msg: '删除毕业生失败'
                            }
                        })
                    }
                } else {
                    res.json({
                        code: 90015,
                        data: {
                            msg: '毕业生不存在'
                        }
                    })
                }
            }
        })
}

module.exports = rmGraduate;
