import React from 'react';
import BtLogout from './Logout';
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

it('Logout', () => {
     act(() => {
        ReactDOM.render(<BtLogout />, container);
      });

    expect(container).toBeTruthy();

    expect(container.querySelector('button')).toBeTruthy();
});
