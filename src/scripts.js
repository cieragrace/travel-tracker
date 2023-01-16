import './css/styles.css';
import { getAPIData, updateAPIData } from './apiCalls'
import Traveler from './traveler';
import TravelerRepository from './TravelerRepository'
import * as dayjs from 'dayjs';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


//---------Global Variables------------

let travelers
let trips
let destinations
let currentTraveler
let today = new Date()

//---------Query Selectors--------------
let loginPage = document.querySelector('#loginContainer')
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
let postTripButton = document.querySelector('.destination-cost')
let userNameInput = document.querySelector('#userName')
let passwordInput = document.querySelector('#password')

//---------Event Listeners--------------
window.addEventListener("load", getAllData)
planButton.addEventListener("click", displayFututeTripTotals)
loginButton.addEventListener("click", function () {
  // validateUser()
  openTravelerPage()
})
postTripButton.on("click", postNewTrip)

//-----------Functions-------------------

function getAllData() {
  Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
    .then((data) => {
      travelers = new TravelerRepository(data[0])
      trips = data[1]
      destinations = data[2]
      loadPage()
    })
    .catch(err => console.log("To err is human", err))
}

// function validateUser() {
// }


function getTraveler(tripsData, destinationData) {
  let randomIndex = Math.floor(Math.random() * travelers.data.travelers.length)
  let randomUser = travelers.data.travelers[randomIndex - 1]
  currentTraveler = new Traveler(randomUser, trips, destinations)
}

function enableLoginButton() {
if (userNameInput.value && passwordInput.value) {
  loginButton.disabled = false
} else {
  loginButton.disabled = true
  }
}

function openTravelerPage() {
  loginPage.classList.add('hidden')
  travelersPage.classList.remove('hidden')
  // currentTraveler.displayPossibleDestinations()
  }

function displayingTravelersFlights() {
  let travelersTrips = currentTraveler.findTravelersFlights()
  let destinationName = currentTraveler.getDestinationInfoPerID("destination")
  trip1.innerHTML += `<li>${destinationName[0]}</li>`
  trip1info.innerHTML += `<li>on ${travelersTrips[0].date}</li>
  <li>with ${travelersTrips[0].travelers} people</li>
  <li>for ${travelersTrips[0].duration} days</li>`
  trip2.innerHTML += `<li>${destinationName[1]}</li>`
  trip2info.innerHTML += `<li>on ${travelersTrips[1].date}</li>
  <li>with ${travelersTrips[1].travelers} people</li>
  <li>for ${travelersTrips[1].duration} days</li>`
  trip3.innerHTML += `<li>${destinationName[2]}</li>`
  trip3info.innerHTML += `<li>on ${travelersTrips[2].date}</li>
  <li>with ${travelersTrips[2].travelers} people</li>
  <li>for ${travelersTrips[2].duration} days</li>`
  yearlyCost.innerHTML += `$${currentTraveler.getTripTotal()}`
}

function enablePlanButton() {
  if (pickedDate.value && numDays.value && numPeople.value) {
    planButton.disabled = false
  } else {
    planButton.disabled = true
  }
  }

 setInterval(enablePlanButton, 500);

function displayPossibleDestinations() {
  // const possibleTrips = currentTraveler.getDestinationsInfo("destination")
  const possibleTrips = currentTraveler.destinationData.destinations
  // console.log(possibleTrips)
  const eachDest = possibleTrips.forEach(destination => {
    const destinationContainer = document.createElement("div")
    destinationContainer.classList.add("destinations")
    console.log(destination)
    destinationContainer.style.backgroundImage = `url('${destination.image}')`
    const destinationName = document.createElement("p")
    destinationName.classList.add("names-of-destinations")
    destinationName.innerHTML += `${destination.destination}`
    destinationContainer.appendChild(destinationName)
    destinationsDiv.appendChild(destinationContainer)
  })
}

function displayFututeTripTotals() {
  if (pickedDate.value && numDays.value && numPeople.value) {
  const possibleTrips = currentTraveler.destinationData.destinations
  const eachDestination = possibleTrips.forEach(destination => {
    console.log(destination)
    const estFlightCost = destination.estimatedFlightCostPerPerson * numPeople.value
    const estLodgingCost = destination.estimatedLodgingCostPerDay * numDays.value * numPeople.value
    const totalCost = (estFlightCost + estLodgingCost) * 1.1
    console.log(totalCost)
    const eachTripCost = document.createElement("button")
    eachTripCost.classList.add("destination-cost")
    eachTripCost.innerHTML += `Take a trip with ${numPeople.value} friends for ${numDays.value} days for only $${totalCost.toFixed(2)}`
    destinationCosts.appendChild(eachTripCost)
    })
  } 
}

function postNewTrip(event) {
  if (postTripButton) {
    event.preventDefault()
    const numTravelers = numPeople.value
    const tripLength = numDays.value
    const date = pickedDate.value
    if(numTravelers && tripLength && date) {
      const newData = {
        id: 666,
        userID: traveler.id,
        destinationID: currentTraveler.destinationData.destinations.id,
        travelers: numTravelers,
        date: date,
        duration: tripLength,
        status: "pending",
        suggestedActivities: []
      }
      errorBox.classList.add("hidden")
      updateAPIData(newData, 'trips')
    } else {
      errorBox.classList.remove("hidden")
    }
  }
}

function loadPage() {
getTraveler()
enableLoginButton()
displayingTravelersFlights()
displayPossibleDestinations()
enablePlanButton()
displayFututeTripTotals()
}