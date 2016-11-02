/**
 * Created by qoder on 16/6/8.
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserModel = require('../../models/Users');
const Users = mongoose.model('Users');
const login = require('./auth/login');
const register = require('./auth/register');
const forgetPass = require('./auth/forgetPass');
const confirmEmail = require('./auth/confirmmail');
const checkToken = require('../../middlewares/checkToken');
const confirmResetPass = require('./auth/confirmResetPass');
const reSendEmail = require('./auth/reSendEmail');
const passNew = require('./auth/newPass');
const BaseMsg = require('./users/BaseMsg');

router.get('/register/confirmmail', confirmEmail);    //激活账号
router.get('/resetPass/confirmmail', checkToken, confirmResetPass);   //确认重置密码邮件


router.post('/register', register);   //注册
router.post('/login', login);         //登录
router.post('/forgetPass', forgetPass);   //忘记密码
router.post('/reSendEmail', reSendEmail);   //重新发送激活邮件
router.post('/passNew', passNew);   //通过邮件认证重置密码
router.post('/BaseMsg', checkToken, BaseMsg);   //完整个人基本信息


module.exports = router;
