import './css/styles.css';
// import { getAPIData, updateAPIData } from './apiCalls'
import Traveler from './traveler';
import TravelerRepository from './TravelerRepository'
import * as dayjs from 'dayjs';

//---------Global Variables------------

let postTripButton
let travelers
let trips
let destinations
let currentTraveler
let allTravelers

//---------Query Selectors--------------
let loginPage = document.querySelector('#loginContainer')
let loginPageError = document.querySelector('#loginError')
let travelersPage = document.querySelector('#travelersPageContainer')
let loginButton = document.querySelector('#loginButton')
let trip1 = document.querySelector("#tripDivs1")
let trip2 = document.querySelector("#tripDivs2")
let trip3 = document.querySelector("#tripDivs3")
let trip1info = document.querySelector('#tripInfo1')
let trip2info = document.querySelector('#tripInfo2')
let trip3info = document.querySelector('#tripInfo3')
let yearlyCost = document.querySelector('#annualTripCost')
document.getElementById('datePicker').setAttribute('min', new Date().toISOString().split('T')[0])
let pickedDate = document.querySelector('#datePicker')
let planButton = document.querySelector('#planButton')
let destinationsDiv = document.querySelector('.list-destinations')
let destinationCosts = document.querySelector(".list-destination-costs")
let userNameInput = document.querySelector('#userName')
let passwordInput = document.querySelector('#password')
let travelerName = document.querySelector('#userName')
let tripsContainer = document.querySelector('.list-trips')

//---------Event Listeners--------------

window.addEventListener("load", getAllData)
planButton.addEventListener("click", displayFututeTripTotals)
loginButton.addEventListener("click", function (event) {
  event.preventDefault
  findUser()
})

//-----------Functions-------------------
function getAPIData(info) {
  const fetchedInfo = fetch(`http://localhost:3001/api/v1/${info}`)
    .then((res) => res.json())
  return fetchedInfo
}

function updateAPIData(newData, endpoint) {
  const results = fetch(`http://localhost:3001/api/v1/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": 'application/json'
    }
  })
  .then((res) => {
    if(!res.ok) {
      throw new Error(res.status)
    }
    return res.json()})
  .then(() => {
    getAPIData("trips")
      .then((data) => {
        console.log("Data:", data)
        currentTraveler.tripsData = data
        displayingTravelersFlights()})

  })
  .catch(error => console.log(error))
  return results
}

function getAllData() {
  Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
    .then((data) => {
      travelers = new TravelerRepository(data[0])
      trips = data[1]
      destinations = data[2]
      addUsername()
      loadPage()
    })
    .catch(err => console.log("To err is human", err))
}

function addUsername() {
  return allTravelers = travelers.data.travelers.forEach(traveler => {
    traveler.userName = `traveler${traveler.id}`
  })
}

function findUser() {
  const validUser = travelers.data.travelers.find(traveler => {
    return traveler.userName === userNameInput.value
  })
  currentTraveler = new Traveler(validUser, trips, destinations)
  openTravelerPage()
  displayingTravelersFlights()
  displayPossibleDestinations()
}

function enableLoginButton() {
if (userNameInput.value &&
   passwordInput.value === "travel") {
    loginPageError.classList.add("hidden")
  loginButton.disabled = false
} else {

  loginButton.disabled = true
  }
}

function openTravelerPage() {
  loginPage.classList.add('hidden')
  travelersPage.classList.remove('hidden')
  }

function enablePlanButton() {
  if (pickedDate.value && numDays.value && numPeople.value) {
    planButton.disabled = false
  } else {
    planButton.disabled = true
    }
  }

 setInterval(enableLoginButton, 500)
 setInterval(enablePlanButton, 500);

function displayPossibleDestinations() {
  const travelersTrips = currentTraveler.tripsData.trips.filter(trip => trip.userID === currentTraveler.travelers.id)
  const possibleTrips = currentTraveler.destinationData.destinations
  const eachDest = possibleTrips.forEach(destination => {
  const destinationContainer = document.createElement("div")
  destinationContainer.classList.add("destinations")
  destinationContainer.style.backgroundImage = `url('${destination.image}')`
  const destinationName = document.createElement("p")
  destinationName.classList.add("names-of-destinations")
  destinationName.innerHTML += `${destination.destination}`
  destinationContainer.appendChild(destinationName)
  destinationsDiv.appendChild(destinationContainer)
    })
  }

function displayingTravelersFlights() {
  tripsContainer.innerHtml = ''
  yearlyCost.innerHTML = `You've spent $${currentTraveler.getTripTotal()} seeing the world`
  const thisTraveler = currentTraveler.findTravelersFlights()
  console.log("This", thisTraveler)
  const eachTrip = thisTraveler.forEach(trip => {
    const foundDestination = currentTraveler.destinationData.destinations.find(destination => {
      return destination.id === trip.destinationID
    }) 
    if (foundDestination) {
      const tripBox = document.createElement("div")
      tripBox.classList.add("trips-divs-container")
      tripsContainer.appendChild(tripBox)
      const tripBoxp = document.createElement("h2")
      tripBoxp.classList.add("trips-divs")
      tripBoxp.innerHTML += foundDestination.destination
      tripBox.appendChild(tripBoxp)
      const tripBoxUL = document.createElement("ul")
      tripBoxUL.classList.add("trips-info")
      tripBoxUL.innerHTML += `<li>on ${trip.date}</li>
      <li>with ${trip.travelers} people</li>
      <li>for ${trip.duration} days</li>
      <li> status: ${trip.status}`
      tripBox.appendChild(tripBoxUL)
    }
  })
}

function displayFututeTripTotals() {
  if (pickedDate.value && numDays.value && numPeople.value) {
  const possibleTrips = currentTraveler.destinationData.destinations
  const eachDestination = possibleTrips.forEach(destination => {
    const estFlightCost = destination.estimatedFlightCostPerPerson * numPeople.value
    const estLodgingCost = destination.estimatedLodgingCostPerDay * numDays.value * numPeople.value
    const totalCost = (estFlightCost + estLodgingCost) * 1.1
    const eachTripCost = document.createElement("button")
    eachTripCost.setAttribute("id", destination.id)
    eachTripCost.classList.add(`destination-cost${destination.id}`)
    eachTripCost.classList.add('destination-cost')
    eachTripCost.innerHTML += `Take a trip with ${numPeople.value} friends for ${numDays.value} days for only $${totalCost.toFixed(2)}`
    destinationCosts.appendChild(eachTripCost)
    postTripButton = document.querySelector(`.destination-cost${destination.id}`)
    postTripButton.addEventListener("click", postNewTrip)
    })
  } 
}

function postNewTrip(event) {
  console.log(event.target)
    event.preventDefault()
    const numTravelers = numPeople.value + 1
    const tripLength = numDays.value
    const date = pickedDate.value
    if(numTravelers && tripLength && date) {
      const newData = {
        id: trips.trips.length + 1,
        userID: currentTraveler.travelers.id,
        destinationID: Number(event.target.id),
        travelers: numTravelers,
        date: date.split("-").join("/"),
        duration: tripLength,
        status: "pending",
        suggestedActivities: []
      }
      // errorBox.classList.add("hidden")
      updateAPIData(newData, 'trips')
      // errorBox.classList.remove("hidden")
    }
  }

function loadPage() {
enableLoginButton()
enablePlanButton()
displayFututeTripTotals()
}
