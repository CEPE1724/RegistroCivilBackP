import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const styles: StyleDictionary = {
	header: {
		fontSize: 11,
		//bold: true,
		alignment: 'center',
		margin: [0, 6, 0, 20],
	},
	content: {
		fontSize: 11,
		margin: [0, 5, 0, 5],
		alignment: 'justify',
	},
};

interface tablaAmortizacionReportParams {
	Nombre: string,
	Cedula: string,
	Monto: number,
	Plazo: number,
	Tasa: string,
	Cuota: string,
	datosTabla: any[]
}

export const tablaAmortizacionReport = (params: tablaAmortizacionReportParams): TDocumentDefinitions => {
	const { Nombre, Cedula, Monto, Plazo, Tasa, Cuota, datosTabla } = params;

	function formatoFecha(fecha: Date | string): string {
		const d = new Date(fecha);
		const year = d.getFullYear();
		const month = (d.getMonth() + 1).toString().padStart(2, '0');
		const day = d.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	//Tabla amortizacion
	const tablaBody = [
		['Cuota', 'Fecha', 'Pago', 'Interés', 'Capital', 'Saldo'],
		...datosTabla.map(item => [
			item.NroCuota.toString(),
			formatoFecha(item.Fecha),
			item.Pago.toFixed(2),
			item.Interes.toFixed(2),
			item.Capital.toFixed(2),
			item.Saldo.toFixed(2)
		])
	];

	const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [40, 8, 70, 20],
		content: [
			{
				text: 'TABLA DE AMORTIZACION',
				style: 'header',
			},
			{
				text: `Cliente: ${Nombre}

				C.I: ${Cedula}`,
				style: 'content',
				margin: [0, 5, 0, 10],
			},
			{
				table: {
					body: [
						['Monto de Credito (MB)', `${Monto}`],
						['Plazo', `${Plazo}`],
						['Tasa', `${Tasa}`],
						['Cuota', `${Cuota}`]
					]
				},
				margin: [0, 5, 0, 10],
			},
			{
				text: `Tabla de Amortización`,
				style: 'content',
				bold: true,
				margin: [0, 10, 0, 10],
			},
			{
				table: {
					headerRows: 1,
					widths: [70, 130, 60, 70, 60, 70],
					body: tablaBody
				},
				alignment: 'center',
				fontSize: 10
			},
			{
				text: `_______________________________________
						Nombres: ${Nombre}
						C.I.: ${Cedula}`,
				style: 'content',
				margin: [0, 80, 0, 5],
				fontSize: 10

			},
		],
		styles: styles,
	};
	return docDefinition;
}