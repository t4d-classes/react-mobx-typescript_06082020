import React, { FC, useState } from 'react';
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
  add(val: number) {
    this.result += val;
  }

  @action.bound
  subtract(val: number) {
    this.result -= val;
  }

  @action.bound
  multiply(val: number) {
    this.result *= val;
  }

  @action.bound
  divide(val: number) {
    this.result /= val;
  }
}


interface CalcToolProps {
  store: CalcToolStore;
}

const CalcTool: FC<CalcToolProps> = ({ store }) => {

  const [ num, setNum ] = useState(0);

  return useObserver(() => (
    <form>
      <div>Result: {store.result}</div>
      <div>
        Num: <input type="number" value={num} onChange={e => setNum(Number(e.target.value))} />
      </div>
      <div>
        <button type="button" onClick={() => store.add(num)}>Add</button>
        <button type="button" onClick={() => store.subtract(num)}>Subtract</button>
        <button type="button" onClick={() => store.multiply(num)}>Multiply</button>
        <button type="button" onClick={() => store.divide(num)}>Divide</button>
      </div>
    </form>
  ));

};

const store = new CalcToolStore();

ReactDOM.render(
  <CalcTool store={store} />,
  document.querySelector('#bob'),
);

