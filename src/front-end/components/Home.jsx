import React, { Component } from 'react'
import HomeLogin from './authentication/login/HomeLogin'

class Home extends Component {
  render () {
    return (
      <div className='jumbotron'>
        <h1 className='display-3 text-center'>Bienvenido a Viade!</h1>
        <HomeLogin />
      </div>
    )
  }
}

export default Home
