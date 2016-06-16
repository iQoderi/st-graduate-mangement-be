/**
 * Created by qoder on 16-6-8.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Students=require('./Students');
const teacher=require('./teachers');
const UserSchema = new Schema({
    id:{
        type:'String',
        index:true
    },
    email:{
        type:'String',
        index:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'学生'
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isComleteMsg:{
        type:Boolean,
        default:false
    },
    students:[Students],
    teacher:[teacher]
});


mongoose.model('Users',UserSchema);

