/**
 * Created by qoder on 16-8-14.
 */
const uuid = require('uuid');
var verifyData = function (data) {
    return data || '未填写';
};

function parseExcel(res, data) {
    if (Array.isArray(data)) {
        const excelHeader = [
            '姓名',
            '学院',
            '专业',
            '班级',
            '学号',
            '毕业方向',
            '手机',
            'QQ(微信)',
            '就业公司(学校)',
            '就业岗位(专业)',
            '职能(方向)',
            '建议',
            '公司(学校)招聘信息',
        ];
        if (Array.isArray(data[0])) {
            var flag = excelHeader.filter((each, index)=> {
                    return each != data[0][index];
                }).length === 0;
            if (flag) {
                var response = [];
                data.shift();
                data.forEach((each)=> {
                    response.push({
                        id: uuid.v4(),
                        name: verifyData(each[0]),
                        academy: verifyData(each[1]),
                        major: verifyData(each[2]),
                        class: verifyData(each[3]),
                        stuId: verifyData(each[4]),
                        role: verifyData(each[5]),
                        phone: verifyData(each[6]),
                        qq: verifyData(each[7]),
                        company: verifyData(each[8]),
                        job: verifyData(each[9]),
                        skill: verifyData(each[10]),
                        suggestion: verifyData(each[11]),
                        recruit: verifyData(each[12]),
                    })
                });

                return response;
            } else {
                res.json({
                    code: 10001,
                    data: {
                        msg: '上传失败，excel文件格式不正确'
                    }
                })
            }
        } else {
            res.json({
                code: 10001,
                data: {
                    msg: '上传失败，excel文件格式不正确'
                }
            })
        }
    } else {
        res.json({
            code: 10001,
            data: {
                msg: '上传失败，excel文件格式不正确'
            }
        })
    }
}

module.exports = parseExcel;
