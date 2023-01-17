import chai from 'chai';
const expect = chai.expect;
import TravelerRepository from '../src/TravelerRepository'

describe('TravelerRepository', () => {
  let travelerRepository, travelersData;

  beforeEach(() => {
    travelersData = {
      travelers: [
        {
          id: 1,
          name: "Ham Leadbeater",
          travelerType: "relaxer"
          },
          {
          id: 2,
          name: "Rachael Vaughten",
          travelerType: "thrill-seeker"
          },
          {
          id: 3,
          name: "Sibby Dawidowitsch",
          travelerType: "shopper"
          },
          {
          id: 4,
          name: "Leila Thebeaud",
          travelerType: "photographer"
          },
          {
          id: 5,
          name: "Tiffy Grout",
          travelerType: "thrill-seeker"
          },
      ]
    }

    travelerRepository = new TravelerRepository(travelersData)
  })

  it('should be a function', function () {
    expect(TravelerRepository).to.be.a('function')
  })
  
  it('should instantiate a new traveler repository', function () {
    expect(travelerRepository.data).to.deep.equal(travelersData)
  })

  it('should take in traveler data', function () {
    expect(travelerRepository.data.travelers[0]).to.deep.equal(
      {
        id: 1,
        name: "Ham Leadbeater",
        travelerType: "relaxer"
        }
    )
  })

  it('should supply traveler data when given an id', function () {
    expect(travelerRepository.getData(travelerRepository.data.travelers[1].id)).to.deep.equal(
      {
          id: 2,
          name: "Rachael Vaughten",
          travelerType: "thrill-seeker"
          }
    )
  })
})