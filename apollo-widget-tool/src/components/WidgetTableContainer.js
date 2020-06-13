import { withApollo } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { withWidgetsQuery, withLocalQuery } from '../queries';

import { 
  withReplaceWidgetMutation, withDeleteWidgetMutation, withDeleteSelectedWidgetsMutation,
  withAddSelectedWidgetIdMutation, withRemoveSelectedWidgetIdMutation, withEditWidgetMutation
} from '../mutations';

import { WidgetTable } from './WidgetTable';

export const WidgetTableContainer = compose([
  withApollo,
  withWidgetsQuery,
  withLocalQuery,
  withReplaceWidgetMutation,
  withDeleteWidgetMutation,
  withDeleteSelectedWidgetsMutation,
  withAddSelectedWidgetIdMutation,
  withRemoveSelectedWidgetIdMutation,
  withEditWidgetMutation,
])(WidgetTable);