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
        let exists = false;
        this.tags.forEach((_tag) => {
            if (_tag === tag) {
                exists = true;
            }
        });
        if (!exists) {
            this.tags.push(tag);
        }
    }
}

module.exports = Task;