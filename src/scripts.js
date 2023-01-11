import './css/styles.css';
import { getAPIData } from './apiCalls'
import Traveler from './traveler';
import TravelerRepository from './TravelerRepository'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


//---------Global Variables------------

let travelers
let trips
let destinations
let currentTraveler

//---------Query Selectors--------------
let trip1 = document.querySelector("#tripDivs1")
let trip2 = document.querySelector("#tripDivs2")
let trip3 = document.querySelector("#tripDivs3")

//---------Event Listeners--------------
window.addEventListener("load", getAllData)


//-----------Functions-------------------

function getAllData() {
  Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
    .then((data) => {
      travelers = new TravelerRepository(data[0])
      trips = data[1]
      destinations = data[2]
      // loadPage()
    })
    .catch(err => console.log("To err is human", err))
}


function getTraveler(tripsData, destinationData) {
  let randomIndex = Math.floor(Math.random() * travelers.data.length)
  console.log(randomIndex)
  let randomUser = travelers.data[randomIndex]
  currentTraveler = new Traveler(randomUser, tripsData, destinationData)
}

function displayingTravelersFlights() {
  let travelersTrips = currentTraveler.findTravelersFlights()
  trip1.innerHTML += `<li>${travelersTrips[0].id}</li>`
  `<li>${travelersTrips[0].userID}</li>`
  `<li>${travelersTrips[0].destinationID}</li>`
  `<li>${travelersTrips[0].travelers}</li>`
  `<li>${travelersTrips[0].date}</li>`
  `<li>${travelersTrips[0].duration}</li>`
  `<li>${travelersTrips[0].status}</li>`
  `<li>${travelersTrips[0].suggestedActivities}</li>`
  // trip2.innerHTML += `<li>${travelersTrips[1].id}</li>`
  // `<li>${travelersTrips[1].userID}</li>`
  // `<li>${travelersTrips[1].destinationID}</li>`
  // `<li>${travelersTrips[1].travelers}</li>`
  // `<li>${travelersTrips[1].date}</li>`
  // `<li>${travelersTrips[1].duration}</li>`
  // `<li>${travelersTrips[1].status}</li>`
  // `<li>${travelersTrips[1].suggestedActivities}</li>`
  // trip3.innerHTML += `<li>${travelersTrips[2].id}</li>`
  // `<li>${travelersTrips[2].userID}</li>`
  // `<li>${travelersTrips[2].destinationID}</li>`
  // `<li>${travelersTrips[2].travelers}</li>`
  // `<li>${travelersTrips[2].date}</li>`
  // `<li>${travelersTrips[2].duration}</li>`
  // `<li>${travelersTrips[2].status}</li>`
  // `<li>${travelersTrips[2].suggestedActivities}</li>`
}






// function loadPage() {
// getTraveler()
// displayingTravelersFlights()
// }