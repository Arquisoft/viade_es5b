import React from 'react';
import ProviderItem from './provider.item.component';
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

it('ProviderItem', () => {

  const data = {
    label: 'Inrupt',
    image: '/img/inrupt.svg',
    value: 'https://inrupt.net/auth',
    registerLink: 'https://inrupt.net/register',
    description: 'Lorem ipsum dolor sit amet non ipsom dolor'
  };

  act(() => {
    ReactDOM.render(<ProviderItem data={data} />, container);
  });

  expect(container).toBeTruthy();

  expect(container.querySelector('.label')).toBeTruthy();
  const label = container.querySelector('.label');
    expect(label).toHaveTextContent('Inrupt');
});
