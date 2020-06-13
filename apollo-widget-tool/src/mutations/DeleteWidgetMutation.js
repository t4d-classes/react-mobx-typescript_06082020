import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const DELETE_WIDGET_MUTATION = gql`
mutation DeleteWidget($widgetId: ID) {
  deleteWidget(widgetId: $widgetId) {
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

export const withDeleteWidgetMutation = graphql(DELETE_WIDGET_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    onDeleteWidget: widgetId => mutate({
      variables: { widgetId },
      refetchQueries: ownProps.refetchQueries,
    }),
  }),
});
