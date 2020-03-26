import React from 'react';
import CenterContainer from '../front-end/components/authentication/utils/CenterContainer/center-container.component';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

it('CenterContainer', () => {
  act(() => {
    ReactDOM.render(<CenterContainer className="centerContainerWrapper"/>, container);
  });

  expect(container).toBeTruthy();

  expect(container.querySelector('.centerContainerWrapper')).toBeTruthy();

  expect(container.querySelector('div.wrapper')).toBeTruthy();
});
