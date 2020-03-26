import React from 'react';
import { render,cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import AuthNavBar from '../front-end/components/AuthNavBar/auth-nav-bar.component';

describe.only('AuthNavBar', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <AuthNavBar/>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
