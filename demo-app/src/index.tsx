import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { observable, action, computed, configure, autorun, isObservableArray } from 'mobx';
import { useObserver } from 'mobx-react-lite';

import 'mobx-react-lite/batchingForReactDom';

// the state can only be mutated from actions
configure({ enforceActions: 'always' });

// place below the class
// decorate(CalcToolStore, {
//   result: observable,
//   increment: action.bound
// });

type HistoryEntry = {
  opId: number;
  opName: string;
  opValue: number;
}

class CalcToolStore {

  @observable
  result = 0;

  @observable
  private _history: HistoryEntry[] = [];

  @computed
  get nextId() {
    return Math.max(...this._history.map(e => e.opId) as [], 0) + 1;
  }  

  // reference this like a data property - NOT CALL IT LIKE FUNCTION
  @computed
  get history() {
    return this._history.slice();
  }

  appendToHistory(opName: string, opValue: number) {
    this._history.push({
      opId: this.nextId,
      opName,
      opValue,
    });
  }

  @action.bound
  add(val: number) {
    this.result += val;
    this.appendToHistory('+', val);
  }

  @action.bound
  subtract(val: number) {
    this.result -= val;
    this.appendToHistory('-', val);
  }

  @action.bound
  multiply(val: number) {
    this.result *= val;
    this.appendToHistory('*', val);
  }

  @action.bound
  divide(val: number) {
    this.result /= val;
    this.appendToHistory('/', val);
  }

  @action.bound
  clear() {

    if (!isObservableArray(this._history)) {
      throw Error('history is not observable');
    }

    this.result = 0;
    this._history.replace([]);

  }

  @action.bound
  deleteEntry(entryId: number) {
    const entryIndex = this._history.findIndex(e => e.opId === entryId);
    this._history.splice(entryIndex, 1);
  }
}


interface CalcToolProps {
  result: number;
  history: HistoryEntry[];
  onAdd: (val: number) => void;
  onSubtract: (val: number) => void;
  onMultiply: (val: number) => void;
  onDivide: (val: number) => void;
  onClear: () => void;
  onDeleteEntry: (entryId: number) => void;
}


const CalcTool: FC<CalcToolProps> = ({
  result, history,
  onAdd: add, onSubtract: subtract,
  onMultiply: multiply, onDivide: divide,
  onClear: clear, onDeleteEntry: deleteEntry,
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
        <button type="button" onClick={resetFormWrapperFn(() => clear())}>Clear</button>
      </div>
      <ul>
        {history.map(entry => <li key={entry.opId}>
          {entry.opName} {entry.opValue}
          <button type="button" onClick={() => deleteEntry(entry.opId)}>
            X
          </button>
        </li>)}
      </ul>
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
      history: store.history,
      onAdd: store.add,
      onSubtract: store.subtract,
      onMultiply: store.multiply,
      onDivide: store.divide,
      onClear: store.clear,
      onDeleteEntry: store.deleteEntry,
    };

    return <CalcTool {...calcToolProps} />;

  });


};

const store = new CalcToolStore();

ReactDOM.render(
  <CalcToolContainer store={store} />,
  document.querySelector('#bob'),
);


// const o = observable({
//   items: [1,2,3],
// });

// autorun(() => {
//   console.log(o.items.slice());
// });

// const newItems = o.items.concat(4);

// if (isObservableArray(o.items)) {
//   o.items.replace(newItems);
// }

// o.items = newItems;
