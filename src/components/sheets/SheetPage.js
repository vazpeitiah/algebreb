import { useState, useEffect, useRef } from "react";
import Exercises from "../exercises/Exercises";
import ExercisesForm from "../exercises/ExercisesForm";
import Topics from "./Topics";
import { useParams, useHistory } from "react-router-dom";
import exercisesService from "../../services/exercises.service";
import sheetService from "../../services/sheets.service";
import "./sheets.css";
import { useReactToPrint } from "react-to-print";
import helpers from "../../lib/helpers";
import ApplyExam from "./ApplyExam";
import examsService from "../../services/exams.service";
import authService from "../../services/auth.service";

const SheetPage = ({ user }) => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState("suma_polinomios");
  const [currentSheet, setCurrentSheet] = useState(undefined);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionsType, setSolutionsType] = useState("oculta");
  // react-router-dom
  const { sheetId } = useParams();
  let history = useHistory();
  // react-to-print
  const componentRef = useRef();

  useEffect(() => {
    const getCurrentSheet = async () => {
      const sheet = await sheetService.getSheetById(sheetId);
      if (sheet) {
        setCurrentSheet(sheet);
        setExercises(sheet.exercises);
        setSolutionsType(sheet.solutionsType);
      }
    };
    getCurrentSheet();
  }, [sheetId]);

  const genExercises = async (params) => {
    setIsLoading(true);
    const res = await exercisesService.getExercises(topic, params);
    if (res.latex) {
      const exercisesLatex = res.latex;
      const newExercises = {
        instrucciones: res.instrucciones,
        exercisesArr: exercisesLatex,
        tipoRespuesta: params.tipoRespuesta,
      };
      setExercises([...exercises, newExercises]);
    } else {
      alert("ERROR: " + res.message);
    }
    setIsLoading(false);
  };

  const selectTopic = (currentTopic) => {
    setTopic(currentTopic);
  };

  const clearSheet = async () => {
    setCurrentSheet({ ...currentSheet, exercises: [] });
    setExercises([]);
  };

  const saveSheet = async () => {
    if (currentSheet && currentSheet.description !== "") {
      const updatedSheet = await sheetService.updateSheet(currentSheet._id, {
        description: currentSheet.description,
        type: currentSheet.type,
        exercises: exercises,
        solutionsType,
      });

      if (updatedSheet && updatedSheet._id) {
        setCurrentSheet(updatedSheet);
        alert("Se actulizó la hoja correctamente");
      } else {
        alert("ERROR: No se actulizó la hoja");
      }
    } else {
      alert("Debes colocarle un nombre a la hoja");
    }
  };

  const handleDownload = () => {
    const exportType = document.getElementById("export-type").value;
    
    switch (exportType) {
      case "pdf":
        setShowSolution(!showSolution);
        downloadPDF();
        break;

      case "latex":
        downloadLatex();
        break;

      case "png":
        console.log("png");
        break;
    
      default:
        break;
    }
  };

  const downloadPDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: currentSheet && currentSheet.description,
    pageStyle: helpers.getPrintConfig,
  });

  const createLatexDocument = () => {
    const latexHeader =
      "\n \\documentclass{article}\n" +
      "% Ajustes del idioma\n" +
      "\\usepackage[spanish]{babel}\n" +
      "% Espacio y margenes de la hoja\n" +
      "\\usepackage[letterpaper,top=2cm,bottom=2cm,left=3cm,right=3cm,marginparwidth=1.75cm]{geometry}\n" +
      "% Paquetes útiles\n" +
      "\\usepackage{amsmath}\n" +
      "\\usepackage{graphicx}\n" +
      "\\usepackage[colorlinks=true, allcolors=blue]{hyperref}\n" +
      "\\title{" +
      currentSheet.description +
      "}\n" +
      "\\author{" +
      authService.getCurrentUser().name +
      "}\n" +
      "\\begin{document}\n" +
      "\\maketitle\n";

    const latexFooter = "\n\\end{document}";

    let latextBody = "";

    exercises.map((exercise) => {
      latextBody += exercise.instrucciones + "\\\\ \\\\ ";

      let latexProblems = "";

      latextBody += exercise.exercisesArr.map((exe, index) => {
        latexProblems =
          "\n" + (index += 1) + ".- " + exe.enunciado + "\n";

        latexProblems += "\n \\begin{quote}";

        latexProblems += exe.pasos.map((step, ind) => {
          return "\n" + (ind += 1) + ".- " + step + "\\\\";
        });

        latexProblems += "\\\\"
        latexProblems += "\nSolución final: " + exe.solucion + "\\\\\n";

        return latexProblems + "\n \\end{quote} \n";
      });

      latextBody = latextBody.replace("\n,", "");

      return latextBody;
    });

    return latexHeader + latextBody + latexFooter;
  };

  const downloadLatex = () => {
    let doc = createLatexDocument();

    doc = doc.replace(/,/g, '');

    var blob = new Blob([doc, " ", 2], {
      type: "text/plain;charset=utf-8",
    }).slice(2, -1);
    var url = URL.createObjectURL(blob);
    var elem = document.createElement("a");
    elem.href = url;
    elem.download = currentSheet.description + ".tex";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  };

  const applyExam = async (params) => {
    params = { ...params, sheet: sheetId, type: currentSheet.type };
    const response = await examsService.createExam(params);
    if (response && response.success) {
      window.alert(
        "El examen se ha generado. Puede revisar la pestaña de evaluaciones"
      );
    } else {
      window.alert("Error: " + response.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center border rounded p-1">
        <div className="col-lg-8">
          <input
            type="text"
            name="description"
            id="description"
            value={currentSheet ? currentSheet.description : ""}
            className="form-control-plaintext h3"
            onChange={(e) =>
              setCurrentSheet({ ...currentSheet, description: e.target.value })
            }
            autoComplete="off"
            placeholder="Nombre de la hoja"
          />
        </div>
        <div className="col text-end">
          <button className="btn btn-primary me-1" onClick={saveSheet}>
            Guardar
          </button>
          <button className="btn btn-secondary ms-1" onClick={history.goBack}>
            Regresar
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-2">
          <h5>Agregar ejercicios</h5>
          <Topics selectTopic={selectTopic} />
          <ExercisesForm
            genExercises={genExercises}
            topic={topic}
            isLoading={isLoading}
            selectTopic={selectTopic}
          />
          <h5>Configurar Hoja</h5>
          <label htmlFor="type">Tipo de hoja:</label>
          <select
            id="type"
            className="form-select"
            value={currentSheet ? currentSheet.type : "lista_ejercicios"}
            onChange={(e) =>
              setCurrentSheet({ ...currentSheet, type: e.target.value })
            }
          >
            <option value="lista_ejercicios">Lista de ejercicios</option>
            {user && user.roles.includes("profesor") && (
              <>
                <option value="examen">Examen</option>
                <option value="tarea">Tarea</option>
              </>
            )}
          </select>
          <label htmlFor="solutionsType">Tipo de solución</label>
          <select
            id="solutionsType"
            className="form-select"
            value={solutionsType}
            onChange={(e) => setSolutionsType(e.target.value)}
          >
            <option value="oculta">No mostar soluciones</option>
            <option value="unica">Solución final</option>
            <option value="pasos">Soluciones paso a paso</option>
            <option value="solo_respuestas">Mostrar solo las respuestas</option>
          </select>
          <button
            className="btn btn-danger form-control mt-2 mb-2"
            onClick={clearSheet}
            id="clear"
            disabled={!isLoading ? "" : "disable"}
          >
            Vaciar hoja
          </button>
          <h5>Exportar hoja</h5>
          <label htmlFor="format">Seleccione un formato</label>
          <select id="export-type" className="form-select">
            <option value="pdf">PDF</option>
            <option value="latex">LATEX</option>
            <option value="png">Imagen</option>
          </select>
          <button
            className="btn btn-primary form-control mt-2 mb-2"
            onClick={handleDownload}
          >
            Exportar
          </button>
          {currentSheet && currentSheet.type === "examen" && (
            <ApplyExam user={user} applyExam={applyExam} />
          )}
        </div>
        <div className="col border rounded m-2" style={{ overflowX: "auto" }}>
          {!isLoading ? (
            <Exercises
              exercises={exercises}
              ref={componentRef}
              title={currentSheet && currentSheet.description}
              solutionsType={solutionsType}
            />
          ) : (
            <center className="mt-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Cargando...</p>
            </center>
          )}
        </div>
      </div>
    </div>
  );
};

export default SheetPage;
