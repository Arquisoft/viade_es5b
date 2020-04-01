import auth from 'solid-auth-client'
import React, { Component } from 'react'

class BtLogout extends Component {
  render () {
    const logout = () => {
      auth.logout()
      this.props.handleLogOut()
      // window.location = "/login";
    }

    return (
      <button onClick={logout}>Log Out</button>
    )
  }
};

export default BtLogout
