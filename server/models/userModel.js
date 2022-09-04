const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    otp: Number,
});