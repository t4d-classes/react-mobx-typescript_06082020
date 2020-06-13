import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { ToolHeader } from '../components';

export const TOOL_NAME_QUERY = gql`
  query ToolNameQuery {
    toolName @client
  }
`;

export const ToolNameQuery = () =>
  <Query query={TOOL_NAME_QUERY}>
    {({ data, loading, error }) => {

      if (error) {
        console.error(error);
        return null;
      }

      if (loading) {
        return null;
      }

      return <ToolHeader headerText={data.toolName} />;

    }}

  </Query>;