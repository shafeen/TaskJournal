class Tag {
    constructor(id, description){
        this.id = id;
        this.description = description;
    }
}

let tagsArray = [];

// GET -- /tags/
let TagsGetTagsController = function (req, res) {
    res.json(tagsArray);
};

// POST -- /tags/add/task/:task_id
let TagsAddTagController = function (req, res) {
    let taskId = req.params.task_id;
    let tagDescription = req.body.tag_description;

    let tag = getTagFromDescription(tagDescription);
    if (tag == null) {
        tag = new Tag(getNextAvailableTagId(), tagDescription);
        tagsArray.push(tag);
        // TODO: we need to add a tag to a task
        res.send('Tag Added Successfully');
    }else{
        res.send('Tag Already Exists');
    }

};

// POST -- /tags/delete/task/:task_id
let TagsDeleteTagController = function (req, res) {
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

// returns the name of an existing tag id (if one exists)
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
