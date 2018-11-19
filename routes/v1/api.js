var express = require('express');
var router = express.Router();
var CityController = require('../../controllers/cityController');
var CountryController = require('../../controllers/countryController');
var UserController = require('../../controllers/userController');
var Authorization = require('../../auth/authorization');
var Authentification = require('../../auth/authentification');


// Users CRUD

router.post('/users/registration', UserController.createUser);
router.post('/users/login/', UserController.loginUser);
router.get('/users/', Authentification, Authorization, UserController.getUsers);
router.delete('/users/:id', Authentification, Authorization, UserController.removeUser);

// Countries GET

router.get('/world/country/all', Authentification, CountryController.country_list);
router.get('/world/country/continent/:name', Authentification, CountryController.country_by_continent_name_list);

// Countries POST

router.post('/world/country', Authentification, Authorization, CountryController.country_create);

// Cities GET

router.get('/world/country/:name/city/all', Authentification, CityController.city_by_country_name_list);
router.get('/world/city/all', Authentification, CityController.city_list);

// City CRUD

router.get('/world/city/:id', Authentification, Authorization, CityController.getById);
router.post('/world/city', Authentification, Authorization, CityController.create);
router.put('/world/city/:id', Authentification, Authorization, CityController.update);
router.delete('/world/city/:id', Authentification, Authorization, CityController.delete);

module.exports = router;