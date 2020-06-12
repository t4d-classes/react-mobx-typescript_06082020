import React, { Suspense } from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { SiteLayout, PageLayout } from './shared';

export const App = () => {

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      <Route path="*" render={(props) => {

          const pageName = props.location.pathname.slice(1).split('/')[0];

          const Page = React.lazy(
            () => import(`./pages/${pageName}`).then(PageModule => ({
              default: () => <PageLayout pageTitle={PageModule.pageTitle}>
                {React.createElement(PageModule.default, props)}
              </PageLayout>
            })),
          );

          return (
            <SiteLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Page />
              </Suspense>
            </SiteLayout>
          );

        }} />
    </Switch>
  );
}

export default App;
