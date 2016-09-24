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
const adminAddGraduate = require('./home/admin/graduate');

const exportStu = require('./home/excel/exportExcel');
const addGraduate = require('./home/users/addGraduate');
const modifyGraduate = require('./home/users/modifyGraduate');
const rmGraduate = require('./home/graduate/rmGraduate');
const searchGraduate = require('./home/graduate/searchGraduage');
const getGraduateMsg=require('./home/graduate/getGraduateMsg');
const getExcel = require('./home/excel/getExcel');
const uploadExcel=require('./home/excel/importExcel');

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
router.put('/changeAdminPass', changeAdminPass);     //修改管理员密码

/**
 * excel
 */

router.post('/excel', exportStu);                      //获取excel
router.get('/excel', getExcel);                      //获取excel
router.post('/uploadExcel', uploadExcel);               //上传excel

/*毕业生*/
router.post('/searchGraduate', searchGraduate);      //查找毕业生
router.delete('/admin/graduate', rmGraduate);              //删除毕业生
router.post('/admin/graduate', adminAddGraduate);    //管理员添加毕业生信息
router.post('/graduate', addGraduate);               //添加毕业生
router.put('/graduate', modifyGraduate);             //修改毕业生信息
router.get('/graduate',getGraduateMsg);             //获取毕业生信息

module.exports = router;