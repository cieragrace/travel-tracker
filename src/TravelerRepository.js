class TravelerRepository {
  constructor(data) {
    this.data = data
  }

  getData(travelerID) {
    return this.data.travelers.find(currentUser => currentUser.id === travelerID)
  }
}

export default TravelerRepository;