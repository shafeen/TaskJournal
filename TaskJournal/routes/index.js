let express = require('express');
let router = express.Router();

let TagsRouteControllers = require('./route-controllers/TagsControllers.js');
let TaskRouteControllers = require('./route-controllers/TaskRouteControllers.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Task Journal' });
});

router.get('/tags', TagsRouteControllers.TagsGetTagsController);
router.post('/tags/add/task/:task_id', TagsRouteControllers.TagsAddTagController);
router.post('/tags/delete/task/:task_id', TagsRouteControllers.TagsDeleteTagController);

router.post('/task/create', TaskRouteControllers.TaskCreateController);
router.post('/task/delete', TaskRouteControllers.TaskDeleteController);
router.post('/task/modify', TaskRouteControllers.TaskModifyController);
router.get('/task', TaskRouteControllers.GetAllTasksController);
router.get('/task/date/:date', TaskRouteControllers.GetTasksByDateController);

module.exports = router;
