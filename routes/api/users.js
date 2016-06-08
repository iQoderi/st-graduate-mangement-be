/**
 * Created by qoder on 16/6/8.
 */
const express = require('express');
const mongoose=require('mongoose');
const router = express.Router();
const localhost = require('../../config/localhost');
const transporter = require('../../config/sendEmail');
const UserModel=require('../../models/Users');

const Users=mongoose.model('Users');



/* 注册*/
router.post('/register', function (req, res, next) {
    if (req.body.email) {
        const email = req.body.email;
        Userd.findOne({email:email},function (err,user) {
            if(err){
                res.json({
                    code:-1,
                    data:{
                        msg:'服务器发生故障'
                    }
                })
            }else{
                console.log(user);
                res.json({
                    code:10000,
                    data:{
                        msg:'请求成功'
                    }
                })
            }
        });
        // const mailOptions = {
        //     from: '841599872@qq.com',
        //     to: email,
        //     subject: '东北大学秦皇岛分校数学与统计学院大学生就业择业平台',
        //     text: '欢迎使用东北大学秦皇岛分校大学生就业择业平台',
        //     html: '欢迎使用东北大学秦皇岛分校大学生就业择业平台,请点击下面的链接激活:<br/>' + localhost + '?id=1'+'&&name='+encodeURI('齐超')
        // };
        //
        // transporter.sendMail(mailOptions, function (err, info) {
        //     if (err) {
        //         res.json({
        //             code: 10007
        //         })
        //     } else {
        //         res.json({
        //             code: 10002,
        //             data: {
        //                 msg: '邮件发送成功'
        //             }
        //         });
        //         Users.create(req.body,function (err,users) {
        //             console.log(users);
        //         });
        //     }
        // });
    } else {
        res.json({
            code: 10001
        })
    }
});

module.exports = router;
