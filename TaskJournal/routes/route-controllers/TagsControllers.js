const TaskService = require('../../services/TaskService');
const Tag = require('../../shared/Tag');

let tagsArray = [];

// GET -- /tags/
let TagsGetTagsController = function (req, res) {
    res.json(tagsArray);
};

// POST -- /tags/add/task/:task_id
// TODO: we need to validate the POST parameters
let TagsAddTagController = function (req, res) {
    let taskId = req.params.task_id;
    let tagDescription = req.body.tag_description;
    let tag = getTagFromDescription(tagDescription);
    let newTag = tag === null;
    tag = tag || new Tag(getNextAvailableTagId(), tagDescription);
    if (newTag) {
        tagsArray.push(tag);
    }
    let relevantTask = TaskService.getTaskWithId(taskId);
    if (!relevantTask) {
        res.status(400).send('No matching task found with that id');
    } else if (relevantTask.addTag(tag.description)) {
        // TODO: need to use Tag classes instead of adding strings descriptions directly
        res.send('Tag Added the task successfully');
    } else {
        res.status(400).send('Task already contained that tag.')
    }
};

// POST -- /tags/delete/task/:task_id
let TagsDeleteTagController = function (req, res) {
    // TODO: we need to be able to delete a tag from an existing task
    let taskId = req.params.task_id;
    let tagId = req.body.tag_id;

    let tag = getTagFromId(tagId);
    if (tag != null){
        deleteTagFromTagsArray(tag);
        res.send('Tag Deleted Successfully');
    }else{
        res.send('Tag Doesn\'t Exist');
    }
};

// returns an existing tag (if one exists)
function getTagFromDescription(description){
    let returnValue = null;
    tagsArray.forEach(function (tag) {
        if (tag.description == description) {
            returnValue = tag;
        }
    });
    return returnValue;
}

function getTagFromId(id){
    let returnValue = null;
    tagsArray.forEach(function (tag) {
        if (tag.id == id) {
            returnValue = tag;
        }
    });
    return returnValue;
}

function deleteTagFromTagsArray(tag){
    let index = tagsArray.indexOf(tag);
    if (index >= 0 && index < tagsArray.length){
        tagsArray.splice(index, 1);
    }
}

function getNextAvailableTagId(){
    if (tagsArray.length == 0) {
        return 0;
    }else{
        return tagsArray[tagsArray.length - 1].id + 1;
    }
}

module.exports = {
    TagsAddTagController: TagsAddTagController,
    TagsDeleteTagController: TagsDeleteTagController,
    TagsGetTagsController: TagsGetTagsController
};
