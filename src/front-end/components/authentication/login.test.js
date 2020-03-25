import React from 'react';
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './Login';

describe('Login', () => {
  const { container, getByTestId } = render(
    <Router>
      <LoginComponent />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('renders title properly', () => {
    expect(getByTestId('title')).toBeTruthy();
  });

  test('renders ProviderLogin', () => {
    const providerLogin = document.querySelector('.solid-provider-login-component');
    expect(providerLogin).toBeTruthy();
  });
});
