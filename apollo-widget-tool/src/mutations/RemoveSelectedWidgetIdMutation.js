import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const REMOVE_SELECTED_WIDGET_ID_MUTATION = gql`
  mutation RemoveSelectedWidgetId($widgetId: ID) {
    removeSelectedWidgetId(widgetId: $widgetId) @client
  }
`;

export const withRemoveSelectedWidgetIdMutation = graphql(REMOVE_SELECTED_WIDGET_ID_MUTATION, {
  props: ({ mutate }) => ({
    onRemoveSelectedWidgetId: widgetId =>
      mutate({ variables: { widgetId } })
  }),
});
