import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { WidgetForm } from '../components';

export const INSERT_WIDGET_MUTATION = gql`
  mutation InsertWidget($widget: InsertWidget) {
    insertWidget(widget: $widget) {
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

export const InsertWidgetMutation = ({ refetchQueries }) => {
  return <Mutation mutation={INSERT_WIDGET_MUTATION}>
    {mutateInsertWidget => {
      const insertWidget = widget => {
        return mutateInsertWidget({
          variables: { widget },
          refetchQueries,
        });
      };
      return <WidgetForm buttonText="Add Widget" onSubmitWidget={insertWidget} />;
    }}
  </Mutation>;
};

InsertWidgetMutation.propTypes = {
  refetchQueries: PropTypes.array.isRequired,
};
