const { gql } = require('apollo-server-express');
const oukaMiddleman = require('../services/ouka-middleman')

const _carParksMockData = [
  {
    carParkId: '3d599470',
    name: 'Testiparkki',
    maxCapacity: 100,
    spacesAvailable: 65,
    realtime: false,
    pricing: null,
    lon: 0,
    lat: 0,
  },
  {
    carParkId: '570as345',
    name: 'Parkkitesti',
    maxCapacity: 154,
    spacesAvailable: 21,
    realtime: false,
    pricing: null,
    lon: 0,
    lat: 0,
  },
]

const typeDefs = gql`
  type CarPark {
    carParkId: String
    name: String!
    maxCapacity: Int
    spacesAvailable: Int
    realtime: Boolean
    pricing: [CarParkPriceListItem]
    testKey: String!
    lon: Float
    lat: Float
  }

  type CarParkPriceListItem {
    title: LocalizedString!
    value: LocalizedString!
  }

  type LocalizedString {
    fi: String
    sv: String
    en: String
  }

  type Query {
    carParks: [CarPark!]!
    findCarPark(id: ID!): CarPark
  }
`

const resolvers = {
  Query: {
    carParks: async (_parent:any, _args:any, _context:any) => {
      const response = await oukaMiddleman.query(_context.req)
      // return _carParksMockData
      return response.data.carParks
    },
  }
}

module.exports = {
  typeDefs,
  resolvers,
}
