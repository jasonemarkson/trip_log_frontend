class ActivitiesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/activities'
    }
    
    fetchActivities() {
        fetch(this.baseUrl)
        .then(response => response.json())
    }
}