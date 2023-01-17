import './css/styles.css';
import { getAPIData, updateAPIData } from './apiCalls'
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
let today = new Date ()

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
let displayTravelerName = document.querySelector('#displayName')
let tripsContainer = document.querySelector('.list-trips')
let newTrips = document.querySelector('#annual-spent')

//---------Event Listeners--------------

window.addEventListener("load", getAllData)
planButton.addEventListener("click", displayFututeTripTotals)
// loginButton.addEventListener("click", function (event) {
//   event.preventDefault
//   findUser()
  // openTravelerPage()
  // displayingTravelersFlights()
  // displayPossibleDestinations()
// }) 
// postTripButton.addEventListener("click", postNewTrip)

//-----------Functions-------------------

function getAllData() {
  Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
    .then((data) => {
      travelers = new TravelerRepository(data[0])
      trips = data[1]
      destinations = data[2]
      // addUsername()
      loadPage()
    })
    .catch(err => console.log("To err is human", err))
}

// function addUsername() {
//   return allTravelers = travelers.data.travelers.forEach(traveler => {
//     traveler.userName = `traveler${traveler.id}`
//   })
// }

// function findUser() {
//   const validUser = travelers.data.travelers.find(traveler => {
//     return traveler.userName === userNameInput.value
//     // loginPageError.classList.add("add")
//   })
//   console.log("Valid:", validUser)
//   currentTraveler = new Traveler(validUser, trips, destinations)
//   console.log(currentTraveler)
//   openTravelerPage()
//   displayingTravelersFlights()
//   displayPossibleDestinations()
  // return findUser

// }


function getTraveler(tripsData, destinationData) {
  let randomIndex = Math.floor(Math.random() * travelers.data.travelers.length)
  let randomUser = travelers.data.travelers[randomIndex - 1]
  currentTraveler = new Traveler(randomUser, trips, destinations)
}

// function enableLoginButton() {
// if (userNameInput.value &&
//    passwordInput.value === "travel") {
//     loginPageError.classList.add("hidden")
//   loginButton.disabled = false
// } else {

//   loginButton.disabled = true
//   }
// }

// function openTravelerPage() {
//   loginPage.classList.add('hidden')
//   travelersPage.classList.remove('hidden')
//   }

function displayingTravelersFlights() {
  console.log(currentTraveler)
    const travelersTrips = currentTraveler.tripsData.trips.filter(trip => {
      return trip.userID === currentTraveler.travelers.id
    })
  // let travelersTrips = currentTraveler.findTravelersFlights()
  console.log('travelersTrips', travelersTrips)
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

//  setInterval(enableLoginButton, 500)
 setInterval(enablePlanButton, 500);

function displayPossibleDestinations() {
  // const possibleTrips = currentTraveler.getDestinationsInfo("destination")
  const possibleTrips = currentTraveler.destinationData.destinations
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

// function displayingTravelersFlights() {
//     const travelersTrips = currentTraveler.tripsData.trips.filter(trip => {
//       return trip.userID === currentTraveler.travelers.id
//   })
//     const eachTrip = travelersTrips.forEach(trip => {
//       // let destinationName = currentTraveler.getDestinationInfoPerID("destination")
//       const tripBox = document.createElement("div")
//     // tripBox.setAttribute("id", destination.id)
//       tripBox.classList.add("trips-divs-container")
//       tripsContainer.appendChild(tripBox)
//       const tripBoxp = document.createElement("p")
//       tripBoxp.classList.add("trips-divs")
//       tripBoxp.innerHTML += `<li>${destinationName}</li>`
//       tripBox.appendChild(tripBoxp)
//       const tripBoxUL = document.createElement("ul")
//       tripBoxUL.classList.add("trips-info")
//       tripBoxUL.innerHTML += `<li>on ${travelersTrips[0].date}</li>
//       <li>with ${travelersTrips.travelers} people</li>
//       <li>for ${travelersTrips.duration} days</li>`
//       tripBox.appendChild(tripBoxUL)
//     })
//   }

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
    eachTripCost.setAttribute("id", destination.id)
    eachTripCost.classList.add("destination-cost")
    eachTripCost.innerHTML += `Take a trip with ${numPeople.value} friends for ${numDays.value} days for only $${totalCost.toFixed(2)}`
    destinationCosts.appendChild(eachTripCost)
    postTripButton = document.querySelector('.destination-cost')
    postTripButton.addEventListener("click", postNewTrip)
    })
  } 
}

function postNewTrip(event) {
  console.log(event.target)
    event.preventDefault()
    const numTravelers = numPeople.value
    const tripLength = numDays.value
    const date = pickedDate.value
    if(numTravelers && tripLength && date) {
      console.log("trips;", trips)
      console.log("length:", trips.length)
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
      newTrips.innerHTML += newData
      currentUser.getTripTotal
      // errorBox.classList.remove("hidden")
    }
  }

function loadPage() {
  getTraveler()
// addUsername()
// enableLoginButton()
displayingTravelersFlights()
displayPossibleDestinations()
enablePlanButton()
displayFututeTripTotals()
// validateUser()
}