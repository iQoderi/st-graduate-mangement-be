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
    width: 16
}, {
    caption: '专业',
    type: 'string',
    width: 16
}, {
    caption: '班级',
    type: 'string'
}, {
    caption: '学号',
    type: 'string',
    width: 10
}, {
    caption: '毕业走向',
    type: 'string',
    width: 15
}, {
    caption: '手机',
    type: 'string',
    width: 15
}, {
    caption: 'QQ(微信)',
    type: 'string',
    width: 15
}, {
    caption: '就业公司(学校)',
    type: 'string',
    width: 20
}, {
    caption: '就业岗位(专业)',
    type: 'string',
    width: 20
}, {
    caption: '职能(方向)',
    type: 'string',
    width: 10
}, {
    caption: '建议',
    type: 'string',
    width: 20
}, {
    caption: '公司(学校)招聘信息',
    type: 'string',
    width: 20
}];

module.exports = ExcelTpl;
