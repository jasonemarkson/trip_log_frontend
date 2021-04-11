// the job of the adapter is to be the middleman between the api and the frontend

class TripsAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/trips'
    }
    
    fetchTrips() {
        return fetch(this.baseUrl)
        .then(response => response.json()
        )
    }
}