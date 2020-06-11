import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { observable, action, decorate, configure } from 'mobx';
import { useObserver } from 'mobx-react-lite';

import 'mobx-react-lite/batchingForReactDom';

// the state can only be mutated from actions
configure({ enforceActions: 'always' });

// place below the class
// decorate(CalcToolStore, {
//   result: observable,
//   increment: action.bound
// });


class CalcToolStore {

  @observable
  result = 0;

  @action.bound
  increment() {
    this.result++;
  }
}


interface CalcToolProps {
  store: CalcToolStore;
}

const CalcTool: FC<CalcToolProps> = ({ store }) => {

  return useObserver(() => (
    <form>
      <div>Result: {store.result}</div>
      <div>
        <button type="button" onClick={store.increment}>
          Increment
        </button>
      </div>
    </form>
  ));

};

const store = new CalcToolStore();

ReactDOM.render(
  <CalcTool store={store} />,
  document.querySelector('#bob'),
);

