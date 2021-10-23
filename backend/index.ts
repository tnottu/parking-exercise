const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { gql } = require('apollo-server-express');
const oukaMiddleman = require('./services/ouka-middleman')

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

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors({
    origin: true,
    credentials: true,
  }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }:any) => ({
      req,
    })
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  return { server, app };
}

startApolloServer(typeDefs, resolvers)
