let express = require('express');
let router = express.Router();

let TagsRouteControllers = require('./route-controllers/TagsControllers.js');
let TaskRouteControllers = require('./route-controllers/TaskRouteControllers.js');

/* GET home page. */
router.get('/', function(req, res) {
    let today = new Date();
    let beginningOfWeek = new Date(today);
    while (beginningOfWeek.getDay() !== 0) {
        beginningOfWeek.setDate(beginningOfWeek.getDate() - 1);
    }
    let endOfWeek = new Date(today);
    while (endOfWeek.getDay() !== 6) {
        endOfWeek.setDate(endOfWeek.getDate() + 1);
    }
    res.render('index', {
        title: 'Task Journal',
        weekBegins: beginningOfWeek.toDateString(),
        weekEnds: endOfWeek.toDateString()
    });
});

router.get('/tags', TagsRouteControllers.TagsGetTagsController);
router.post('/tags/add/task/:task_id', TagsRouteControllers.TagsAddTagController);
router.post('/tags/delete/task/:task_id', TagsRouteControllers.TagsDeleteTagController);

router.get('/task', TaskRouteControllers.GetAllTasksController);
router.post('/task/create', TaskRouteControllers.TaskCreateController);
router.post('/task/delete', TaskRouteControllers.TaskDeleteController);
router.post('/task/modify', TaskRouteControllers.TaskModifyController);
router.get('/task/date/:date', TaskRouteControllers.GetTasksByDateController);

module.exports = router;
