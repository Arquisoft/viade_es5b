import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Panel from '../front-end/components/authentication/utils/panel/panel.component'

afterAll(cleanup)

const { container } = render(<Panel />)

describe('Panel', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy()
  })
})
