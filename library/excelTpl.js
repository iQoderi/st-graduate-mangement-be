/**
 * Created by qoder on 16/6/30.
 */
const ExcelTpl = [{
    caption: '姓名',
    type: 'string',
    beforeCellWrite: function (row, cellData) {
        return cellData.toUpperCase();
    }
}, {
    caption: '学院',
    type: 'string',
    width: 28.7109375
}, {
    caption: '专业',
    type: 'string'
}, {
    caption: '班级',
    type: 'string'
}, {
    caption: '学号',
    type: 'string'
}, {
    caption: 'QQ',
    type: 'string'
}, {
    caption: '就业公司',
    type: 'string'
}, {
    caption: '技能',
    type: 'string'
}, {
    caption: '面试问题',
    type: 'string'
}, {
    caption: '公司招聘信息',
    type: 'string'
}, {
    caption: '建议',
    type: 'string'
}];

module.exports = ExcelTpl;