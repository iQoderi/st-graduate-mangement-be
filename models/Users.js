/**
 * Created by qoder on 16-6-8.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id:Number,
    email:{
        type:'String',
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
    }
});

mongoose.model('Users',UserSchema);

