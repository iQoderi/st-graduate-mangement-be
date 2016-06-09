/**
 * Created by qoder on 16/6/8.
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserModel = require('../../models/Users');
const Users = mongoose.model('Users');
const login=require('./auth/login');
const register=require('./auth/register');
const confirmEmail=require('./auth/confirmmail');

router.get('/register/confirmmail',confirmEmail);    //激活账号

router.post('/register',register);   //注册
router.post('/login',login);         //登录

module.exports = router;
