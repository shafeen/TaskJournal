let express = require('express');
let router = express.Router();
let SampleCreateRouteController = require('./route-controllers/SampleRouteControllers.js').SampleCreateRouteController;
let SampleDeleteRouteController = require('./route-controllers/SampleRouteControllers.js').SampleDeleteRouteController;
let TagsAddTagController = require('./route-controllers/TagsControllers.js').TagsAddTagController;
let TagsDeleteTagController = require('./route-controllers/TagsControllers.js').TagsDeleteTagController;
let TagsGetTagsController = require('./route-controllers/TagsControllers.js').TagsGetTagsController;
let TaskCreateRouteController = require('./route-controllers/TaskRouteControllers.js').TaskCreateController;
let TaskDeleteRouteController = require('./route-controllers/TaskRouteControllers.js').TaskDeleteController;
let TaskModifyRouteController = require('./route-controllers/TaskRouteControllers.js').TaskModifyController;
let GetTasksController = require('./route-controllers/TaskRouteControllers.js').GetAllTasksController;
let GetTasksByDateController = require('./route-controllers/TaskRouteControllers.js').GetTasksByDateController;


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
