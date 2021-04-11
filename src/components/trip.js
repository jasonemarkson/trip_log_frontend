class Trip {
    static all = []
    constructor(tripJSON) {
        this.id = tripJSON.id
        this.name = tripJSON.name
        this.activities = []
    }
}