const TaskService = require('../../services/TaskService');

// POST --- /task/create/
let TaskCreateController = function (req, res) {
    const task = TaskService.createNewTask(req.body.description, req.body.date, req.body.tags);
    res.send("Task Created!");
};

// GET --- /task/
let GetAllTasksController = function (req, res) {
    res.json(TaskService.getTaskList());
};

// POST --- /task/delete/
let TaskDeleteController = function (req, res) {
    if(TaskService.deleteTaskWithId(req.body.taskId)) {
        res.send("Task Deleted!");
    } else {
        res.status(400).send("No Task With That Id");
    }
};

// POST --- /task/modify/
let TaskModifyController = function (req, res) {
    if (TaskService.updateTaskWithId(req.body.taskId, req.body.description, req.body.date, req.body.tags)) {
        res.send(`Task (id = ${req.body.taskId}) Modified!`);
    } else {
        res.status(400).send(`No Task exists with id = ${req.body.taskId}`);
    }
};

// GET --- /task/date/:date
let GetTasksByDateController = function (req, res) {
    console.log('date = %s', req.params.date);
    res.send(TaskService.getTasksForDate(req.params.date));
};

module.exports = {
    TaskCreateController: TaskCreateController,
    TaskDeleteController: TaskDeleteController,
    TaskModifyController: TaskModifyController,
    GetAllTasksController: GetAllTasksController,
    GetTasksByDateController: GetTasksByDateController
};
