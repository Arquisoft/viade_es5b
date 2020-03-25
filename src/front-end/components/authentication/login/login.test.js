import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './Login';
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

it('Login', () => {
  act(() => {
    ReactDOM.render(<Router>
      <LoginComponent />
    </Router>, container);
  });

  expect(container).toBeTruthy();

  expect(container.querySelector('.login-panel')).toBeTruthy();
  expect(container.querySelector('.panel-body')).toBeTruthy();

  expect(container.querySelector('h1')).toBeTruthy();

  expect(container.querySelector('.solid-provider-login-component')).toBeTruthy();
});
