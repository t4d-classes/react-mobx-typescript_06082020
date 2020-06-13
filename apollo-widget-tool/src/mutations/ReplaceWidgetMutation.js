import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const REPLACE_WIDGET_MUTATION = gql`
  mutation ReplaceWidget($widget: ReplaceWidget) {
    replaceWidget(widget: $widget) {
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

export const withReplaceWidgetMutation = graphql(REPLACE_WIDGET_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    onSaveWidget: widget => mutate({
      variables: { widget },
      refetchQueries: ownProps.refetchQueries,
      update: (store) => {
        store.writeQuery({
          query: gql`query EditWidgetIdQuery { editWidgetId @client }`,
          data: { editWidgetId: '-1' },
        });
      },
    }),
  }),
});
