import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const LOCAL_QUERY = gql`
  query LocalQuery {
    editWidgetId @client
    selectedWidgetIds @client
  }
`;

export const withLocalQuery = graphql(LOCAL_QUERY, {
  props: ({ data, ownProps }) => ({
    ...data,
    loading: data.loading || ownProps.loading
  }),
});

