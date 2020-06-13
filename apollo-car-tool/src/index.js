import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

import './index.css';

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010;

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
});

const client = new ApolloClient({
  link, cache,
  connectToDevTools: true,
  resolvers: {
    Mutation: {
      setEditCarId: (_, { carId }, { cache }) => {
        cache.writeData({
          data: {
            editCarId: carId,
          }
        });
      },
    },
  },
});

cache.writeData({
  data: {
    headerText: 'Car Tool',
    editCarId: '-1',
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
