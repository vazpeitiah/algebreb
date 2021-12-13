import { useState } from "react";
import svgIcon from "../../lib/svgIcons";

const ExercisesForm = ({ genExercises, topic, isLoading }) => {
  const [cantidad, setCantidad] = useState(2);
  const [dominio, setDominio] = useState("ZZ");
  const [rangoCoeficientes, setRangoCoeficientes] = useState(5);
  const [variables, setVariables] = useState(["x", "y"]);
  const [grado, setGrado] = useState(2);
  const [completo, setCompleto] = useState(true);
  const [exacta, setExacta] = useState(true);
  const [metodo, setMetodo] = useState("formula");
  const [tipoRespuesta, setTipoRespuesta] = useState("abierta");

  const onSubmit = (e) => {
    e.preventDefault();
    // Si el usuario selecciono el dominio fraccionario
    let fraccion = false;
    let auxDominio = dominio;
    if (auxDominio === "QQ+") {
      auxDominio = "QQ";
      fraccion = true;
    }

    // Para los ejercicios que solo permiten usar una variable
    let vars = variables;
    if (
      topic === "division_polinomios" ||
      topic === "ecuaciones_grado1" ||
      topic === "ecuaciones_grado2" ||
      topic === "trinomio_cuadrado_perfecto"
    ) {
      vars = ["x"];
    }

    // Para los ejercicios que solo permiten numeros enteros
    if (topic === "factor_comun") auxDominio = "ZZ";

    const params = {
      cantidad,
      dominio: auxDominio,
      variables: vars,
      gmin: 1,
      gmax: grado,
      cmin: -rangoCoeficientes,
      cmax: rangoCoeficientes,
      fraccion,
      completo,
      exacta,
      metodo,
      tipoRespuesta,
    };

    genExercises(params);
  };

  const randomParams = () => {
    //setCantidad(genRandomInt(1, 4))
    const doms = ["ZZ", "QQ", "QQ+"];
    setDominio(doms[genRandomInt(0, 3)]);
    setRangoCoeficientes(genRandomInt(1, 20));
    const vars = [["x"], ["x", "y"], ["x", "y", "z"]];
    setVariables(vars[genRandomInt(0, 3)]);
    setGrado(genRandomInt(1, 4));
    const ruleta = [true, false];
    setCompleto(ruleta[genRandomInt(0, 2)]);
    setExacta(ruleta[genRandomInt(0, 2)]);
    const meth = ["formula", "factorizacion"];
    setMetodo(meth[genRandomInt(0, 2)]);
  };

  const genRandomInt = (min, max) => {
    //Genar numeros aleatorios enteros entre min - max
    return Math.floor(Math.random() * (max - min) + min);
  };

  const handleVariables = (e) => {
    const vars = Number(e.target.value);
    if (vars === 1) {
      setVariables(["x"]);
    } else if (vars === 2) {
      setVariables(["x", "y"]);
    } else if (vars === 3) {
      setVariables(["x", "y", "z"]);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success form-control mt-2 mb-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {svgIcon.add}
        Agregar ejercicios
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Agregar ejercicios
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal-body">
                <label>Número de ejercicios</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  min="1"
                  max="200"
                  step="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                />
                {topic !== "factor_comun" && topic !== "diferencia_cuadrados" && (
                  <div className="form-group">
                    <label>Tipo de números:</label>
                    <select
                      name="dominio"
                      className="form-select mb-3"
                      value={dominio}
                      onChange={(e) => setDominio(e.target.value)}
                    >
                      <option value="ZZ">Enteros</option>
                      <option value="QQ">Decimales</option>
                      <option value="QQ+">Fraccionarios</option>
                    </select>
                  </div>
                )}
                {topic !== "division_polinomios" &&
                  topic !== "ecuaciones_grado1" &&
                  topic !== "ecuaciones_grado2" &&
                  topic !== "trinomio_cuadrado_perfecto" && (
                    <div>
                      <label>
                        Cantidad de variables:{" "}
                        {variables.map((variable, index) => (
                          <span key={index}>{variable} </span>
                        ))}
                      </label>
                      <select
                        className="form-select mb-3"
                        value={variables.length}
                        onChange={handleVariables}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  )}

                <label>
                  {" "}
                  Rango de los coeficientes: (de -{rangoCoeficientes} a{" "}
                  {rangoCoeficientes})
                </label>
                <input
                  type="range"
                  className="form-range mb-3"
                  min="1"
                  max="100"
                  step="1"
                  value={rangoCoeficientes}
                  onChange={(e) => setRangoCoeficientes(Number(e.target.value))}
                />

                {topic !== "ecuaciones_grado1" &&
                  topic !== "ecuaciones_grado2" && (
                    <div className="form-group">
                      <label> Grado de los polinomios: ({grado})</label>
                      <input
                        type="range"
                        className="form-range mb-3"
                        min="1"
                        max="7"
                        step="1"
                        value={grado}
                        onChange={(e) => setGrado(Number(e.target.value))}
                      />
                    </div>
                  )}

                {topic !== "ecuaciones_grado1" &&
                  topic !== "ecuaciones_grado2" &&
                  topic !== "diferencia_cuadrados" &&
                  topic !== "trinomio_cuadrado_perfecto" && (
                    <div className="form-group">
                      <label>Polinomios completos</label>
                      <select
                        className="form-select mb-3"
                        value={completo}
                        onChange={(e) => setCompleto(!completo)}
                      >
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  )}

                {topic === "division_polinomios" && (
                  <div className="form-group">
                    <label>División exacta</label>
                    <select
                      className="form-select"
                      value={exacta}
                      onChange={(e) => setExacta(!exacta)}
                    >
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                )}

                {topic === "ecuaciones_grado2" && (
                  <div className="form-group">
                    <label>Método de resolución</label>
                    <select
                      className="form-select"
                      value={metodo}
                      onChange={(e) => setMetodo(e.target.value)}
                    >
                      <option value="formula">Formula</option>
                      <option value="factorizacion">Factorización</option>
                    </select>
                  </div>
                )}
                <label>Tipo de respuesta</label>
                <select
                  className="form-select"
                  value={tipoRespuesta}
                  onChange={(e) => setTipoRespuesta(e.target.value)}
                >
                  <option value="abierta">Preguntas abiertas</option>
                  <option value="opcion_multiple">Opción multiple</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  {svgIcon.cancel}
                  Cancelar
                </button>
                <button
                  className="btn btn-warning"
                  onClick={randomParams}
                  type="button"
                  disabled={!isLoading ? "" : "disable"}
                >
                  {svgIcon.random}
                  Paramétros aleatorios
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  {svgIcon.add}
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisesForm;
