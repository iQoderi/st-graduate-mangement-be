/**
 * Created by qoder on 16-8-12.
 */
const nodeExcel = require('excel-export');
const mongoose=require('mongoose');
const graduate = require('../../../../models/Graduates');
const graduateModel = mongoose.model('graduate');
const ExcelTpl = require('../../../../library/excelTpl');
const generateExcelRow=require('../../../../library/generateExcelRow');

function exportStu(req, res, next) {
    if (req.user.role !== '管理员' && req.user.role !== '辅导员') {
        res.json({
            code: 10005,
            data: {
                msg: '用户没有权限'
            }
        });
        return;
    } else {
        const condition = {};
        if (req.body.academy && req.body.academy !== '全部') {
            condition.academy = req.body.academy;
        }

        if (req.body.major) {
            condition.major = req.body.major;
        }

        if (req.body.stuId) {
            condition.stuId = req.body.stuId;
        }

        if (req.body.class) {
            condition.class = req.body.class;
        }

        graduateModel.find(condition).exec((err, user)=> {
            if (err) {
                res.json({
                    code: 90016,
                    data: {
                        msg: '导出毕业生信息失败'
                    }
                })
            } else {
                if (Array.isArray(user)) {
                    var conf = {};
                    // conf.stylesXmlFile = "styles.xml";
                    conf.name = "东北大学秦皇岛分校大学生就业择业中心";
                    conf.cols = ExcelTpl;
                    conf.rows = generateExcelRow(user);
                    var result = nodeExcel.execute(conf);
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
                    res.end(result, 'binary');
                } else {
                    res.json({
                        code: 90016,
                        data: {
                            msg: '导出毕业生信息失败'
                        }
                    })
                }
            }
        })
    }
}

module.exports=exportStu;


