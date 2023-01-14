import './css/styles.css';
import { getAPIData } from './apiCalls'
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
let trip1 = document.querySelector("#tripDivs1")
let trip2 = document.querySelector("#tripDivs2")
let trip3 = document.querySelector("#tripDivs3")
let trip1info = document.querySelector('#tripInfo1')
let trip2info = document.querySelector('#tripInfo2')
let trip3info = document.querySelector('#tripInfo3')
let yearlyCost = document.querySelector('#annualTripCost')
// let destination1Title = document.querySelector('#destination1')
document.getElementById('datePicker').setAttribute('min', new Date().toISOString().split('T')[0])
// let futureTripDate = document.querySelector('#selectedDate')
let pickedDate = document.querySelector('#datePicker')
let planButton = document.querySelector('#planButton')
let destinationsDiv = document.querySelector('.list-destinations')

//---------Event Listeners--------------
window.addEventListener("load", getAllData)
// planButton.addEventListener("click", )


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


function getTraveler(tripsData, destinationData) {
  let randomIndex = Math.floor(Math.random() * travelers.data.travelers.length)
  let randomUser = travelers.data.travelers[randomIndex - 1]
  currentTraveler = new Traveler(randomUser, trips, destinations)
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

function displayPossibleDestinations() {
  const possibleTrips = currentTraveler.getDestinationsInfo("destination")
  console.log(possibleTrips)
  const eachDest = possibleTrips.forEach(destination => {
    const destinationContainer = document.createElement("div")
    destinationContainer.classList.add("destinations")
    const destinationName = document.createElement("p")
    destinationName.classList.add("names-of-destinations")
    destinationName.innerHTML += `${destination}`
    destinationContainer.appendChild(destinationName)
    const futureTripInfo = document.createElement('ul') // will hide ul with function
    futureTripInfo.classList.add("input-Displayed")
    const datePicked = document.createElement('li')
    datePicked.classList.add("displayed-date")
    const numDaysPicked = document.createElement('li')
    numDaysPicked.classList.add("selected-num-days")
    const numTravelersPicked = document.createElement('li')
    numTravelersPicked.classList.add("num-travelers-selected")
    datePicked.innerHTML = `${pickedDate.value}`
    futureTripInfo.appendChild(datePicked)
    numDaysPicked.innerHTML = `${numDays.value}`
    futureTripInfo.appendChild(numDaysPicked)
    numTravelersPicked.innerHTML = `${numPeople.value}`
    futureTripInfo.appendChild(numTravelersPicked)
    destinationContainer.appendChild(futureTripInfo)
    datePicker.value & numDays.value & numPeople.value
    destinationsDiv.appendChild(destinationContainer)
  })
}

function enablePlanButton() {
if (pickedDate.value && numDays.value && numPeople.value) {
  planButton.disabled = false
} else {
  planButton.disabled = true
}
}


function loadPage() {
getTraveler()
displayingTravelersFlights()
displayPossibleDestinations()
enablePlanButton()
// displayFutureTravelerInfo()
}