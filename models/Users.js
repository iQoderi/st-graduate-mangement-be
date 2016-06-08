/**
 * Created by qoder on 16-6-8.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    phone: String,
    name: String,
    role: String,
    password: String,
    class: String,
    major: String,
    academy: String,
    QQNumber: String,
    wordNumber: String,
    StudentId: String
});

