/**
 * Created by qoder on 16-11-7.
 */
"use strict";
const ccap = require('ccap')();

//生成验证码
module.exports = ()=> {
    var ary = ccap.get();
    var text = ary[0];
    var buffer = ary[1];
    return {text: text, buffer: buffer}
}