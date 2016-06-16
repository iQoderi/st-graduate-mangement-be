/**
 * Created by qoder on 16/6/16.
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkToken = require('../../library/checkToken');

const addAdmin = require('./home/addAdmin');

router.post('/addAdmin', checkToken, addAdmin);      //添加管理员

module.exports=router;