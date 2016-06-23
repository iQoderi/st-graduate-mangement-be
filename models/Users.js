/**
 * Created by qoder on 16-6-8.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Students = require('./Students');
const teacher = require('./teachers');
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
    teacher: Schema.Types.Mixed
});


mongoose.model('Users', UserSchema);

