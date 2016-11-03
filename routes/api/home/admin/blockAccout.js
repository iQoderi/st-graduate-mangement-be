/**
 * Created by qoder on 16-11-2.
 */
const mongoose=require('mongoose');
const UserModel = require('../../../../models/Users');
const Users = mongoose.model('Users');

function blockAccount(req,res,next) {
    const type=req.body.type;   //type 0:冻结账户  type 1:解冻账户
    const userId=req.body.userId;
    const condition={id:userId};
    if((type!=0&&type!=1)||!userId){res.json({code:10001,data:{msg:"请求格式错误"}}); return;}
    const update = {
        $set: {isBlock:type==0}
    };
    Users.update(condition,update).exec((err,info)=>{
        if(err){
            res.json({code:-1, data:{msg:'未知错误'}})
        }else{
            if (info.n === 1) {
                res.json({code: 10000, data: {msg: '操作成功'}})
            } else {
                res.json({code: 10011, data: {msg: '用户不存在'}})
            }
        }
    })
}

module.exports=blockAccount;
