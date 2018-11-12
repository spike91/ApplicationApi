var express = require('express');
var router = express.Router();
var city_controller = require('../../controllers/cityController');
var country_controller = require('../../controllers/countryController');
var users = require('./userRoute');

router.use('/users', users);

router.get('/world/country/all', country_controller.country_list);

router.get('/world/country/continent/:name', country_controller.country_by_continent_name_list);

router.get('/world/country/:name/city/all', city_controller.city_by_country_name_list);

router.post('/world/city', city_controller.city_create);

router.post('/world/country', country_controller.country_create);

module.exports = router;