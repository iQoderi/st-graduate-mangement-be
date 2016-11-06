/**
 * Created by qoder on 16-11-2.
 */
const mongoose = require('mongoose');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');

function getStudents(req,res,next) {
    const condition={role:'学生',students: {$exists: true}};
    var start = 0;
    var pageSize = 10;
    if (req.query.pageSize) {pageSize = parseInt(req.query.pageSize);}
    if (req.query.start <1) {req.query.start = 1;}
    if (req.query.start) {start = (req.query.start - 1) * pageSize;}
    if(req.query.isBlock){condition.isBlock=req.query.isBlock;}
    if(req.query.academy){condition['students.academy']=req.query.academy;}
    if(req.query.major){condition['students.major']=req.query.major;}
    if(req.query.class){condition['students.class']=req.query.class;}
    var myCount = 0;
    Users.count(condition).exec((err,count)=>{
        if(err){
            res.json({code:-1,data:{msg:"未知错误"}})
        }else{
            myCount=count;
            Users.find(condition, {students:1,isBlock:1,_id: 0}, {
                skip: start,
                limit: pageSize
            }).exec((err, data)=> {
                if(err){
                    res.json({code:-1,data:{msg:"未知错误"}})
                }else{
                    var pages = [];
                    data.forEach((each)=> {each.students.isBlock=each.isBlock;pages.push(each.students);});
                    res.json({
                        code: 10000,
                        data: {msg: '获取成功', count: myCount, pages: pages}
                    });
                }
            })
        }
    });
}

module.exports=getStudents;
