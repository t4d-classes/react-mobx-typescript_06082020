import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { demoComponents } from '../models/demoComponents';
import { useComponentsToRun } from '../shared/useComponentsToRun';
import { Message } from '../shared/misc';

export const pageTitle = 'Demo';

const header = (message) => `\n<-----{ ${message} }----->\n\n`;

const showComponentTypesBeingRendered = (componentToRunHelpers) => {
  if (componentToRunHelpers.showBothComps())
    return header('Rendering both Class and Hook Components');
  if (componentToRunHelpers.showClassComp())
    return header('Rendering only Class Component');
  if (componentToRunHelpers.showHookComp())
    return header('Rendering only Hook Component');
};

const Demos = ({ match: { url } }) => {
  const firstPathSegment = '/' + url.slice(1).split('/')[0];

  const [componentToRunHelpers, ComponentToRunFieldSet] = useComponentsToRun();

  console.log(showComponentTypesBeingRendered(componentToRunHelpers));

  return (
    <div className="demos-page">
      <Switch>
        {demoComponents.map(
          ({ id, path, component: DemoComponent, showComponentToRun }) => (
            <Route key={id} path={`${firstPathSegment}${path}`}>
              <DemoComponent componentToRunHelpers={componentToRunHelpers}>
                <>
                  {showComponentToRun && <ComponentToRunFieldSet />}
                  <Message />
                </>
              </DemoComponent>
            </Route>
          ),
        )}
      </Switch>
    </div>
  );
};

export default Demos;
