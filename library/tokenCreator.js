/**
 * Created by qoder on 16/6/9.
 */
const jwt=require('jwt-simple');
const jwtTokenSecret=require('../config/id_rsa');
function tokenCreator(data,expires) {
    var token=jwt.encode({
        iss:data,
        exp:expires
    },jwtTokenSecret);
    
    return token;
}

module.exports=tokenCreator;
