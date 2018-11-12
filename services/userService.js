var User = require('../models/user');
var config = require('../libs/config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.createUser = async function (user) {
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUser = new User({
        name: user.name,
        email: user.email,
        date: new Date(),
        password: hashedPassword
    })

    try {
        var savedUser = await newUser.save();
        var token = jwt.sign({id: savedUser._id}, config.get('secret'), {
            expiresIn: 60 * 60 * 2 // expires in 2 hours
        });
        return token;
    } catch (e) {  
        throw Error("Error while Creating User")
    }
}

exports.loginUser = async function (user) {
    try {
        var _details = await User.findOne({ email: user.email });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")
        var token = jwt.sign({id: _details._id}, config.get('secret'), {
            expiresIn: 60 * 60 * 2 // expires in 2 hours
        });
        return token;
    } catch (e) {   
        throw Error("Error while Login User")
    }
}

exports.deleteUser = async function (id) {
    try {
        var deleted = await User.remove({_id: id})
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}

exports.getUsers = async function (query, page, limit) { 
    var options = {
        page,
        limit
    }
    try {
        var Users = await User.paginate(query, options)
        return Users;
       } catch (e) {
        throw Error('Error while Paginating Users');
    }
}