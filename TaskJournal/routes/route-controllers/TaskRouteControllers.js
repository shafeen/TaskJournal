class Task {
    constructor(id, description, date, tags) {
        this.id = id;
        this.description = description;
        this.date = new Date(date);
        this.tags = tags;
    }
}

var tasks = [];
var nextTaskId = 0;

var TaskCreateController = function (req, res) {
    var task = new Task(nextTaskId, req.body.description, req.body.date, req.body.tags);
    tasks.push(task);
    nextTaskId += 1;
    
    res.send("Task Created!");
};

var TaskDeleteController = function (req, res) {
    var taskDeleted = false;
    for(var i=0;i<tasks.length;i++) {
        if(req.body.taskId == tasks[i].id) {
            taskDeleted = true;
            tasks.splice(i, 1);
        }
    }
    
    if(taskDeleted) {
        res.send("Task Deleted!");
    } else {
        res.send("No Task With That Id");
    }
};

var TaskModifyController = function (req, res) {
    var taskModified = false;
    var modifiedTask = new Task(req.body.taskId, req.body.description, req.body.date, req.body.tags);
    for(var i=0;i<tasks.length;i++) {
        if(req.body.taskId == tasks[i].id) {
            taskModified = true;
            tasks[i] = modifiedTask;
        }
    }
    
    if(taskDeleted) {
        res.send("Task Modified!");
    } else {
        res.send("No Task With That Id");
    }
};

var GetAllTasksController = function (req, res) {
    res.send(tasks);
};

var GetTasksByDateController = function (req, res) {
    request_date = new Date(req.params.date);
    tasksForDate = [];
    for(var i=0;i<tasks.length;i++) {
        if(doDatesMatch(request_date, tasks[i].date)) {
            tasksForDate.push(tasks[i]);
        }
    }
    res.send(tasksForDate);
};

function doDatesMatch(requestDate, taskDate) {
    return (requestDate.getYear() == taskDate.getYear() && requestDate.getMonth() == taskDate.getMonth() && requestDate.getDate() == taskDate.getDate());
}

module.exports = {
    TaskCreateController: TaskCreateController,
    TaskDeleteController: TaskDeleteController,
    TaskModifyController: TaskModifyController,
    GetAllTasksController: GetAllTasksController,
    GetTasksByDateController: GetTasksByDateController
};
