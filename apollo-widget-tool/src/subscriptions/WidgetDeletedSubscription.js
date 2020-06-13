import React from 'react';
import gql from 'graphql-tag';

import { SubscriptionInfoNotification } from './SubscriptionInfoNotification';

export const WIDGET_DELETED_SUBSCRIPTION = gql`
  subscription WidgetDeleted {
    widgetDeleted {
      id
      name
    }
  }
`;

export const WidgetDeletedSubscription = props => {
  return <SubscriptionInfoNotification subscription={WIDGET_DELETED_SUBSCRIPTION} {...props}>
    {({ widgetDeleted: { name } }) => <span>A widget named {name} was deleted!</span>}
  </SubscriptionInfoNotification>;
};
