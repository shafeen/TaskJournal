var express = require('express');
var router = express.Router();
var SampleCreateRouteController = require('./route-controllers/SampleRouteControllers.js').SampleCreateRouteController;
var SampleDeleteRouteController = require('./route-controllers/SampleRouteControllers.js').SampleDeleteRouteController;
var TagsAddTagController = require('./route-controllers/TagsControllers.js').TagsAddTagController;
var TagsDeleteTagController = require('./route-controllers/TagsControllers.js').TagsDeleteTagController;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sample/create', SampleCreateRouteController);
router.post('/sample/delete', SampleDeleteRouteController);

router.post('/tags/add_tag/task/:task_id', TagsAddTagController);
router.post('/tags/delete_tag/task/:task_id', TagsDeleteTagController);

module.exports = router;
