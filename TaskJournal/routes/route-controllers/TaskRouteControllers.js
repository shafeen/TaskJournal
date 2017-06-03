class Task {
    constructor(id, description, date, tags) {
        this.id = id;
        this.description = description;
        this.date = new Date(date);
        this.tags = this.parseTags(tags);
    }

    parseTags(tags) {
        let splitTags = tags.split(' ');
        // add the tags to a list of existing tags
        return splitTags;
    }

    addTag(tag) {
        let exists = false;
        this.tags.forEach((_tag) => {
            if (_tag === tag) {
                exists = true;
            }
        });
        if (!exists) {
            this.tags.push(tag);
        }
    }
}

let tasks = [];
let nextTaskId = 0;

// POST --- /task/create/
let TaskCreateController = function (req, res) {
    let task = new Task(nextTaskId, req.body.description, req.body.date, req.body.tags);
    tasks.push(task);
    nextTaskId += 1;
    console.log('tasks %o', tasks);
    res.send("Task Created!");
};

// POST --- /task/delete/
let TaskDeleteController = function (req, res) {
    let taskDeleted = false;
    for(let i=0;i<tasks.length;i++) {
        if(req.body.taskId == tasks[i].id) {
            taskDeleted = true;
            tasks.splice(i, 1);
        }
    }

    if(taskDeleted) {
        res.send("Task Deleted!");
    } else {
        res.status(400).send("No Task With That Id");
    }
};


// POST --- /task/modify/
let TaskModifyController = function (req, res) {
    let modifiedNewTask = new Task(req.body.taskId, req.body.description, req.body.date, req.body.tags);
    let oldTask = getTaskById(req.body.taskId);
    if (oldTask) {
        oldTask.description = modifiedNewTask.description;
        oldTask.tags = modifiedNewTask.tags;
        console.log(oldTask);
        res.send("Task Modified!");
    } else {
        res.status(400).send("No Task With That Id");
    }
};


// GET --- /task/
let GetAllTasksController = function (req, res) {
    res.json(getAllTasks());
};

function getAllTasks() {
    return tasks;
}

function getTaskById(id) {
    let task = null;
    for(let i=0;i<tasks.length && task === null;i++) {
        if(id == tasks[i].id) {
            task = tasks[i];
        }
    }
    return task;
}

// GET --- /task/date/:date
let GetTasksByDateController = function (req, res) {
    console.log('date = %s', req.params.date);
    request_date = new Date(req.params.date);
    tasksForDate = [];
    for(let i=0;i<tasks.length;i++) {
        if(doDatesMatch(request_date, tasks[i].date)) {
            tasksForDate.push(tasks[i]);
        }
    }
    res.send(tasksForDate);
};

function doDatesMatch(requestDate, taskDate) {
    return (requestDate.getYear() == taskDate.getYear() &&
        requestDate.getMonth() == taskDate.getMonth() &&
        requestDate.getDate() == taskDate.getDate());
}

module.exports = {
    TaskCreateController: TaskCreateController,
    TaskDeleteController: TaskDeleteController,
    TaskModifyController: TaskModifyController,
    GetAllTasksController: GetAllTasksController,
    GetTasksByDateController: GetTasksByDateController
};
