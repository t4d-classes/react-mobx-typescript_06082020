import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

import { split, ApolloLink, } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { withClientState } from 'apollo-link-state';
import gql from 'graphql-tag';

import './index.css';

const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010;

const cache = new InMemoryCache();

const updateSelectedWidgetId = selectedWidgetIdFn => (_1, { widgetId }, { cache }) => {

  const SELECTED_WIDGET_IDS_QUERY = gql`
    query SelectedWidgetIdsQuery {
      selectedWidgetIds
    }
  `;

  const query = cache.readQuery({ query: SELECTED_WIDGET_IDS_QUERY  });
  const data = { ...query, selectedWidgetIds: selectedWidgetIdFn(query.selectedWidgetIds, widgetId) };
  cache.writeQuery({ query: SELECTED_WIDGET_IDS_QUERY, data });
};

const clientStateLink = withClientState({
  cache,
  defaults: {
    toolName: 'Widget Tool',
    editWidgetId: '-1',
    selectedWidgetIds: [],
  },
  resolvers: {
    Mutation: {
      addSelectedWidgetId: updateSelectedWidgetId(
        (selectedWidgetIds, widgetId) => selectedWidgetIds.concat(widgetId)
      ),
      removeSelectedWidgetId: updateSelectedWidgetId(
        (selectedWidgetIds, widgetId) => selectedWidgetIds.filter(wId => wId !== widgetId)
      ),
    },
  },
});

const httpLink = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
});

const webSocketLink = new WebSocketLink({
  uri: `ws://localhost:${GRAPHQL_PORT}/graphql`,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  webSocketLink,
  ApolloLink.from([clientStateLink, httpLink]),
);

const client = new ApolloClient({
  link, cache, connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
