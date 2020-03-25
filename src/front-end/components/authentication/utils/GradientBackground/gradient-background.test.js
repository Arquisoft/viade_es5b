import React from 'react';
import { render,cleanup } from "@testing-library/react";
import GradientBackground from './gradient-background.component';

afterAll(cleanup);

const { container } = render(<GradientBackground />);

describe('GradientBackground', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
