/**
 * Created by qoder on 16/6/8.
 */
const mongoose=require('mongoose');

const  Schema=mongoose.Schema;

const Student=new Schema({
    id:{
        type:String,
        index:true
    },
    email:{
        type:String,
        index:true,
    },
    phone: String,
    name: String,
    role: {
        type:String,
        index:true
    },
    academy:{
        type:String,
        index:true
    },
    major: {
        type:String,
        index:true
    },
    class: {
        type:String,
        index:true
    },
    studentId:{
        type:String,
        index:true
    },
    QQNumber: {
        type:String,
        index:true
    },
    is_QQ:{
        type:String,
        default:true,
        index:true
    }
});

Student.index({
    academy:1,
    major:1,
    class:1,
    studentId:1
});

module.exports=Student;