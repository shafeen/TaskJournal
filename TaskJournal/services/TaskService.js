const Task = require('./../shared/Task');

let tasks = [];
let taskIdToTaskMap = {};
let nextTaskId = 0;

function getNextTaskId() {
    return nextTaskId++;
}

function getTaskList() {
    return tasks;
}

function getTasksForDate(dateStr) {
    let requestDate = new Date(dateStr);
    return tasks.filter(
        (task) => datesMatch(requestDate, task.date)
    );
}

function getTaskWithId(taskId) {
    return taskIdToTaskMap[taskId];
}

function datesMatch(requestDate, taskDate) {
    return (requestDate.getYear() == taskDate.getYear() &&
    requestDate.getMonth() == taskDate.getMonth() &&
    requestDate.getDate() == taskDate.getDate());
}

function createNewTask(description, date, tags) {
    let task = new Task(getNextTaskId(), description, date, tags);
    tasks.push(task);
    taskIdToTaskMap[task.id] = task;
    return task;
}

function deleteTaskWithId(taskId) {
    let taskDeleted = false;
    for (let i=0; i<tasks.length && !taskDeleted; i++) {
        if (taskId == tasks[i].id) {
            taskDeleted = true;
            delete taskIdToTaskMap[taskId];
            tasks.splice(i, 1);
        }
    }
    return taskDeleted;
}

function updateTaskWithId(taskId, description, date, tags) {
    let modifiedNewTask = new Task(taskId, description, date, tags);
    let oldTask = getTaskWithId(taskId);
    if (oldTask) {
        oldTask.description = modifiedNewTask.description;
        oldTask.tags = modifiedNewTask.tags;
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getTaskList: getTaskList,
    getTasksForDate: getTasksForDate,
    getTaskWithId: getTaskWithId,
    createNewTask: createNewTask,
    deleteTaskWithId: deleteTaskWithId,
    updateTaskWithId: updateTaskWithId
};

