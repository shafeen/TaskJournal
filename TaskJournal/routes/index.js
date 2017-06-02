var express = require('express');
var router = express.Router();
var SampleRouteController = require('./route-controllers/SampleRouteController.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sample', SampleRouteController);

module.exports = router;
