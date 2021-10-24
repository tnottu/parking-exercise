const { gql } = require('apollo-server-express');
const oukaMiddleman = require('../services/ouka-middleman')

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
  }
`

const resolvers = {
  Query: {
    carParks: async (_parent, _args, context) => {
      const response = await oukaMiddleman.query(context.req)
      return response.data.carParks
    },
  }
}

module.exports = {
  typeDefs,
  resolvers,
}
