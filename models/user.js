var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true},
    isAdmin: { type: Boolean, default: false },
    password: String,
    date: Date
})
UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('users', UserSchema)

module.exports = User;