class Trips {
    constructor() {
        this.trips = []
        this.adapter = new TripsAdapter()
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
        this.handleSubmitForm()
        
    }

    handleSubmitForm(e) {
        // e.preventDefault()
        const newTripForm = document.getElementById("new-trip-form")

        let newTripObj = {
            name: this.inputValue.value
        }

        let configObj = {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json", 
                "Accepts": "application/json"
            },
            body: JSON.stringify(newTripObj)
        }

        fetch('http://localhost:3000/trips', configObj)
        .then(res => res.json())
        .then(json => {
            this.newTripsAdd()
        })

        newTripForm.reset()
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
            tripsContainer.innerHTML += `
            <div id="trip-${e.id}">
            <li>${e.name}</li>
            <button class="delete" trip-id="${e.id}">Delete</button>
            </div>
            `)
    }

}

function removeTrip(id) {
    let trip = document.getElementById(`trip-${id}`)
    // remove from db
    
        let configObj = {
            method: 'DELETE', 
            headers: {
                "Content-Type": "application/json", 
                "Accepts": "application/json"
            },
        }

        fetch(`http://localhost:3000/trips/${id}`, configObj)
        .then(res => res.json())
        .then(json => {
            console.log(json)
        })
    
    // remove from dom
    trip.remove()
}

function handleClickAction(e) {
    if (e.target.className === "delete") {
        let id = parseInt(e.target.attributes[1]["nodeValue"])
        removeTrip(id)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tripsContainer = document.getElementById("trips-container")
    const newTripForm = document.getElementById("new-trip-form")
    newTripForm.addEventListener('submit', window.handleSubmitForm)

    tripsContainer.addEventListener('click', handleClickAction)
})