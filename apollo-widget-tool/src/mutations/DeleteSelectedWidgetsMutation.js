import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const DELETE_SELECTED_WIDGETS_MUTATION = gql`
  mutation DeleteSelectedWidgetsMutation($widgetIds: [ID]) {
    deleteWidgets(widgetIds: $widgetIds) {
      id
    }
  }
`;

export const withDeleteSelectedWidgetsMutation = graphql(DELETE_SELECTED_WIDGETS_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    onDeleteSelectedWidgets: widgetIds =>
      mutate({
        variables: { widgetIds },
        refetchQueries: ownProps.refetchQueries,
        update: (store) => {
          store.writeQuery({
            query: gql`query SelectedWidgetIdsQuery { selectedWidgetIds @client }`,
            data: { selectedWidgetIds: [] },
          });
        },
      }),
  }),
});
