var TagsAddTagController = function (req, res) {
    var taskID = req.params.task_id;
    var tagDescription = req.body.tag_description;
    console.log("task ID: %s", taskID);
    console.log("tag description: %s", tagDescription);
    res.send('add tag');
};

var TagsDeleteTagController = function (req, res) {
    var taskID = req.params.task_id;
    var tagID = req.body.tag_id;
    console.log("task ID: %s", taskID);
    console.log("tag ID: %s", tagID);
    res.send('delete tag');
};

module.exports = {
    TagsAddTagController: TagsAddTagController,
    TagsDeleteTagController: TagsDeleteTagController
};
