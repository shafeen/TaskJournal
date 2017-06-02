let dateUtil = function () {
    return {
        getDateStr_YYYYMMDD: function (dateObj) {
            return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
        }
    }
}();


$(function () {
    console.log('this is now working');

    let today = dateUtil.getDateStr_YYYYMMDD(new Date());



});