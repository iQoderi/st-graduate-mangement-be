/**
 * Created by qoder on 16/6/16.
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkToken = require('../../library/checkToken');

const My = require('./home/users/my');

const addAdmin = require('./home/admin/addAdmin');
const rmAdmin = require('./home/admin/delete');
const modifyAdmin = require('./home/admin/modify');
const getAdmin = require('./home/admin/getAdmin');


router.use(checkToken);
/*个人信息*/
router.get('/my', My);     //获取个人基本信息

/*管理员*/
router.get('/admin', getAdmin);      //获取管理员列表
router.post('/admin', addAdmin);      //添加管理员
router.put('/admin', modifyAdmin);      //编辑管理员
router.delete('/admin', rmAdmin);      //删除管理员

module.exports = router;