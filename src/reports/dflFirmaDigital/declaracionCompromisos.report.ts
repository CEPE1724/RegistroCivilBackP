import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const styles: StyleDictionary = {
	header: {
		fontSize: 18,
		bold: true,
		alignment: 'center',
		margin: [0, 20, 0, 10],
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

interface declaracionCompromisosReportParams {
	Nombre: string,
	Cedula: string
}

export const declaracionCompromisosReport = (params: declaracionCompromisosReportParams): TDocumentDefinitions => {
	const { Nombre, Cedula } = params;

	const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [0, 0, 0, 0],

		content: [
			{
				absolutePosition: { x: 35, y: 27 }, // Posición flotante fuera del cuadro
				text: 'Declaraciones de compromiso',
				fontSize: 12,
				bold: true,
				background: 'white',
				margin: [5, 0, 5, 0],
				color: 'black'
			},
			{
				canvas: [
					{
						type: 'rect',
						x: 20, // 🔧 Izquierda (margen)
						y: 47, // 🔧 Arriba (después del label)
						w: 565, // Ancho del rectángulo 
						h: 780, // Alto del rectángulo
						r: 13, //  Radio de las esquinas redondeado
						lineColor: 'black',
						lineWidth: 1
					}
				]
			},

			// Contenido dentro del marco
			{
				absolutePosition: { x: 30, y: 50 }, // Posición del contenido dentro del cuadro
				table: {
					widths: [543],
					body: [
						[
							{

								text: `Por medio del presente instrumento, solicito (solicitamos) la venta a plazo de los bienes comercializados por que se detallan en el presente documento, previo el análisis de crédito respectivo.
				
				Expresamente autorizo (autorizamos) al acreedor para que, cuantas veces sean necesarias, obtenga de y/o valide con cualquier fuente de información, incluida la Central de Riesgos y Buró de Información Crediticia autorizados para operar en el país, perso-nas naturales, establecimientos de comercio, mi (nuestro) empleador, las personas señaladas como cónyuge, conviviente o referencias, instituciones financieras, de crédito, de cobranzas, campañias de informes, compañias emisoras o administradoras de tarjetas de crédito y otras entidades, sobre mis (nuestras) referencias personales y/o patrimoniales de pasado, de presente y las que se generen en el futuro, como deudor principal, codeudor o garante, así como sobre mi (nuestro) comportamiento credificio, manejo de cuentas corrientes, de ahorro, tarjetas de crédito, etc., y en general sobre el cumplimiento de mis (nuestras) obligaciones.
				También faculto (facultamos) expresamente al acreedor para transferir o entregar a las mismas personas o entidades mencio-nadas en el párrafo anterior, la información relacionada con mi (nuestro) comportamiento crediticio. Por este medio libero (liberamos) al acreedor, así como a las personas o entidades señaladas, de la reserva si estos la debieran guardar.

				Cualquier cambio en mi (nuestra) información personal declarada en el presente documento, será comunicada inmedia-tamente al acreedor.

				Acepto (aceptamos) que la documentación entregada con esta solicitud no me (nos) será devuelta. En caso de aceptación a la presente solicitud, suscribiré (emos) el correspondiente pagaré a la orden.

				Autorizo (autorizamos) al acreedor directamente o por intermedio de la empresa de cobranza designada, a emitir a mis (nues-tras) direcciones de correo electrónico y/o teléfonos celulares registrados en el presente documento, información relevante sobre mi (nuestras) obligaciones de crédito, tales como fechas recordatorias y/o máximas de pago, vencimientos registra-dos, valores a cancelar, entre otros. Los mensajes electrónicos remitidos bajo esta condición, no podrán ser considerados como correos electrónicos no deseados. La presente autorización podrá ser revocada en cualquier momento mediante comunicación escrita telefónica, electrónica dirigida al remitente.

				Faculto (facultamos) irrevocablemente al acreedor para efectuar, por cuenta y carga mía (nuestra), las gestiones que estimen convenientes, directamente o por intermedio de la empresa de cobranzas que el acreedor contrate, para obtener el pago de mis (nuestras) obligaciones. De manera especial, faculto (facultamos) al acreedor y/o al tercero contratodo por este para la gestión de cobranza, a proveer información suficiente a mi (nuestro) empleador y/o a las personas y empresas, detalladas y referidas en el presente documento, sobre mi (nuestro) comportamiento crediticio, relevándolos de la reserva si la debieran guardar. Serán de mi (nuestra) cuenta los costos y honorarios por la gestión de cobranza judicial y extrajudicial realizada, valores que declaro (declaramos) haber conocido de manera previa y que se aplicaran a toda cuota con un atraso superior a cinco días calendario, contados desde la fecha de su vencimiento. Para los efectos legales pertinentes, los valores por gestión y administración de cobranza no podrán ser considerados bajo ningún concepto como comisión o carga financiera adicional a favor del acreedor.

				Autorizo (autorizamos) expresamente al acreedor para que, de manera directa o por intermedio de la(s) empresa(s) que difun-den o realizan publicidad, incluya mis datos en actividades o campañas de mercadeo directo o de publicidad en general.

				Autorizo (autorizamos) desde ahora al acreedor a endosar la cartera adeudada por mi (nosotros), sin necesidad de notifica-ción o consentimiento posterior. En caso de que el acreedor ceda o transfiera cartera adeudada por mi (nosotros), el endosa-tario de la misma queda desde ahora expresamente facultado para realizar las mismas actividades establecidas anterior-mente, inclusive para efectuar directamente o a través de terceros las gestiones de cobranza, que igualmente derá de mi (nuestro) cargo, en los montos establecidos en la respectiva tabla de honorarios que constan en la presente solicitud.
				`,
								fontSize: 9,
								lineHeight: 1,
								alignment: 'justify',
							}
						]
					]
				},
				layout: 'noBorders'

			},
			{
				absolutePosition: { x: 30, y: 560 },
				canvas: [
					{
						type: 'rect',
						x: 0,
						y: 0,
						w: 550,
						h: 65,
						r: 8,
						lineColor: 'black',
						lineWidth: 1
					}
				]
			},
			{
				absolutePosition: { x: 40, y: 561 }, 
				table: {
					widths: [130, 90, 260],
					body: [
						// Encabezado Sí / No
						[
							{ text: '', border: [false, false, false, false] },
							{
								table: {
									widths: [17, 17],
									body: [
										[
											{ text: 'Sí', alignment: 'center', fontSize: 8, border: [false, false, false, false] },
											{ text: 'No', alignment: 'center', fontSize: 8, border: [false, false, false, false] }
										]
									]
								},
								layout: 'noBorders'
							},
							{}
						],
						// Fila 1
						[
							{ text: 'Está afiliado al RISE', fontSize: 8, border: [false, false, false, false], margin: [0, -1, 0, -1] },
							{
								table: {
									widths: [10, 10],
									body: [
										[
											{ canvas: [{ type: 'rect', x: 2, y: 0, w: 8, h: 8, lineWidth: 0.6 }] },
											{ canvas: [{ type: 'rect', x: 14, y: 0, w: 8, h: 8, lineWidth: 0.6 }] }
										]
									]
								},
								layout: 'noBorders'
							},
							{
								rowSpan: 3,
								text: 'Declaro también que libera a						 de cualquier responsabilidad como consecuencia de cualquier error u omisión en la declaración que antecede.',
								fontSize: 8,
								alignment: 'justify',
								margin: [0, 0, 0, 0]
							}
						],
						// Fila 2
						[
							{ text: 'Tiene RUC', fontSize: 8, border: [false, false, false, false], margin: [0, -1, 0, -1] },
							{
								table: {
									widths: [10, 10],
									body: [
										[
											{ canvas: [{ type: 'rect', x: 2, y: 0, w: 8, h: 8, lineWidth: 0.6 }] },
											{ canvas: [{ type: 'rect', x: 14, y: 0, w: 8, h: 8, lineWidth: 0.6 }] }
										]
									]
								},
								layout: 'noBorders'
							},
							{}
						],
						// Fila 3
						[
							{ text: 'Está obligado a llevar contabilidad', fontSize: 8, border: [false, false, false, false] },
							{
								table: {
									widths: [10, 10],
									body: [
										[
											{ canvas: [{ type: 'rect', x: 2, y: 0, w: 8, h: 8, lineWidth: 0.6 }] },
											{ canvas: [{ type: 'rect', x: 14, y: 0, w: 8, h: 8, lineWidth: 0.6 }] }
										]
									]
								},
								layout: 'noBorders'
							},
							{}
						]
					]
				},
				layout: 'noBorders'
			},
			{
				absolutePosition:  {x: 40, y: 680 },
				columns: [
					{
						width: '*',
						text: `_______________________________________
						F. Cliente
						Nombres:
						C.C.`,
						style: 'content',
						fontSize: 7
					},
					{
						width: '*',
						text: `_______________________________________
						F. Garante
						Nombres:
						C.C.`,
						style: 'content',
						fontSize: 7
					},
				],
				margin: [0, 0, 0, 0],
			},
			{
				absolutePosition:  {x: 40, y: 780 },
				columns: [
					{
						width: '*',
						text: `_______________________________________
						F. Cliente
						Nombres:
						C.C.`,
						style: 'content',
						fontSize: 7
					},
					{
						width: '*',
						text: `_______________________________________
						F. Garante
						Nombres:
						C.C.`,
						style: 'content',
						fontSize: 7
					},
				],
				margin: [0, 0, 0, 0],
			},

		],
		styles: styles,
	};
	return docDefinition;
}