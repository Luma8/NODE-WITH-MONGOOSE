const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = User;