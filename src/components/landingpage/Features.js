import * as Icon from "react-bootstrap-icons";

const Features = () => {
  const features = [
    "Generación de ejercicios de álgebra",
    "Generación de solución final",
    "Generación de solución paso a paso",
    "Generación de evaluaciones en línea",
    "Exportado a PDF",
    "Exportado a imagen",
    "Exportado a LaTeX",
  ];

  const listFeatures = features.map((feature, index) => (
    <div className="col d-flex align-items-start py-4" key={index}>
      <div className="icon-square text-dark flex-shrink-0 me-3">
        <Icon.GearFill className="bi icon-blue" />
      </div>
      <div>
        <h4>{feature}</h4>
      </div>
    </div>
  ));

  return (
    <div id="features" className="container px-4 pt-5">
      <h2 className="pb-2 border-bottom">Características</h2>
      <div className="row g-4 p-2 row-cols-1 row-cols-lg-3">{listFeatures}</div>
    </div>
  );
};

export default Features;
