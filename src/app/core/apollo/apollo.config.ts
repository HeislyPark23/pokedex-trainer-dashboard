import {
  ApolloClientOptions,
  InMemoryCache,
} from '@apollo/client/core';

export function createApollo(): ApolloClientOptions<unknown> {
  return {
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    cache: new InMemoryCache(),
  };
}