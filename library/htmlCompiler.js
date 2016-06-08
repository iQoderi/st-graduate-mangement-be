/**
 * Created by qoder on 16-6-9.
 */
const _ejs=require('ejs');
const fs=require('fs');

exports.compile = function(relativeTemplatePath, data, next){
    
    var absoluteTemplatePath = process.cwd() + '/views/' + relativeTemplatePath + '.jade';

    _ejs.renderFile(absoluteTemplatePath, data, function(err, compiledTemplate){
        if(err){
            throw new Error('Problem compiling template(double check relative template path): ' + relativeTemplatePath);
        }
        console.log('[INFO] COMPILED TEMPLATE: ', compiledTemplate);
        next(null, compiledTemplate);
    });

};