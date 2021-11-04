import { format, register } from 'timeago.js'

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

export default helpers