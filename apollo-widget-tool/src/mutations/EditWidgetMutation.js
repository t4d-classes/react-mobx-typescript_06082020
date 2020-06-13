import React from 'react';
import gql from 'graphql-tag';


export const withEditWidgetMutation = TheComponent => {

  return props => {

    const editWidget = widgetId => {
      props.client.writeQuery({
        query: gql`query EditWidgetId { editWidgetId @client }`,
        data: { editWidgetId: widgetId },
      });
    };

    const cancelWidget = () => editWidget('-1');

    return <TheComponent {...props} onEditWidget={editWidget} onCancelWidget={cancelWidget} />;

  };
};

