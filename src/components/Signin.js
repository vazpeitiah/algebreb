import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/auth.service'

export default class Signin extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  async handleLogin(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }

    const auth = await authService.signin(user)

    if(auth.success){
      this.props.history.push("/profile");
      window.location.reload();
      
    } else {
      this.setState({
        message: auth.message
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={this.handleLogin}>
          <div className="mb-3">
            <label htmlFor="user_id" className="form-label">Correo electrónico o nombre de usuario</label>
            <input type="text"
              className="form-control"
              placeholder="Email o usuario"
              id="user_id"
              required
              onChange={this.onChangeUsername} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password"
              className="form-control"
              placeholder="Contraseña"
              id="password"
              required
              onChange={this.onChangePassword} />
          </div>
          <div className="form-group mb-3">
          <Link to='/signup'>Registrarse</Link>
            {/* <Link className="m-3" to='/resetpwd'>Recuperar contraseña</Link> */}
            
          </div>
          <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          {this.state.message && (
            <div className="form-group mt-2">
              <div className="alert alert-danger" role="alert">
                {this.state.message}
              </div>
            </div>
          )}
        </form>
      </div>
    )
  }
}