/**
 * Created by qoder on 16/6/16.
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkToken = require('../../library/checkToken');

const My = require('./home/users/my');
const editMyMsg = require('./home/users/my.put');
const changePass = require('./home/users/changePass');

const addAdmin = require('./home/admin/addAdmin');
const rmAdmin = require('./home/admin/delete');
const modifyAdmin = require('./home/admin/modify');
const getAdmin = require('./home/admin/getAdmin');
const changeAdminPass = require('./home/admin/changePass');
const getExcel = require('./home/excel/getExcel');
const addGraduate = require('./home/users/addGraduate');
router.use(checkToken);
/*个人信息*/
router.get('/my', My);     //获取个人基本信息
router.post('/my', editMyMsg);     //修改个人基本信息
router.put('/changePass', changePass);      //修改账号密码


/*管理员*/
router.get('/admin', getAdmin);      //获取管理员列表
router.post('/admin', addAdmin);      //添加管理员
router.put('/admin', modifyAdmin);      //编辑管理员
router.delete('/admin', rmAdmin);      //删除管理员
router.put('/changeAdminPass', changeAdminPass);      //修改管理员密码

router.get('/excel', getExcel);      //获取excel

router.post('/addGraduate', addGraduate);

const test = require('./home/users/population');

router.get('/test', test);
module.exports = router;