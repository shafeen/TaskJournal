var express = require('express');
var router = express.Router();
var SampleCreateRouteController = require('./route-controllers/SampleRouteControllers.js').SampleCreateRouteController;
var SampleDeleteRouteController = require('./route-controllers/SampleRouteControllers.js').SampleDeleteRouteController;


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Task Journal' });
});

router.post('/sample/create', SampleCreateRouteController);
router.post('/sample/delete', SampleDeleteRouteController);

module.exports = router;
