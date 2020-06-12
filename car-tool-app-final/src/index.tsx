import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';

import { CarToolContainer } from './containers/CarToolContainer';
import { CarToolStore } from './stores/CarToolStore';
import { CarsService } from './services/CarsService';

import 'mobx-react-lite/batchingForReactDom';

configure({ enforceActions: 'always' });

ReactDOM.render(
  <CarToolContainer store={new CarToolStore(new CarsService('http://localhost:3060'))} />,
  document.querySelector('#root'),    
);

