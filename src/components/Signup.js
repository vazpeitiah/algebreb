import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/auth.service';

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      username: "",
      password: "",
      password2: "",
      role: "alumno",
      message: ""
    };
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault()

    if (this.state.password === this.state.password2) {
      const newUser = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        roles: [this.state.role]
      }

      const auth = await authService.signup(newUser)

      if (auth.success) {
        this.props.history.push("/profile");
        window.location.reload();

      } else {
        this.setState({
          message: auth.message
        });
      }
    } else {
      this.setState({
        message: "Las contraseñas no coinciden"
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Registrarse</h1>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label for="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              name="email"
              required
              onChange={this.onInputChange} />
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del usuario"
              name="name"
              required
              onChange={this.onInputChange} />
          </div>
          <div className="mb-3">
            <label for="username" className="form-label">Username o nickname</label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              name="username"
              required
              onChange={this.onInputChange} />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="password"
              required
              onChange={this.onInputChange} />
          </div>
          <div className="form-group mb-3">
            <label for="password2" className="form-label">Confirmar contreaseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirme su contraseña"
              name="password2"
              required
              onChange={this.onInputChange} />
          </div>

          <div className="mb-3">
            <label for="role" className="form-label">Tipo de usuario</label>
            <select name="role" 
                    id="role" 
                    className='form-select'
                    onChange={this.onInputChange}
                    required>
              <option value="alumno">Alumno</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <Link to='/signin'>¿Ya tienes una cuenta?</Link>
          </div>

          <button type="submit" className="btn btn-primary">Registrarse</button>
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