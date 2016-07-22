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
    stuId: {
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
    school: {
        type: String,       //留学学校
        required: true
    },
    isGraduate: {
        type: Boolean,
        default: false
    },
    afterGraduate: {
        type: Number,
        default: 1        //1读博 2就业
    }
});


const aboradModel = mongoose.model('abroad', Graduates);

module.exports = aboradModel;