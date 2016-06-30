/**
 * Created by qoder on 16-7-1.
 */
const mongoose = require('mongoose');
const graduate=require('../../../../models/Graduates');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');
const graduateModel=mongoose.model('graduate');
const unKnownError = require('../../../../library/unknownError');
const resHandler = require('../../../../library/resHandler');

function addGraduate(req,res,next) {

    const condition={id:req.user.id};
    const update={graduate:req.user.id};
    const data={id:req.user.id};

    Users.update(condition,update).exec((err,info)=>{
        graduateModel.create(data,(err,info)=>{
            console.log(err);
            if(err){
                res.json({
                    code:90011,
                    data:{
                        Msg:"添加毕业生失败"
                    }
                });
            }else{
                console.log(info);
                res.json({
                    code:10000,
                    data:{
                        Msg:'添加成功'
                    }
                })
            }
        })
    })
}


module.exports=addGraduate;