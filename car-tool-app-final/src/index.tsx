import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';

import { CarToolContainer } from './containers/CarToolContainer';
import { CarToolStore } from './stores/CarToolStore';
import { CarsService } from './services/CarsService';
import { CarToolStoreContext } from './contexts';

import 'mobx-react-lite/batchingForReactDom';

configure({ enforceActions: 'always' });


const carToolStore = new CarToolStore(new CarsService('http://localhost:3060'));

ReactDOM.render(
  <CarToolStoreContext.Provider value={carToolStore}>
    <CarToolContainer />
  </CarToolStoreContext.Provider>,
  document.querySelector('#root'),    
);

