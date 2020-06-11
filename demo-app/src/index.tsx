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
  result: number;
  onAdd: (val: number) => void;
  onSubtract: (val: number) => void;
  onMultiply: (val: number) => void;
  onDivide: (val: number) => void;
}


const CalcTool: FC<CalcToolProps> = ({
  result,
  onAdd: add, onSubtract: subtract,
  onMultiply: multiply, onDivide: divide,
 }) => {

  const [ num, setNum ] = useState(0);

  const resetFormWrapperFn = (fn: () => void) => {
    return () => {
      fn(); // unique part, each kind of operation
      setNum(0); // common, reset the form
    };
  }

  return (
    <form>
      <div>Result: {result}</div>
      <div>
        Num: <input type="number" value={num} onChange={e => setNum(Number(e.target.value))} />
      </div>
      <div>
        <button type="button" onClick={resetFormWrapperFn(() => add(num))}>Add</button>
        <button type="button" onClick={resetFormWrapperFn(() => subtract(num))}>Subtract</button>
        <button type="button" onClick={resetFormWrapperFn(() => multiply(num))}>Multiply</button>
        <button type="button" onClick={resetFormWrapperFn(() => divide(num))}>Divide</button>
      </div>
    </form>
  );

};

interface CalcToolContainerProps {
  store: CalcToolStore;
}

const CalcToolContainer: FC<CalcToolContainerProps> = ({ store }) => {

  return useObserver(() => {

    const calcToolProps: CalcToolProps = {
      result: store.result,
      onAdd: store.add,
      onSubtract: store.subtract,
      onMultiply: store.multiply,
      onDivide: store.divide,
    };

    return <CalcTool {...calcToolProps} />;

  });


};

const store = new CalcToolStore();

ReactDOM.render(
  <CalcToolContainer store={store} />,
  document.querySelector('#bob'),
);

