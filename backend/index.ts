import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import cors from 'cors';
import http from 'http';
import carParksSchema from './schemas/carParks';
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

void startApolloServer(carParksSchema.typeDefs, carParksSchema.resolvers);
