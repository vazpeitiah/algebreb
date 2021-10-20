import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import authService from '../services/auth.service'

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: null, 
      currentUser: { username: "" }
    }
  }

  componentDidMount() {
    const currentUser = authService.getCurrentUser()
    if(!currentUser) {
      this.setState({ redirect: "/signin" })
    }else{
      this.setState({ currentUser: currentUser})
    }
  }
  
  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        <h1>Bienvenido {currentUser.name}</h1>
        Tu eres un usuario de tipo: {currentUser.roles}
      </div>
    )
  }
}