/**
 *
 * Created by qoder on 16/6/9.
 */


function resJson(code, res, msg) {
    res.json({
        code: code,
        data: {
            Msg: msg
        }
    })
}

const json = {
    "code": {
        "-1": "未知错误",
        "10000": "请求正确",
        "10001": "请求格式错误",
        "10002": "邮件发送成功",
        "10003": "用户没有登录",
        "10004": "用户没有完善资料",
        "10005": "用户没有权限",
        "10006": "Token已过期",
        "10007": "邮件发送失败",
        "10008": "该用户已经注册",
        "10009": "用户未激活",
        "10010": "账号密码错误"
    }
};

const resHandler = function (code, res) {
    switch (code) {
        case 10001:
            resJson(code, res, '请求格式错误');
            break;
        case 10002:
            resJson(code, res, '邮件发送成功');
            break;
        case 10003:
            resJson(code, res, '用户没有登录');
            break;
        case 10004:
            resJson(code, res, '用户没有完善资料');
            break;
        case 10005:
            resJson(code,res,'用户没有权限');
            break;
        case 10006:
            resJson(code, res, 'Token错误或者过期');
            break;
        case 10007:
            resJson(code,res,'邮件发送失败');
            break;
        case 10008:
            resJson(code,res,'该用户已经注册');
            break;
        case 10009:
            resJson(code,res,'用户没有激活');
            break;
        case 10010:
            resJson(code,res,'账号密码错误');
            break;
        case 10011:
            resJson(code,res,'账户不存在');
            break;
        default:
            resJson(-1,res,'未知错误');
            break;
    }
};


module.exports=resHandler;











