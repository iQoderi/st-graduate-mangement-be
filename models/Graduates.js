/**
 * Created by qoder on 16-6-26.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Graduates = new Schema({
    name: {
        type: String
    },
    stuId: {
        type: String
    },
    academy: {
        type: String
    },
    major: {
        type: String
    },
    class: {
        type: String
    },
    company: {
        type: String
    },
    job: {
        type: String
    },
    skill: {
        type: String
    },
    question: {
        type: String
    },
    recruit: {
        type: String
    },
    suggestion: {
        type: String
    },
    qq: {
        type: String
    },
    id: {
        type: String
    },
    phone: {
        type: String
    }
});


const GraduateModel = mongoose.model('graduate', Graduates);

module.exports = GraduateModel;