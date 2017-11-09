const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    user: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean}
})

let User = mongoose.model('User', userSchema);

module.exports = User;