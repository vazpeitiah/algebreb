import "./LandingPage.css";

import Exam from "../../assets/img/app.jpg";
import Math from "../../assets/img/math.jpg";
import Vladi from "../../assets/img/vladimir.png";
import Aldave from "../../assets/img/aldavera.jpeg";
import Vargas from "../../assets/img/vargas.jpeg";

import Item from "./Item";
import Gallery from "./Gallery";
import Topics from "./Topics";
import Features from "./Features";
import Profile from "./Profile";

const LandingPage = () => {
  return (
    <div>
      <main>
        <div
          id="home"
          className="d-flex align-items-center fill position-relative overflow-hidden text-center text-dark pb-5"
        >
          <div className="col-md-5 p-lg-5 mx-auto">
            <h1 className="display-1 fw-bold my-4">ALGEBREB</h1>
            <p className="lead fw-normal py-5 my-4">
              Aplicación web generadora y evaluadora de ejercicios algebraicos
              de nivel medio superior con soluciones paso a paso.
            </p>
            <a className="btn btn-primary btn-lg bg-btn h5" href="#app">
              Conocer mas
            </a>
          </div>
          <div id="form-1" className="form-1 d-none d-md-block"></div>
          <div id="form-2" className="form-2 d-none d-md-block"></div>
          <div id="form-3" className="form-3 d-none d-md-block"></div>
        </div>

        <div className="cotainer py-5"></div>

        <div id="app" className="container text-dark">
          <Item
            className="col-md-7 my-auto"
            title="Algebreb."
            text="Una aplicación web capaz de generar ejercicios
            de álgebra junto con sus soluciones paso a paso.
            De  manera  que  tanto  profesores  como  alumnos
            puedan verse beneficiados con ella, al poder realizar
            material  de  evaluación  de  una  forma  práctica  y
            rápida, y al contar con ejercicios que puedan ayudar
            a  mejorar  su  desempeño  en  la  asignatura
            respectivamente."
            src={Exam}
            label="Photo by cottonbro from Pexels"
          />

          {/* Característcas */}
          <Features />

          <hr className="featurette-divider" />

          <Item
            id="topics"
            className="col-md-7 my-auto"
            title="Enfocada al Álgebra."
            text="El  álgebra  es  una  de  las  asignaturas 
            fundamentales del nivel medio superior, pues 
            en  ella  recaen  los  fundamentos  para 
            comprender  otras  asignaturas  posteriores 
            como  lo  son  la  geometría,  el  cálculo  o  la 
            probabilidad."
            src={Math}
            label="Photo by Karolina Grabowska from Pexels"
          />

          <Topics
            topics={[
              "Polinomios",
              "Productos notables",
              "Factorización",
              "Fracciones algebraicas",
              "Ecuaciones lineales",
              "Sistema de ecuacioneas en tres variables",
              "Sistema de ecuacioneas en dos variables",
              "Ecuaciones cuadráticas",
            ]}
          />

          <hr className="featurette-divider" />
        </div>

        <div className="container text-dark">
          <h3 id="for_" className="display-6 fw-bold pb-4 text-center">
            ¿Hacia quién va dirigido?
          </h3>
        </div>

        <div className="container text-dark">
          <Gallery />
          <hr className="featurette-divider" />
        </div>

        {/* Equipos */}
        <div id="team" className="container text-dark">
          <h3 className="display-6 fw-bold pb-5 text-center">Nuestro equipo</h3>
          <div className="row pt-5 text-center">
            <Profile name="Vladimir Azpeitia" src={Vladi} url="https://github.com/vazpeitiah" />
            <Profile name="Ivan Aldavera" src={Aldave} url="https://github.com/Ivan0123456789" />
            <Profile name="Ivan Vargas" src={Vargas} url="https://github.com/FxIvan09" />
          </div>
        </div>

        <div className="container">
          <hr className="featurette-divider text-dark" />
        </div>
      </main>

      <footer className="container container.item text-dark py-5">
        <div className="row">
          <div className="d-flex flex-row-reverse">
            <small className="px-3 text-muted">&copy;Algebreb</small>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#00ADB5"
              className="bi bi-circle-square"
              viewBox="0 0 16 16"
            >
              <path d="M0 6a6 6 0 1 1 12 0A6 6 0 0 1 0 6z" />
              <path d="M12.93 5h1.57a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1.57a6.953 6.953 0 0 1-1-.22v1.79A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 4h-1.79c.097.324.17.658.22 1z" />
            </svg>
            <a
              className="px-3"
              href="https://github.com/vazpeitiah/algebreb"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="black"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
