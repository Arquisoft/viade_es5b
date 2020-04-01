import React from 'react'
import { Route } from 'react-router-dom'
import AuthNavBar from '../../components/AuthNavBar/auth-nav-bar.component'
import NavBar from '../../components/NavBar/nav-bar.component'
import { useWebId } from '@inrupt/solid-react-components'

const PrivateLayout = props => {
  const webId = useWebId()
  const { component: Component, service, ...rest } = props
  return (
    <Route
      {...rest}
      component={({ history, location, match, service }) => (
        <div>
          {webId ? (
            <div>
              <AuthNavBar {...{ history, location, match, webId }} />
              <Component {...{ history, location, match, service }} />
            </div>
          ) : (
            <div>
              <NavBar
                {...{ history, location, match }}
              />
              <h1>Usuario no autenticado no puede acceder a este URL, identifíquese</h1>
            </div>
          )}
        </div>
      )}
    />
  )
}

export default PrivateLayout
