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

    var tagId = insertTagIntoTagsArray(tagDescription);

    console.log(tagsArray);
    res.send('Tag Added Successfully');
};

var TagsDeleteTagController = function (req, res) {
    var taskId = req.params.task_id;
    var tagId = req.body.tag_id;

    deleteTagFromTagsArray(tagId);

    console.log(tagsArray);
    res.send('Tag Deleted Successfully');
};

var TagsGetTagsController = function (req, res) {
    res.json({
        "tagsArray": tagsArray
    })
}

function insertTagIntoTagsArray(description){
    var tagID;
    if (tagDescriptionAlreadyExists(description)){
        tagID = getTagIdForTagDescription(description);
    }else{
        tagID = getNextAvailableTagId();
        tagsArray.push(new Tag(tagID, description));
    }
    return tagID
}

function deleteTagFromTagsArray(tagId){
    tagsArray.forEach(function (tag) {
        if (tag.id == tagId){
            var index = tagsArray.indexOf(tag);
            if (index >= 0 && index < tagsArray.length){
                tagsArray.splice(index, 1);
            }
        }
    })
}

function tagDescriptionAlreadyExists(description){
    tagsArray.forEach(function (tag) {
        if (tag.description == description){
            return true;
        }
    })
    return false;
}

function getTagIdForTagDescription(description){
    tagsArray.forEach(function (tag) {
        if (tag.description == description){
            return tag.id;
        }
    })
    return null;
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
