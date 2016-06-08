/**
 * Created by qoder on 16/6/8.
 */
const nodeEmailer=require('nodemailer');
const EmailAuth=require('./myEmail');

//开启一个SMTP连接池
const  transporter=nodeEmailer.createTransport("SMTP",{
    host:"smtp.qq.com",   //主机
    secureConnection:true,   //使用SSL,
    port:465,    //SMTP端口
    auth:EmailAuth
});

module.exports=transporter;