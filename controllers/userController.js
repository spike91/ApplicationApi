var UserService = require('../services/userService');
var log = require('../libs/log')(module);

exports.createUser = async function (req, res, next) {
    var User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    try {
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({data: createdUser, message: "Succesfully Created User"})
    } catch (e) {
        log.error(e.message);
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.removeUser = async function (req, res, next) {
    var id = req.params.id;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully User Deleted");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.loginUser = async function (req, res, next) {
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        var loginUser = await UserService.loginUser(User);
        return res.status(201).json({data: loginUser, message: "Succesfully login"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.getUsers = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}
