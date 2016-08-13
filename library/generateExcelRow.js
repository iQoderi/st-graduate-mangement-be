/**
 * Created by qoder on 16-8-12.
 */

function verifyData(data) {
    return data || '未填写';
}

function generateExcelRow(dataSource) {
    var resource = [];
    dataSource.forEach((data, index)=> {
        resource[index] = [];
        resource[index].push(verifyData(data.name));
        resource[index].push(verifyData(data.academy));
        resource[index].push(verifyData(data.major));
        resource[index].push(verifyData(data.class));
        resource[index].push(verifyData(data.stuId));
        resource[index].push(verifyData(data.phone));
        resource[index].push(verifyData(data.qq));
        resource[index].push(verifyData(data.company));
        resource[index].push(verifyData(data.job));
        resource[index].push(verifyData(data.skill));
        resource[index].push(verifyData(data.suggestion));
        resource[index].push(verifyData(data.recruit));
    });
    return resource;
}

module.exports = generateExcelRow;