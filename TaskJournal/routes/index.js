var express = require('express');
var router = express.Router();
var SampleCreateRouteController = require('./route-controllers/SampleRouteControllers.js').SampleCreateRouteController;
var SampleDeleteRouteController = require('./route-controllers/SampleRouteControllers.js').SampleDeleteRouteController;
var TagsAddTagController = require('./route-controllers/TagsControllers.js').TagsAddTagController;
var TagsDeleteTagController = require('./route-controllers/TagsControllers.js').TagsDeleteTagController;
var TagsGetTagsController = require('./route-controllers/TagsControllers.js').TagsGetTagsController;
var TaskCreateRouteController = require('./route-controllers/TaskRouteControllers.js').TaskCreateController;
var TaskDeleteRouteController = require('./route-controllers/TaskRouteControllers.js').TaskDeleteController;
var TaskModifyRouteController = require('./route-controllers/TaskRouteControllers.js').TaskModifyController;
var GetTasksController = require('./route-controllers/TaskRouteControllers.js').GetAllTasksController;
var GetTasksByDateController = require('./route-controllers/TaskRouteControllers.js').GetTasksByDateController;


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Task Journal' });
});

router.post('/sample/create', SampleCreateRouteController);
router.post('/sample/delete', SampleDeleteRouteController);

router.post('/tags/add_tag/task/:task_id', TagsAddTagController);
router.post('/tags/delete_tag/task/:task_id', TagsDeleteTagController);
router.get('/tags', TagsGetTagsController);

router.post('/task/create', TaskCreateRouteController);
router.post('/task/delete', TaskDeleteRouteController);
router.post('/task/modify', TaskModifyRouteController);
router.get('/task', GetTasksController);
router.get('/task/date/:date', GetTasksByDateController);

module.exports = router;
