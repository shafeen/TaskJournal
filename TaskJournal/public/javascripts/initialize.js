let dateUtil = function () {
    return {
        getDateStr_YYYYMMDD: function (dateObj) {
            return `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`;
        },
        getPanelSelectorForDay: function (date) {
            return `#day${date.getDay()}`;
        }
    };
}();

function addTaskToList(date, task) {
    let panelListSelector = `${dateUtil.getPanelSelectorForDay(date)} ul`;
    let taskListItem = $(`<li class="list-group-item">${task.description}</li>`);
    $(panelListSelector).append(taskListItem);

    // adding tags
    const labelClasses = [
        'label label-primary',
        'label label-danger',
        'label label-info',
        'label label-success',
        'label label-default',
        'label label-warning',
    ];
    let currentLabelIdx = new Date().getMilliseconds() % labelClasses.length;
    task.tags.forEach((tag) => {
        let currentLabel = labelClasses[currentLabelIdx];
        currentLabelIdx = (currentLabelIdx+1) % labelClasses.length;
        taskListItem.append('&nbsp;');
        taskListItem.append($(`<span class="${currentLabel}">${tag}</span>`));
    })
}

function addNewTaskButtonToList(date) {
    let panelListSelector = `${dateUtil.getPanelSelectorForDay(date)} ul`;
    let taskListItem = $(`<li class="list-group-item form-group form-inline">
                <input type="text" class="form-control" placeholder="Add New Task" id="newTask">
                <input type="text" class="form-control" placeholder="Tags" id="newTags">
                <button class="btn btn-sm btn-input" id="addTaskBtn">Add Task</button>
            </li>`);
    $(panelListSelector).append(taskListItem);
    $('#addTaskBtn').on('click', (event) => {
        let addTaskData = {
            description: $('#newTask').val(),
            tags: $('#newTags').val(),
            date: dateUtil.getDateStr_YYYYMMDD(new Date())
        };
        console.log(addTaskData);
        $.post('/task/create', addTaskData)
            .done((response) => {
                console.log(response);
                refreshTasksForDay(new Date());
                $('#newTask').val('');
                $('#newTags').val('');
                $('#taskDatepicker').val('');
            });
    });
}

function refreshTasksForDay(day) {
    let panelListSelector = `${dateUtil.getPanelSelectorForDay(day)} ul`;
    $(panelListSelector).empty();
    addNewTaskButtonToList(day);

    let dayStr = dateUtil.getDateStr_YYYYMMDD(day);
    let todaysTasks = [];
    $.get(`/task/date/${dayStr}`).done((response) => {
        console.log(response);
        todaysTasks = response;
        todaysTasks.forEach((task) => {
            addTaskToList(day, task);
        });
    });
}

$(function () {
    let today = new Date();
    // hide all panels besides today's
    $('.panel-body').hide();
    $(dateUtil.getPanelSelectorForDay(today))
        .removeClass('panel-default')
        .addClass('panel-primary')
        .find('.panel-body').show();

    // initialize today's panel
    addNewTaskButtonToList(today);
    refreshTasksForDay(today);
});