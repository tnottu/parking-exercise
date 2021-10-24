const gqlTag = require('graphql-tag');
const nodeFetch = require('node-fetch-commonjs');
const { ApolloClient } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { ValidationError, ApolloError } = require('apollo-server-errors');

class MiddleManError extends ApolloError {
  constructor(message: string) {
    super(message, 'APOLLO_MIDDLEMAN_ERROR')
    Object.defineProperty(this, 'name', { value: 'MiddleManError' })
  }
}

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.oulunliikenne.fi/proxy/graphql',
    fetch: nodeFetch,
  }),
  cache: new InMemoryCache(),
});

const query = async (req) => {
  if (!req.body || !req.body.query) {
    throw new ValidationError('Request does not contain a query')
  }

  const query = gqlTag(req.body.query);

  try {
    const result = await client.query({
      query,
    });
    return result
  } catch (err) {
    throw new MiddleManError('Query failed')
  }
};

module.exports = {
  query,
}
