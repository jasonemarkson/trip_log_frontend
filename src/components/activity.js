class Activity {
    static all = []
    constructor(actJSON) {
        this.id = actJSON.id
        this.description = actJSON.description
        this.image_url = actJSON.image_url
        this.trip_id = actJSON.trip_id
    }
}