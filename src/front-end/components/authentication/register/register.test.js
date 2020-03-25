import React from 'react';
import { render,cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import { RegisterComponent } from './RegisterComponente';
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

it('Register', () => {
  //afterAll(cleanup);

  act(() => {
    ReactDOM.render(<Router>
      <RegisterComponent providers={[]} />
    </Router>, container);
  });

  expect(container).toBeTruthy();

  expect(container.querySelector('.register-wrapper')).toBeTruthy();
  expect(container.querySelector('.panel-header')).toBeTruthy();
  expect(container.querySelector('.register-panel')).toBeTruthy();
  expect(container.querySelector('.panel-body')).toBeTruthy();
  expect(container.querySelector('.actions')).toBeTruthy();

  expect(container.querySelector('.title')).toBeTruthy();

 /* const { container, getByTestId } = render(
    <Router>
      <RegisterComponent t={key => key} providers={[]} />
    </Router>
  );*/

  /*test('renders without crashing', () => {
    
  });

  test('renders with styled components', () => {
    
  });

  test('renders title properly', () => {
    
  });*/
});
