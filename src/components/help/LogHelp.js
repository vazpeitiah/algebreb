import React from "react";
import LogUp from "../../assets/help/logup.png";
import LogIn from "../../assets/help/login.png";

export const LogHelp = () => {
  return (
    <div>
      <h1 className="display-6 text-center pt-3 pb-5">Ingreso a Algebreb</h1>
      Para ingresar a Algebreb requiere de una cuenta:
      <ul>
        <li>
          <label className="fw-bold">Si no tiene una cuenta</label>, de click en{" "}
          <label className="fw-bold">Registrarse</label> que se encuentra en la
          barra de navegación, ingrese los datos que le piden en el formulario y
          de esta forma se creará su cuenta con la cual podrá ingresar.
          <div className="text-center py-3">
            <img
              src={LogUp}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="400"
            />
          </div>
        </li>
        <li>
          <label className="fw-bold">Si ya tiene una cuenta</label>, de click en{" "}
          <label className="fw-bold">Iniciar sesion</label> e ingrese su usuario
          y contraseña para acceder a la aplicación.
          <div className="text-center py-3">
            <img
              src={LogIn}
              className="img-fluid img-thumbnail center"
              alt="Formulario de registro"
              width="400"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};
