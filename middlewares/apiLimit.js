/**
 * Created by qoder on 16-11-7.
 */
module.exports = (req, res, next)=> {
    console.log(req.session[req.path + 'loginCount']);
    if (!req.session[req.path + 'loginCount'] || isNaN(req.session[req.path + 'loginCount'])) {
        req.session[req.path + 'loginCount'] = 1;
        next();
    } else {
        if (req.session[req.path + 'loginCount'] > 3) {
            res.json({
                code: 90021,
                data: {
                    msg: '登录过于频繁'
                }
            })
        } else {
            req.session[req.path + 'loginCount']++;
            next();
        }

    }
}