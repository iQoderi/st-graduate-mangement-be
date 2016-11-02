/**
 * Created by qoder on 16/6/16.
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkToken = require('../../middlewares/checkToken');
const checkBlock=require('../../middlewares/checkBlock');   //检查账户是否被冻结
const hasRole=require('../../middlewares/hasRole');  //check role

const My = require('./home/users/my');
const editMyMsg = require('./home/users/my.put');
const changePass = require('./home/users/changePass');

const addAdmin = require('./home/admin/addAdmin');
const rmAdmin = require('./home/admin/delete');
const modifyAdmin = require('./home/admin/modify');
const getAdmin = require('./home/admin/getAdmin');
const changeAdminPass = require('./home/admin/changePass');
const adminAddGraduate = require('./home/admin/graduate');
const blockAccount=require('./home/admin/blockAccout');
const getStudents=require('./home/admin/getStudents');

const exportStu = require('./home/excel/exportExcel');
const addGraduate = require('./home/users/addGraduate');
const modifyGraduate = require('./home/users/modifyGraduate');
const getGraduateMsg=require('./home/graduate/getGraduateMsg');
const rmGraduate = require('./home/graduate/rmGraduate');
const searchGraduate = require('./home/graduate/searchGraduage');
const getExcel = require('./home/excel/getExcel');
const uploadExcel=require('./home/excel/importExcel');

router.use(checkToken);

/*个人信息*/
router.get('/my',checkBlock,My);     //获取个人基本信息
router.post('/my',checkBlock,editMyMsg);     //修改个人基本信息
router.put('/changePass', checkBlock,changePass);      //修改账号密码

/*管理员*/
router.get('/admin',checkBlock,hasRole('学生'),getAdmin);      //获取管理员列表
router.put('/admin',checkBlock,hasRole('学生'),modifyAdmin);      //编辑管理员
router.delete('/admin',checkBlock,hasRole('学生'),rmAdmin);      //删除管理员
router.post('/admin',checkBlock,hasRole('学生'),addAdmin);      //添加管理员
router.put('/changeAdminPass',checkBlock,hasRole('学生'),changeAdminPass);     //修改管理员密码
router.get('/getStudents',checkBlock,hasRole('学生'),getStudents);     //获取学生列表
router.post('/blockAccount',checkBlock,hasRole('学生'),blockAccount);    //冻结解冻用户账户

/*excel*/
// router.get('/excel',checkBlock,hasRole('学生'),getExcel);                      //获取excel
router.get('/excel',checkBlock,hasRole('学生'),exportStu);                      //获取excel
router.post('/uploadExcel',checkBlock,hasRole('学生'),uploadExcel);               //上传excel

/*毕业生*/
router.delete('/admin/graduate',checkBlock,hasRole('学生'),rmGraduate);              //删除毕业生
router.post('/searchGraduate',checkBlock, searchGraduate);      //查找毕业生
router.post('/admin/graduate',hasRole('学生'),adminAddGraduate);    //管理员添加毕业生信息

router.get('/graduate',checkBlock,getGraduateMsg);             //获取毕业生信息
router.put('/graduate',checkBlock,modifyGraduate);             //修改毕业生信息
router.post('/graduate',checkBlock,addGraduate);               //添加毕业生

module.exports = router;
