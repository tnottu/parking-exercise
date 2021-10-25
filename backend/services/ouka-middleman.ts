import { gql } from 'apollo-server-express';
import fetch from 'cross-fetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ValidationError, ApolloError } from 'apollo-server-errors';

class MiddleManError extends ApolloError {
  constructor(message: string) {
    super(message, 'APOLLO_MIDDLEMAN_ERROR');
    Object.defineProperty(this, 'name', { value: 'MiddleManError' });
  }
}

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.oulunliikenne.fi/proxy/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});

const query = async (req) => {
  if (!req.body || !req.body.query) {
    throw new ValidationError('Request does not contain a query');
  }

  const query = gql(req.body.query);

  try {
    const result = await client.query({
      query,
    });
    return result;
  } catch (err) {
    throw new MiddleManError('Query failed');
  }
};

const exp = {
  query,
};

export default exp;
