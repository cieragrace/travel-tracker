import './css/styles.css';
import Traveler from './traveler';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


function getAllData() {
  Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
    .then((data) => {
      travelers = new Traveler(data[0])
      trips = data[1]
      destinations = data[2]
      loadPage(())
    })
    .catch(err => console.log("To err is human", err))
}
