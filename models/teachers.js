/**
 * Created by qoder on 16/6/8.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacher = new Schema({
    id: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: '辅导员'
    },
    academy: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

mongoose.model('teacher', teacher);

module.exports = teacher;