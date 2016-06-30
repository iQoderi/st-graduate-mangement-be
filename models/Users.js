/**
 * Created by qoder on 16-6-8.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graduate=require('./Graduates');
const aborad=require('./abroadStudent');

const UserSchema = new Schema({
    id: {
        type: 'String',
        index: true
    },
    email: {
        type: 'String',
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    role: {
        type: String,
        default: '学生'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isCompleteMsg: {
        type: Boolean,
        default: false
    },
    students: Schema.Types.Mixed,
    teacher: Schema.Types.Mixed,
    graduate:{
        type:String,
        ref:'graduate'
    },
    aborad:{
        type:String,
        ref:'aborad'
    }
});


mongoose.model('Users', UserSchema);

