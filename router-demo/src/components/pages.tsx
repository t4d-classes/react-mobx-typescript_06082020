import React from 'react';
import { Switch, Route, useHistory, useParams, useRouteMatch, Link } from 'react-router-dom';

import { useQueryString } from '../hooks/useQueryString';

import './pages.css';

const Home = () => <div>
  <h2>Home</h2>
</div>;

const About = () => {

  const history = useHistory();
  const params = useParams<{ id: string }>();

  const queryParams = useQueryString();

  return <div>
    <h2>About</h2>
    <button type="button" onClick={() => history.push('/')}>Go Home</button>
    <div>
      Id: {params.id}
    </div>
    <div>
      Page: {queryParams.get('page')}
    </div>
  </div>;
};

const Contact = () => {

  const routeMatch = useRouteMatch();

  return <div>
    <h2>Contact</h2>
    <ul>
      <li><Link to={routeMatch.path + '/form'}>Form</Link></li>
      <li><Link to={routeMatch.path + '/info'}>Info</Link></li>
      <li><Link to={routeMatch.path + '/map'}>Map</Link></li>
    </ul>
    <Switch>
      <Route path={routeMatch.path + '/form'}>
        <h3>Form</h3>
      </Route>
      <Route path={routeMatch.path + '/info'}>
        <h3>Info</h3>
      </Route>
      <Route path={routeMatch.path + '/map'}>
        <h3>Map</h3>
      </Route>
    </Switch>
  </div>;
};

export const Pages = () => {

  return <main className="pages">
    <Switch>
      <Route path="/" exact><Home /></Route>
      <Route path="/about/:id"><About /></Route>
      <Route path="/contact"><Contact /></Route>
    </Switch>
  </main>;

};