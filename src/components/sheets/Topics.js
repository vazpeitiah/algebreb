import { useState } from 'react'

const Topics = ({ selectTopic }) => {
  const [mainTopic, setMainTopic] = useState("polinomios")
  const [topic, setTopic] = useState("suma_polinomios")

  const onChangeMainTopic = (e) => {
    const currentMainTopic = e.target.value
    setMainTopic(currentMainTopic)
    if (currentMainTopic === "polinomios") {
      setTopic("suma_polinomios")
      selectTopic("suma_polinomios")
    }
    if (currentMainTopic === "ecuaciones") {
      setTopic("ecuaciones_grado1")
      selectTopic("ecuaciones_grado1")
    }

    if (currentMainTopic === "factorizacion") {
      setTopic("factor_comun")
      selectTopic("factor_comun")
    }

    if (currentMainTopic === "fracciones") {
      setTopic("suma_fracciones")
      selectTopic("suma_fracciones")
    }

    if (currentMainTopic === "productos") {
      setTopic("binomios_al_cuadrado")
      selectTopic("binomios_al_cuadrado")
    }
  }

  const onChangeTopic = (e) => {
    const currentTopic = e.target.value
    setTopic(currentTopic)
    selectTopic(currentTopic)
  }

  return (
    <div className="form-group">
      <label>Selecciona un tema</label>
      <select className="form-select"
        value={mainTopic}
        onChange={onChangeMainTopic}>
        <option value="polinomios">Polinomios</option>
        <option value="ecuaciones">Ecuaciones</option>
        <option value="factorizacion">Factorizacion</option>
        <option value="fracciones">Fracciones algebraicas</option>
        <option value="productos">Productos notables</option>
      </select>
      <label>Selecciona un subtema:</label>
      <select name="topic"
        className="form-select"
        value={topic}
        onChange={onChangeTopic}>
        {mainTopic === "polinomios" && (
          <>
            <option value="suma_polinomios">Suma de polinomios</option>
            <option value="resta_polinomios">Resta de polinomios</option>
            <option value="multiplicacion_polinomios">Multiplicacion de polinomios</option>
            <option value="division_polinomios">División de polinomios</option>
            <option value="termino_polinomios">Termino del polinomio</option>
            <option value="grado_polinomios">Grado del polinomio</option>
          </>
        )}

        {mainTopic === "ecuaciones" && (
          <>
            <option value="ecuaciones_grado1">Ecuaciones de primer grado</option>
            <option value="ecuaciones_grado2">Ecuaciones de segundo grado</option>
          </>
        )}

        {mainTopic === "factorizacion" && (
          <>
            <option value="factor_comun">Factor común</option>
            <option value="diferencia_cuadrados">Diferencia de cuadrados</option>
            <option value="trinomio_cuadrado_perfecto">Trinomio cuadrado perfecto</option>
            <option value="cubo_perfecto_binomios">Cubo perfecto de binomios</option>
            <option value="trinomio_forma1">Trinomio de la forma x^2+bx+c</option>
            <option value="trinomio_forma2">Trinomio de la forma ax^2+bx+c</option>
          </>
        )}

        {mainTopic === "fracciones" && (
          <>
            <option value="suma_fracciones">Suma de fracciones</option>
            <option value="resta_fracciones">Resta de fracciones</option>
            <option value="multiplicacion_fracciones">Multiplicación de fracciones</option>
            <option value="division_fracciones">División de fracciones</option>
            <option value="simplificacion_fracciones">Simplificación de fracciones</option>
          </>
        )}

        {mainTopic === "productos" && (
          <>
            <option value="binomios_al_cuadrado">Binomios al cuadrado</option>
            <option value="binomios_al_cubo">Binomio al cubo</option>
            <option value="binomios_conjugados">Binomios conjugados</option>
            <option value="binomios_forma1">Binomio de la forma (ax+b)(cx+d)</option>
            <option value="binomios_forma2">Binomio de la forma (x+a)(x+b)</option>
            {/* <option value="trinomios_al_cuadrado">Trinomio al cuadrado</option> */}
          </>
        )}
      </select>
    </div>

  )
}

export default Topics
