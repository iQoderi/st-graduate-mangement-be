/**
 * Created by qoder on 16-6-26.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Graduates = new Schema({
    name: {
        type: String,
    },
    Num: {
        type: String,
    },
    academy: {
        type: String,
    },
    major: {
        type: String,
    },
    class: {
        type: String,
    },
    company: {
        type: String,
    },
    job: {
        type: String,
    },
    skill: {
        type: String,
    },
    interview: {
        type: String,
    },
    employment: {
        type: String
    },
    suggestion: {
        type: String,
    },
    QQ: {
        type: String
    },
    id:{
        type:String
    }

});


const GraduateModel = mongoose.model('graduate', Graduates);

module.exports = GraduateModel;