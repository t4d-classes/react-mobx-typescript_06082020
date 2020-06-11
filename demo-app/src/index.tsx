import React, { FC, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { observable, action, computed, configure, isObservableArray, runInAction } from 'mobx';
import { useObserver } from 'mobx-react-lite';

import { RestHistoryEntry } from './models/RestHistoryEntry';
import { HistoryService } from './services/HistoryService';

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

  constructor(private _historySvc: HistoryService) { }

  @observable
  private _history: HistoryEntry[] = [];

  @computed
  get result() {
    return this._history.reduce( (acc, entry) => {
      switch (entry.opName) {
        case '+':
          return acc + entry.opValue;
        case '-':
          return acc - entry.opValue;
        case '*':
          return acc * entry.opValue;
        case '/':
          return acc / entry.opValue;
        default:
          return acc;
      }
    }, 0);
  }

  @computed
  get nextId() {
    return Math.max(...this._history.map(e => e.opId) as [], 0) + 1;
  }  

  // reference this like a data property - NOT CALL IT LIKE FUNCTION
  @computed
  get history() {
    return this._history.slice();
  }

  @computed
  get counts() {

    console.log('ran counts');

    const opCounts = {
      addCount: 0,
      subtractCount: 0,
      multiplyCount: 0,
      divideCount: 0,
    };

    return this._history.reduce( (acc, entry) => {
      switch (entry.opName) {
        case '+':
          acc.addCount++;
          break;
        case '-':
          acc.subtractCount++;
          break;
        case '*':
          acc.multiplyCount++;
          break;
        case '/':
          acc.divideCount++;
          break;
      }

      return acc;
    }, opCounts);

  }

  @computed
  get addCount() {
    console.log('ran add counts');
    return this.counts.addCount;
  }

  @computed
  get subtractCount() {
    console.log('ran subtract counts');
    return this.counts.subtractCount;
  }

  @computed
  get multiplyCount() {
    console.log('ran multiply counts');
    return this.counts.multiplyCount;
  }

  @computed
  get divideCount() {
    console.log('ran divide counts');
    return this.counts.divideCount;
  }

  async appendToHistory(opName: string, opValue: number) {
    await this._historySvc
      .appendHistoryEntry({ name: opName, value: opValue });

    return this.refreshHistory();
  }

  @action.bound
  async refreshHistory() {

    const history = await this._historySvc.allHistory();

    runInAction(() => {
      if (!isObservableArray(this._history)) {
        throw Error('history should be observable');
      }

      this._history.replace(history.map(entry => ({
        opId: entry.id,
        opName: entry.name,
        opValue: entry.value,
      })));
    });

  }

  @action.bound
  add(val: number) {
    this.appendToHistory('+', val);
  }

  @action.bound
  subtract(val: number) {
    this.appendToHistory('-', val);
  }

  @action.bound
  multiply(val: number) {
    this.appendToHistory('*', val);
  }

  @action.bound
  divide(val: number) {
    this.appendToHistory('/', val);
  }

  @action.bound
  clear() {

    if (!isObservableArray(this._history)) {
      throw Error('history is not observable');
    }

    this._history.replace([]);
  }

  @action.bound
  async deleteEntry(entryId: number) {
    // const entryIndex = this._history.findIndex(e => e.opId === entryId);
    // this._history.splice(entryIndex, 1);

    await this._historySvc.removeHistoryEntry(entryId);

    return this.refreshHistory();
  }
}


interface CalcToolProps {
  result: number;
  history: HistoryEntry[];
  addCount: number;
  subtractCount: number;
  multiplyCount: number;
  divideCount: number;
  onAdd: (val: number) => void;
  onSubtract: (val: number) => void;
  onMultiply: (val: number) => void;
  onDivide: (val: number) => void;
  onClear: () => void;
  onDeleteEntry: (entryId: number) => void;
}


const CalcTool: FC<CalcToolProps> = ({
  result, history, addCount, subtractCount, multiplyCount, divideCount,
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
      <table>
        <caption>Operation Count</caption>
        <thead>
          <tr>
            <th>Add</th>
            <th>Subtract</th>
            <th>Multiply</th>
            <th>Divide</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{addCount}</td>
            <td>{subtractCount}</td>
            <td>{multiplyCount}</td>
            <td>{divideCount}</td>
          </tr>
        </tbody>
      </table>
    </form>
  );

};

interface CalcToolContainerProps {
  store: CalcToolStore;
}

const CalcToolContainer: FC<CalcToolContainerProps> = ({ store }) => {

  useEffect(() => {

    store.refreshHistory();

  }, [ store ]);

  return useObserver(() => {

    const calcToolProps: CalcToolProps = {
      result: store.result,
      history: store.history,
      addCount: store.addCount,
      subtractCount: store.subtractCount,
      multiplyCount: store.multiplyCount,
      divideCount: store.divideCount,
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

const store = new CalcToolStore(new HistoryService('http://localhost:3060'));

ReactDOM.render(
  <CalcToolContainer store={store} />,
  document.querySelector('#bob'),
);

