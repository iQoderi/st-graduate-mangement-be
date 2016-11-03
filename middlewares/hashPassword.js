/**
 * Created by qoder on 16/11/3.
 */
const hash = require('../library/hash');

function hashPassword(req, res, next) {
    req.body.password = hash(req.body.email, req.body.password);
    console.log(req.body.password);
    next();
}

module.exports = hashPassword;
