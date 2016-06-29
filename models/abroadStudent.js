/**
 * Created by qoder on 16-6-26.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Graduates = new Schema({
    name: {
        type: String,
        required: true
    },
    Num: {
        type: String,
        required: true
    },
    academy: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    interview: {
        type: String,
        required: true
    },
    employment: {
        type: String
    },
    suggestion: {
        type: String,
        required: true
    },
    QQ: {
        type: String
    }
});


const GraduateModel = mongoose.model('graduate', Graduates);

module.exports = GraduateModel;