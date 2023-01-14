import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler'

describe('Traveler', () => {
  let traveler1, traveler2, traveler3, tripsData, destinationsData
  beforeEach(() => {
    traveler1 = new Traveler({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    }, tripsData, destinationsData)

    traveler2 = new Traveler({
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker" 
    }, tripsData, destinationsData)

    traveler3 = new Traveler({
      id: 8,
      name: "Carlin O'Reilly",
      travelerType: "history buff"
    }, tripsData, destinationsData)

    tripsData = {
      trips: [{
        id: 3,
        userID: 3,
        destinationID: 22,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        userID: 2,
        destinationID: 10,
        travelers: 5,
        date: "2019/09/27",
        duration: 13,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 117,
        userID: 1,
        destinationID: 28,
        travelers: 3,
        date: "2021/01/09",
        duration: 15,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 50,
        userID: 3,
        destinationID: 16,
        travelers: 5,
        date: "2020/07/02",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        userID: 2,
        destinationID: 6,
        travelers: 6,
        date: "2020/3/28",
        duration: 10,
        status: "approved",
        suggestedActivities: [ ]
      }]
    }

    destinationsData = {
      destinations: [{
        id: 1,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        alt: "overview of city buildings with a clear sky"
      },
        {
        id: 2,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time"
        },
        {
        id: 3,
        destination: "Sydney, Austrailia",
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "opera house and city buildings on the water with boats"
        },
        {
        id: 28,
        destination: "Cartagena, Colombia",
        estimatedLodgingCostPerDay: 65,
        estimatedFlightCostPerPerson: 350,
        image: "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        alt: "boats at a dock during the day time"
        },
        {
        id: 5,
        destination: "Madrid, Spain",
        estimatedLodgingCostPerDay: 150,
        estimatedFlightCostPerPerson: 650,
        image: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with clear skys and a road in the day time"
        },
        {
        id: 6,
        destination: "Jakarta, Indonesia",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 890,
        image: "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "lit up city at night"
        },
        {
        id: 7,
        destination: "Paris, France",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 395,
        image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
        alt: "city during the day time with eiffel tower"
        },
        {
        id: 8,
        destination: "Tokyo, Japan",
        estimatedLodgingCostPerDay: 125,
        estimatedFlightCostPerPerson: 1000,
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
        alt: "city with people walking in crosswalk and brightly lit shops at night"
        },
        {
        id: 9,
        destination: "Amsterdam, Netherlands",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 950,
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "canal with boats and trees and buildings along the side"
        },
        {
        id: 10,
        destination: "Toronto, Canada",
        estimatedLodgingCostPerDay: 90,
        estimatedFlightCostPerPerson: 450,
        image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
        }]
      }
   })

   // traveler
    it('should be a function', function () {
      expect(Traveler).to.be.a('function');
    });
  
    it('should instantiate a new User', function () {
      expect(Traveler).to.be.a('function');
    })

    it('should have a traveler data parameter', function () {
      expect(traveler1.travelers).to.deep.equal({
        id: 1,
        name: "Ham Leadbeater",
        travelerType: "relaxer"
      })
    })

    it('should have an id', function () {
      expect(traveler2.travelers.id).to.equal(2)
    })

    it('should have a name', function() {
      expect(traveler1.travelers.name).to.equal("Ham Leadbeater")
    })

    it('should have a traveler type', function () {
      expect(traveler3.travelers.travelerType).to.equal("history buff")
    })

    it('should return traverlers trips by id number', function () {
      expect(traveler2.findTravelersFlights()).to.deep.equal(
        [{
        userID: 2,
        destinationID: 10,
        travelers: 5,
        date: "2019/09/27",
        duration: 13,
        status: "approved",
        suggestedActivities: [ ] 
        }, 
        {
        userID: 2,
        destinationID: 6,
        travelers: 6,
        date: "2020/3/28",
        duration: 10,
        status: "approved",
        suggestedActivities: [ ]
        }]
      )
    })

    it('should return the destination name when trip id is provided', function() {
      expect(traveler2.getDestinationInfoPerID("destination")).to.deep.equal(["Jakarta, Indonesia", "Toronto, Canada"])
    })

    it('should return the destination cost per day when trip id is provided', function() {
      expect(traveler1.getDestinationInfoPerID("estimatedLodgingCostPerDay")).to.deep.equal([65])
    })

    it('should return the destination flight cost per person when trip id is provided', function() {
      expect(traveler1.getDestinationInfoPerID("estimatedFlightCostPerPerson")).to.deep.equal([350])
    })

    it('should calculate the total cost of a trip', function() {
      expect(traveler1.getTripTotal()).to.equal(2227.5)
    })

    // it('should access and return destination id', function () {
    //   expect(traveler1.getDestinationsInfo("destination")).to.equal()
    // })
  })