class Trips {
    constructor() {
        this.trips = []
        this.adapter = new TripsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadTrips()
        this.newTripsAdd()
    }

    newTripsAdd() {
        this.tripsContainer = document.getElementById("trips-container")
        this.inputValue = document.getElementById("new-trip-input")
        this.form = document.getElementById("new-trip-form")
        this.form.addEventListener('submit', this.addTripToDom.bind(this))
    }

    addTripToDom(e) {
        e.preventDefault()

        const newTrip = this.inputValue.value
        this.tripsContainer.innerHTML +=`<li>${newTrip}</li>`

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
        
        this.trips.forEach(e => 
            tripsContainer.innerHTML += `<li>${e.name}</li>`)
    }
}