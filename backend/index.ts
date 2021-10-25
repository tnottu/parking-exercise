const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const cors = require('cors');
const http = require('http');
const carParksSchema = require('./schemas/carParks');
const PORT = process.env.PORT || 4000;

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors());
  app.use(express.static('./static'));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({
      req,
    }),
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  console.log(`📚 API ready at http://localhost:${PORT}${server.graphqlPath}`);

  return { server, app };
}

startApolloServer(carParksSchema.typeDefs, carParksSchema.resolvers);
