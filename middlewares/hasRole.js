/**
 * Created by qoder on 16-11-2.
 */
function hasRole(role) {
    return function (req,res,next) {
        if(req.user.role===role){
            res.json({code:10005,data:{msg:"用户没有权限"}});
        }else{
            next();
        }
    }
}

module.exports=hasRole;