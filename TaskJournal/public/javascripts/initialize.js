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

$(function () {
    let today = new Date();
    let todayStr = dateUtil.getDateStr_YYYYMMDD(today);
    console.log("today is %s", todayStr);

    // hide all panels besides today's
    $('.panel-body').hide();
    $(dateUtil.getPanelSelectorForDay(today))
        .removeClass('panel-default')
        .addClass('panel-primary')
        .find('.panel-body').show();

    // initialize today's panel
    let todaysTasks = [];
    $.get(`/task/date/${todayStr}`).done((response) => {
        console.log(response);
        todaysTasks = response;
        todaysTasks.forEach((task) => {
            addTaskToList(today, task);
        })
    });


});