import React, { Component } from 'react'
import authService from '../services/auth.service'

export default class HomePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentUser: undefined
    }
  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser()
    if(currentUser)
      this.setState({ currentUser: currentUser})
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        {currentUser ? (
          <h1>Página de bienvenida para usuarios que iniciario sesion</h1>
        ) : (
          <h1>Página de bienvenida</h1>
        )}
      </div>
    )
  }
}