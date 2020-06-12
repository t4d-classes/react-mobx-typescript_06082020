import React from 'react';
import { Link } from 'react-router-dom';

import './home.css';
import { demoComponents } from '../models/demoComponents';

export const pageTitle = 'Home';

const Home = () => {
  return (
    <div className="home-page">
      <ul>
        {demoComponents.map((demoComponent) => (
          <li key={demoComponent.id}>
            <Link to={'/demos' + demoComponent.path}>
              {demoComponent.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
