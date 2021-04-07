class Trips {
    constructor() {
        this.trips = []
        this.adapter = new TripsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadTrips()
    }

    fetchAndLoadTrips() {
        this.adapter
        .getTrips()
        .then(trips => {
            trips.forEach(trip => this.trips.push(new Trip(trip)))
            // was having trouble creating a new instance of the class Trip -- should have new Trip(trip)
            console.log(this.trips)
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        const tripsContainer = document.getElementById("trips-container")
        // tripsContainer.innerHTML = `this.trips.map(trip => <li>${trip.name}</li>)`
        this.trips.forEach(e => 
            tripsContainer.innerHTML += `<li>${e.name}</li>`)

    }
}