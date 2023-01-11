class Traveler {
  constructor(travelers, tripsData, destinationData) {
    this.travelers = travelers
    this.tripsData = tripsData
    this.destinationData = destinationData
  }

  findTravelersFlights() {
    return this.tripsData.trips.filter(trip => trip.userID === this.travelers.id)
  }

}

export default Traveler;


