/**
 * Created by qoder on 16-8-13.
 */
const formidable=require('formidable');
const fs=require('fs');
const mongoose = require('mongoose');
const uuid = require('uuid');
const graduate = require('../../../../models/Graduates');
const graduateModel = mongoose.model('graduate');
const xlsx=require('node-xlsx');
const parseExcel=require('../../../../library/parseExcel');


function uploadExcel(req,res,next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public/excel/';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024;   //文件大小
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.json({
                code:90017,
                data:{
                    msg:'导入excel失败'
                }
            });
            return false;
        }

        var filname="";
        try {
            filename = files.excel.name;
        }catch(e){
            filename="";
        }
        ////对文件名进行处理，以应对上传同名文件的情况
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name="";
        nameArray.forEach((each)=>{
            name+=each;
        });

        var excelName = name + uuid.v4() + '.' + type;
        var newPath = form.uploadDir + excelName;
        fs.renameSync(files.excel.path, newPath);  //重命名
        const workSheetsFromFile = xlsx.parse(fs.readFileSync(newPath));
        const data=parseExcel(res,workSheetsFromFile[0].data);
        if(Array.isArray(data)){
            var SUCC_COOUNT=0;
            var importPromise=new Promise((resolve,reject)=>{
                data.forEach((each)=>{
                    var graduate = new graduateModel(each);
                    graduate.save((err)=>{
                        if(err){
                           reject(SUCC_COOUNT);
                        }else{
                            console.log('called');
                            SUCC_COOUNT++;
                        }
                    })
                });

                resolve(data.length);
            });

            importPromise.then((count)=>{
                res.json({
                    code:10000,
                    data:{
                        msg:'上传成功',
                        count:count
                    }
                })
            }).catch((count)=>{
                res.json({
                    code:90018,
                    data:{
                        msg:'部分成功',
                        count:count
                    }
                });
            });
        }
    });
}

module.exports=uploadExcel;