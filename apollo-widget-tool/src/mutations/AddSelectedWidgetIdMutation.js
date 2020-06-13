import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const ADD_SELECTED_WIDGET_ID_MUTATION = gql`
  mutation AddSelectedWidgetId($widgetId: ID) {
    addSelectedWidgetId(widgetId: $widgetId) @client
  }
`;

export const withAddSelectedWidgetIdMutation = graphql(ADD_SELECTED_WIDGET_ID_MUTATION, {
  props: ({ mutate }) => ({
    onAddSelectedWidgetId: widgetId =>
      mutate({ variables: { widgetId } })
  }),
});
