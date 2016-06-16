/**
 * Created by qoder on 16/6/16.
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkToken = require('../../library/checkToken');

const addAdmin = require('./home/admin/addAdmin');
const rmAdmin = require('./home/admin/delete');

router.post('/admin', checkToken, addAdmin);      //添加管理员
router.delete('/admin', checkToken, rmAdmin);      //删除管理员

module.exports = router;