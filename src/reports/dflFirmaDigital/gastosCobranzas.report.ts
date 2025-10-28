import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const logo: Content = {
	image: 'src/assets/credipoint_digital.png',
	width: 125,
	height: 50,
	margin: [20, 20, 0, 20],
	alignment: 'right'
}

const styles: StyleDictionary = {
	header: {
		fontSize: 12,
		alignment: 'center',
		margin: [0, 20, 0, 40],
	},
	subheader: {
		fontSize: 14,
		bold: true,
		margin: [0, 10, 0, 5],
	},
	content: {
		fontSize: 12,
		margin: [0, 5, 0, 5],
		alignment: 'justify',
	},
	bold: {
		bold: true,
	},
};


interface GastosCobranzasReportParams {
	Nombre: string,
	Cedula: string,
	Fecha: Date
}

const fechaformateada = (fecha: Date): string => {
	const date = new Date(fecha);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth es 0-based
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};


export const GastosCobranzasReport = (params: GastosCobranzasReportParams):
	TDocumentDefinitions => {
	const { Nombre, Cedula, Fecha } = params;

	const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [40, 80, 40, 60],
		header: {
			columns: [
				{
					text: `Matriz: 10 de Agosto 
							Dirección: Av. 10 de Agosto n19-86 y Río de Janeiro 
							Telf.: 2555212`,
					style: 'header',
					alignment: 'left',
					margin: [20, 30, 0, 20]
				},
				logo
			]
		},
		content: [
			{
				table: {
					widths: ['*', '*'],
					body: [
						// Fila 1: título con una sola celda que ocupa dos columnas
						[
							{
								text: 'GASTOS DE COBRANZA',
								colSpan: 2,
								fillColor: '#003366',
								color: 'white',
								alignment: 'center',
								bold: true,
								fontSize: 12,
								margin: [0, 5, 0, 5]
							},
							{}
						],
						// tabla
						[
							{ text: 'RANGO DE VALOR DE LA CUOTA', alignment: 'center', fontSize: 10 },
							{ text: 'RECARGO DE COBRANZA POR PAGO TARDÍO DE LA CUOTA *', alignment: 'center', fontSize: 10 },
						],
						[
							{ text: 'USD $19.99 o menor', alignment: 'center', fontSize: 10 },
							{ text: 'USD $3.00', alignment: 'center', fontSize: 10 },
						],
						[
							{ text: 'USD $20.00 hasta USD $39.99', alignment: 'center', fontSize: 10 },
							{ text: 'USD $5.00', alignment: 'center', fontSize: 10 },
						],
						[
							{ text: 'USD $40.00 hasta USD $59.99', alignment: 'center', fontSize: 10 },
							{ text: 'USD $9.00', alignment: 'center', fontSize: 10 },
						],
						[
							{ text: 'USD $60.00 hasta USD $79.99', alignment: 'center', fontSize: 10 },
							{ text: 'USD $12.00', alignment: 'center', fontSize: 10 },
						],
						[
							{ text: 'USD $80.00 hasta USD $100.00', alignment: 'center', fontSize: 10 },
							{ text: 'USD $15.00', alignment: 'center', fontSize: 10 },
						],
						[
							{ text: 'Mayor a USD $100.01', alignment: 'center', fontSize: 10 },
							{ text: 'USD $18.00', alignment: 'center', fontSize: 10 },
						],
					]
				}
			},
			{
				text: ' * Estos valores no incluyen I.V.A.',
				alignment: 'right',
				fontSize: 11,
				bold: true,
				margin: [0, 10, 0, 0], // [left, top, right, bottom]
			},
			{
				text: `Declaro de manera libre y voluntaria que acepto el cobro de los valores antes descritos, como recargo de cobranza por el pago tardío de las cuotas de mi crédito.`,
				style: 'content',
			},
			{
				text: `Los valores máximos aquí establecidos podrán cobrarse una sola vez por cada cuota vencida, sin importar el número de días o meses de atraso.`,
				style: 'content',
			},
			{
				text: `AÑO MES DIA
						FECHA: ${fechaformateada(Fecha)}`,
				style: 'content',
			},
			{
				columns: [
					{
						width: '*',
						table: {
							body: [
								[
									{
										text: `Nota: POR FAVOR REALICE SUS PAGOS EN\nCUALQUIER LOCAL DE POINT`,
										alignment: 'center',
										bold: true,
										fontSize: 10,
										margin: [0, 5, 0, 5],
									}
								]
							]
						}
					},

					{
						width: 'auto',
						stack: [
							{
								text: '______________________________',
								alignment: 'right',
								margin: [0, 0, 0, 5],
							},
							{
								text: 'FIRMA DEL CLIENTE',
								bold: true,
								alignment: 'right',
								margin: [0, 0, 0, 5],
							},
							{
								text: Nombre,
								fontSize: 11,
								alignment: 'right',
								margin: [0, 0, 0, 3],
							},
							{
								text: `Cédula de ciudadanía No. ${Cedula}`,
								fontSize: 11,
								alignment: 'right',
							}
						]
					}
				],
				columnGap: 20 // Espacio entre las columnas
			}
		],
		styles: styles,
	};
	return docDefinition;
}