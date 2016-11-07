/**
 * Created by qoder on 16-11-7.
 */
const jwt = require('jwt-simple');
const secretKey = require('./../config/id_rsa');

module.exports=(data)=>{
    const decoded = jwt.decode(data, secretKey);
    return decoded;
}