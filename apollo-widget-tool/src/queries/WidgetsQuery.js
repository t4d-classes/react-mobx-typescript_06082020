import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const WIDGETS_QUERY = gql`
  query WidgetsQuery {
    widgets {
      id
      name
      description
      color
      size
      price
      quantity
    }
  }
`;

export const withWidgetsQuery = graphql(WIDGETS_QUERY, {
  props: ({ data }) => ({
    loading: data.loading,
    error: data.error,
    widgets: data.widgets,
  }),
});
