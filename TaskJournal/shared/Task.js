class Task {
    constructor(id, description, date, tags) {
        this.id = id;
        this.description = description;
        this.date = new Date(date);
        this.tags = this.parseTags(tags);
    }

    parseTags(tags) {
        let splitTags = tags.split(' ');
        // add the tags to a list of existing tags
        return splitTags;
    }

    addTag(tag) {
        if (!this.containsTag(tag)) {
            this.tags.push(tag);
            return true;
        } else {
            return false;
        }
    }

    containsTag(tag) {
        let exists = false;
        this.tags.forEach((_tag) => {
            if (_tag === tag) {
                exists = true;
            }
        });
        return exists;
    }

}

module.exports = Task;
