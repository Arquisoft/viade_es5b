import React from 'react';
import HomeMessageComponent from './HomeLogin';
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

it('HomeLogin', () => {
     act(() => {
        ReactDOM.render(<HomeMessageComponent />, container);
      });

    expect(container).toBeTruthy();

    expect(container.querySelector('h1')).toBeTruthy();
});
