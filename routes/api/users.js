/**
 * Created by qoder on 16/6/8.
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const localhost = require('../../config/localhost');
const transporter = require('../../config/sendEmail');
const regHtml=require('../../template/mailtpl');
const path=require('path');
const UserModel = require('../../models/Users');

const Users = mongoose.model('Users');

/* 注册*/
router.post('/register', function (req, res, next) {
    if (req.body.email) {
        const email = req.body.email;
        Users.findOne({email: email}, function (err, user) {
            if (err) {
                res.json({
                    code: -1,
                    data: {
                        msg: '未知错误'
                    }
                })
            } else {
                if (user) {
                    res.json({
                        code: 10008,
                        data: {
                            msg: '该邮箱已经被注册'
                        }
                    })
                } else {
                    Users.create(req.body, function (err, users) {
                        if(err){
                            res.json({
                                code:-1,
                                data:{
                                    Msg:'未知错误'
                                }
                            })
                        }else{
                            const subject='东北大学秦皇岛分校数学与统计学院大学生就业择业平台';
                            const html=regHtml.replace(/authLink/g,localhost+'/confirmMail/register?email='+email+'&subject='+encodeURI(subject));
                            const mailOptions = {
                                from: '841599872@qq.com',
                                to: email,
                                subject:subject,
                                text: '欢迎使用东北大学秦皇岛分校大学生就业择业平台',
                                html: html
                            };

                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err) {
                                    res.json({
                                        code: 10007
                                    })
                                } else {
                                    res.json({
                                        code: 10002,
                                        data: {
                                            msg: '邮件发送成功'
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    } else {
        res.json({
            code: 10001
        })
    }
});


router.post('/login',function (req,res,next) {
    if(req.email&&req.password){
        Users.findOne(req.body,function (err,user) {
            if(err){
                res.json({
                    code:-1,
                    data:{
                        Msg:'未知错误'
                    }
                })
            }else{
                if(user){
                    console.log(user);
                    
                }else{
                    res.json({
                        code:10010,
                        data:{
                            Msg:'账号或者密码错误'
                        }
                    })
                }
            }
        })
    }else{
        res.json({
            code:10001
        })
    }
});

module.exports = router;
