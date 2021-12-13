import { format, register } from 'timeago.js'
import moment from 'moment';
import 'moment-duration-format'

const helpers = {}

const localeFunc = (number, index, totalSec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ['justo ahora', 'en un rato'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'en %s horas'],
    ['hace 1 día', 'en 1 día'],
    ['hace %s días', 'en %s días'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['hace 1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años'],
  ][index];
};
// register your locale with timeago
register('es', localeFunc);

//Para mostrar cuanto tiempo paso o cuanto tiempo falta
helpers.timeago = (timestamp) => {
  return format(new Date(timestamp), 'es'); //Retornamos la fecha con el UTC corregido con el formato local que registramos
};

helpers.getPrintConfig = () => {
  const pageStyle = `
		@media all {
			.page-break {
				display: none;
			}
			.page-break-custom {
				display: none;
			}
		}
		
		@media print {
			html, body {
				height: initial !important;
				overflow: initial !important;
				-webkit-print-color-adjust: exact;
			}
		}
		
		@media print {
			.page-break {
				margin-top: 18in;
				display: block;
				page-break-before: auto;
			}
			.page-break-custom {
				margin-top: 1rem;
				display: block;
				page-break-before: auto;
			}
		}
		
		@page {
			size: auto;
			margin: 10mm;
		}
		`;
    return pageStyle
}

helpers.getDurationHRS = (sdate, edate) => {
	const startDate = new Date(sdate)
	const endDate = new Date(edate)
	const diff = endDate.getTime() - startDate.getTime()
	const timeHRS = `${moment.duration(diff, "milliseconds").format("h [horas], m [min]")}`
	return timeHRS
}

helpers.getDuration = (sdate, edate) => {
	const startDate = new Date(sdate)
	const endDate = new Date(edate)
	const diff = endDate.getTime() - startDate.getTime()
	return moment.duration(diff, "milliseconds").format("d [days] h [hrs], m [min]")
}

helpers.timeLeft = (sdate, edate) => {
	const startDate = new Date(sdate)
	const endDate = new Date(edate)
	const diff = endDate.getTime() - startDate.getTime()
	return `${moment.duration(diff, "milliseconds").format("hh:mm:ss")}`
}

helpers.formatDate = (date) => {
	return moment(date).format('D/MM/YYYY hh:mm a')
}
/* Obtener el estado del examen => ['En curso', 'Aún no iniciar', 'Fecha vencida'] */
helpers.getStateExam = (sdate, edate) => {
	const startDate = new Date(sdate)
	const endDate = new Date(edate)
	const today = new Date()
	if(today >= startDate && today < endDate) {
		return (
			<span className="text-success">En curso</span>
		)
	} else if (today < startDate) {
		return (
			<span className="">Inicia {helpers.timeago(startDate)} </span>
		)
	} else {
		return (
			<span className="text-danger">Finalizado</span>
		)
	}
} 

helpers.createLatexDocument = (exercises, description, name) => {
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
		description +
		"}\n" +
		"\\author{" +
		name +
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
			"\n \\( " + (index += 1) + ".- " + exe.enunciado + "\\) \n";

		latexProblems += "\n \\begin{quote}";

		if(exe.pasos) {
			latexProblems += exe.pasos.map((step, ind) => {
				return "\n \\( " + (ind += 1) + ".- " + step + " \\) \n \\\\";
			});
		}
		
		latexProblems += "\\\\"
		latexProblems += "\n \\( Solución final: " + exe.solucion + " \\) \n \\\\\n";

		return latexProblems + "\n \\end{quote} \n";
		});

		latextBody = latextBody.replace("\n,", "");

		return latextBody;
	});

	return latexHeader + latextBody + latexFooter;
};

export default helpers