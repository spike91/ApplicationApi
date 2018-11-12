var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/userController');
var Authorization = require('../../auth/authorization');

router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.get('/', Authorization, UserController.getUsers)
router.delete('/:id', Authorization, UserController.removeUser)

module.exports = router;