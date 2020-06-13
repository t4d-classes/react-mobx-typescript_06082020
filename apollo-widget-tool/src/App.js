import * as React from 'react';

import { WidgetTableContainer } from './components';
import { ToolNameQuery, WIDGETS_QUERY } from './queries';
import { InsertWidgetMutation } from './mutations';
import { WidgetInsertedSubscription, WidgetDeletedSubscription } from './subscriptions';

export class App extends React.Component {

  render() {

    const refetchQueries = [{ query: WIDGETS_QUERY }];

    return <React.Fragment>
      <WidgetInsertedSubscription refetchQueries={refetchQueries} />
      <WidgetDeletedSubscription refetchQueries={refetchQueries} />
      <ToolNameQuery />
      <WidgetTableContainer refetchQueries={[{ query: WIDGETS_QUERY }]} />
      <InsertWidgetMutation refetchQueries={refetchQueries} />
    </React.Fragment>;
  }
}
