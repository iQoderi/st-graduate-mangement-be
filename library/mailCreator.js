/**
 * Created by qoder on 16-6-9.
 */
const EmailTemplate = require('email-templates').EmailTemplate;
const templateDir = path.resolve(__dirname, '..', 'template');

const monapi=new EmailTemplate(path.join(templateDir,'registerAuth'));

const apiInfo={
    authLink:'http://www.baidu.com'
};

monapi.render(apiInfo, function(err, results){
    if(err){
        console.log(err);
    }
    console.log(results.html);   //生成的html源码
    console.log(results.text);   //生成的text源码
});

