/**
 * Created by qoder on 16-8-12.
 */
/**
 * Created by qoder on 16-8-12.
 */
const nodeExcel = require('excel-export');
const mongoose = require('mongoose');
const graduate = require('../../../../models/Graduates');
const graduateModel = mongoose.model('graduate');
const ExcelTpl = require('../../../../library/excelTpl');
const generateExcelRow = require('../../../../library/generateExcelRow');

function exportStu(req, res, next) {
        const condition = {};
        if (req.query.academy && req.query.academy !== '全部') {condition.academy = req.query.academy;}
        if (req.query.role && req.query.role !== '全部') {condition.role = req.query.role;}
        if (req.query.major) {condition.major = req.query.major;}
        if (req.query.stuId) {condition.stuId = req.query.stuId;}
        if (req.query.class) {condition.class = req.query.class;}

        graduateModel.find(condition).exec((err, user)=> {
            if (err) {
                res.json({code: 90016, data: {msg: '导出毕业生信息失败'}})
            } else {
                if (Array.isArray(user)) {
                    var conf = {};
                    // conf.stylesXmlFile = "styles.xml";
                    conf.name = "mysheet";
                    conf.cols = ExcelTpl;
                    conf.rows = generateExcelRow(user);
                    var result = nodeExcel.execute(conf);
                    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                    res.setHeader("Content-Disposition", "attachment; filename=" + "NEUQGraduate.xlsx");
                    res.end(result, 'binary');
                } else {
                    res.json({code: 90016, data: {msg: '导出毕业生信息失败'}})
                }
            }
        })
}

module.exports = exportStu;



