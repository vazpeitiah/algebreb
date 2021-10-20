import React, { Component } from 'react'

export default class ResetPassword extends Component {
  render() {
    return (
      <div className="container">
        <h1>Recuperar contraseña</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" placeholder="Email" id="email" required />
            <div id="emailHelp" class="form-text">Se enviará un email para recuperar la contraseña</div>
          </div>
          
          <button type="submit" className="btn btn-primary">Enviar email</button>
        </form>
      </div>
    )
  }
}