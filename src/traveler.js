import TravelerRepository from "./TravelerRepository"

class Traveler {
  constructor(travelers, tripsData, destinationData) {
    this.travelers = travelers
    this.tripsData = tripsData
    this.destinationData = destinationData
  }

  findTravelersFlights() {
    return this.tripsData.trips.filter(trip => trip.userID === this.travelers.id)
  }

 getDestinationInfoPerID(property) {
    const travelersTrips = this.findTravelersFlights()
    return this.destinationData.destinations
      .filter(destination => {
        const destinationInfo = travelersTrips.find(trip => trip.destinationID === destination.id)
        if (destinationInfo) {
          return destination
        }
      })
      .map(destination => {
        return destination[property]
      })
    }

  getTripTotal() {
    const trips = this.findTravelersFlights()
    const cost = trips.reduce((acc, trip) => {
      const destinationInfo = this.destinationData.destinations.find(destination => trip.destinationID === destination.id)
      const flightCost = trip.travelers * destinationInfo.estimatedFlightCostPerPerson
      const lodgingCost = trip.duration * destinationInfo.estimatedLodgingCostPerDay
      return acc + (flightCost + lodgingCost) * 1.1
    }, 0)
    return Number(cost.toFixed(2))
  }

  // addUsername() {
  //   this.userName = `traveler${this.travelers.id}
  // }

  getDestinationsInfo(property) {
    const destinationDisplayInfo = this.destinationData.destinations.map(destination => {
        return destination[property]
      })
      return destinationDisplayInfo
    }
}

export default Traveler;
