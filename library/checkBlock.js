/**
 *
 * Created by qoder on 16-11-2.
 */

//检查账户是否被冻结
function checkBlock(req,res,next) {
    if(req.user.isBlock){
        res.json({
            code:10014,
            data:{
                msg:'账户已被冻结'
            }
        })
    }else{
        next();
    }
}

module.exports=checkBlock;