class Trips {
    constructor() {
        // this.trips = []
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
        this.tripsContainer.innerHTML +=`
        <li>${newTrip}</li>
        `
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
        .fetchTrips()
        .then(trips => {

            trips.forEach(trip => Trip.all.push(new Trip(trip)))
            console.log(Trip.all)
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        const tripsContainer = document.getElementById("trips-container")
        
        Trip.all.forEach(e => 
            tripsContainer.innerHTML += `
            <div id="trip-${e.id}">
                <li>
                ${e.name}
                <ul>
                ${e.activities}
                </ul>
                </li>
            <button class="Add Activity" trip-id="${e.id}">Add Activity</button>
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
            alert(json.message)
        })
    
    // remove from dom
    trip.remove()
}

function addActivity(id) {
    let trip = document.getElementById(`trip-${id}`)
    console.log("I'm in the addActivity function")
}

function handleClickAction(e) {
    if (e.target.className === "delete") {
        let id = parseInt(e.target.attributes[1]["nodeValue"])
        removeTrip(id)
    }
    else if (e.target.className === "Add Activity") {
        let id = parseInt(e.target.attributes[1]["nodeValue"])
        addActivity(id)

    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tripsContainer = document.getElementById("trips-container")
    const newTripForm = document.getElementById("new-trip-form")
    tripsAdapter.fetchTrips()
    activitiesAdapter.fetchActivities()
    newTripForm.addEventListener('submit', window.handleSubmitForm)

    tripsContainer.addEventListener('click', handleClickAction)
})