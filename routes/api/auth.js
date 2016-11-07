/**
 * Created by qoder on 16/6/8.
 */
'use strict';
require('../../models/Users');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = mongoose.model('Users');
const login = require('./auth/login');
const register = require('./auth/register');
const forgetPass = require('./auth/forgetPass');
const confirmEmail = require('./auth/confirmmail');
const confirmResetPass = require('./auth/confirmResetPass');
const reSendEmail = require('./auth/reSendEmail');
const passNew = require('./auth/newPass');
const BaseMsg = require('./users/BaseMsg');
const getVerifyCode = require('./auth/getVerifyCode');
const checkToken = require('../../middlewares/checkToken');
const hashPassword = require('../../middlewares/hashPassword');
const checkVerifyCode = require('../../middlewares/checkVerifyCode');

router.get('/register/confirmmail', confirmEmail);    //激活账号
router.get('/resetPass/confirmmail', checkToken, confirmResetPass);   //确认重置密码邮件
router.get('/verifyCode', getVerifyCode);    //获取图形验证码
router.post('/register', hashPassword, register);   //注册
router.post('/login',checkVerifyCode, hashPassword, login);         //登录
router.post('/forgetPass', forgetPass);   //忘记密码
router.post('/reSendEmail', reSendEmail);   //重新发送激活邮件
router.post('/passNew', checkToken, passNew);   //通过邮件认证重置密码
router.post('/BaseMsg', checkToken, BaseMsg);   //完整个人基本信息


module.exports = router;
