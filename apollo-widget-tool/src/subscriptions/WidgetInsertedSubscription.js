import React from 'react';
import gql from 'graphql-tag';

import { SubscriptionInfoNotification } from './SubscriptionInfoNotification';

export const WIDGET_INSERTED_SUBSCRIPTION = gql`
  subscription WidgetInserted {
    widgetInserted {
      id
      name
    }
  }
`;

export const WidgetInsertedSubscription = props => {
  return <SubscriptionInfoNotification subscription={WIDGET_INSERTED_SUBSCRIPTION} {...props}>
    {({ widgetInserted: { name } }) => <span>A widget named {name} was inserted!</span>}
  </SubscriptionInfoNotification>;
};
