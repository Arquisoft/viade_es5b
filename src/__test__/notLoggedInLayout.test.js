import React from 'react'
import NotLoggedInLayout from '../front-end/layouts/NotLoggedInLayout/not-logged-in.layout'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import LogInComponent from '../front-end/components/authentication/login/Login'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('NotLoggedInLayout', () => {
  act(() => {
    ReactDOM.render(<Router><NotLoggedInLayout
      exact
      path='/login'
      component={LogInComponent}
                            />
    </Router>, container)
  })

  expect(container).toBeTruthy()
})
