let dateUtil = function () {
    return {
        getDateStr_YYYYMMDD: function (dateObj) {
            return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
        },
        getPanelSelectorForDay: function (date) {
            return `#day${date.getDay()}`;
        }
    };
}();


$(function () {
    let today = new Date();
    let todayStr = dateUtil.getDateStr_YYYYMMDD(today);
    console.log("today is %s", todayStr);

    // hide all panels besides todays
    $('.panel-body').hide();
    $(dateUtil.getPanelSelectorForDay(today))
        .removeClass('panel-default')
        .addClass('panel-primary')
        .find('.panel-body').show();

    // init today's panel


});