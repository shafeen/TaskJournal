class Tag {
    constructor(id, description){
        this.id = id;
        this.description = description;
    }
}

var tagsArray = [];

var TagsAddTagController = function (req, res) {
    var taskId = req.params.task_id;
    var tagDescription = req.body.tag_description;

    var tag = getTagFromDescription(tagDescription);
    if (tag == null){
        tag = new Tag(getNextAvailableTagId(), tagDescription);
        tagsArray.push(tag);
        res.send('Tag Added Successfully');
    }else{
        res.send('Tag Already Exists');
    }

};

var TagsDeleteTagController = function (req, res) {
    var taskId = req.params.task_id;
    var tagId = req.body.tag_id;

    var tag = getTagFromId(tagId);
    if (tag != null){
        deleteTagFromTagsArray(tag);
        res.send('Tag Deleted Successfully');
    }else{
        res.send('Tag Doesn\'t Exist');
    }
};

var TagsGetTagsController = function (req, res) {
    res.json({
        "tagsArray": tagsArray
    })
}

function getTagFromDescription(description){
    var returnValue = null;
    tagsArray.forEach(function (tag) {
        if (tag.description == description){
            returnValue = tag;
        }
    })
    return returnValue;
}

function getTagFromId(id){
    var returnValue = null;
    tagsArray.forEach(function (tag) {
        if (tag.id == id){
            returnValue = tag;
        }
    })
    return returnValue;
}

function deleteTagFromTagsArray(tag){
    var index = tagsArray.indexOf(tag);
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
