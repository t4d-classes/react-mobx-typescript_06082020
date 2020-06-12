import React, { useState, Fragment } from 'react';
import { useTriggerRender } from '../shared/useTriggerRender';

import './useComponentsToRun.css';

const componentToRunOptions = {
  CLASS_COMPONENT: 0,
  HOOK_COMPONENT: 1,
  BOTH_COMPONENTS: 2,
};

const componentToRunRadioInputs = [
  {
    id: 'class-component-radio',
    value: componentToRunOptions.CLASS_COMPONENT,
    label: 'Class Component',
  },
  { 
    id: 'hook-component-radio',
    value: componentToRunOptions.HOOK_COMPONENT,
    label: 'Hook Component',
  },
  {
    id: 'both-components-radio',
    value: componentToRunOptions.BOTH_COMPONENTS,
    label: 'Both Components',
  },
];

export const useComponentsToRun = () => {

  const [ componentToRun, setComponentToRun ] =
    useState(componentToRunOptions.BOTH_COMPONENTS);
  const triggerRender = useTriggerRender();


  const ComponentsToRunFieldSet = () =>
    <fieldset className="components-to-run-fieldset">
      <legend>
        Select Component(s) to Run
      </legend>
      {componentToRunRadioInputs.map(componentToRunOption => 
        <Fragment key={componentToRunOption.id}>
          <input type="radio" id={componentToRunOption.id}
            name="componentToRun" value={componentToRunOption.value}
            checked={componentToRun === componentToRunOption.value}
            onChange={
              ({ target: { value }}) => setComponentToRun(Number(value))
            } />
          <label htmlFor={componentToRunOption.id}>
            {componentToRunOption.label}
          </label>
        </Fragment>
      )}
      <div>
        <button type="button" onClick={triggerRender}>
          Trigger Manual Render
        </button>
      </div>
    </fieldset>;

  const componentToRunHelpers = {
    showClassComp: () =>
      [
        componentToRunOptions.CLASS_COMPONENT,
        componentToRunOptions.BOTH_COMPONENTS,
      ].includes(componentToRun),
    showHookComp: () =>
      [
        componentToRunOptions.HOOK_COMPONENT,
        componentToRunOptions.BOTH_COMPONENTS,
      ].includes(componentToRun),
    showBothComps: () =>
      componentToRun === componentToRunOptions.BOTH_COMPONENTS,
  };


  return [ componentToRunHelpers, ComponentsToRunFieldSet ]

};
