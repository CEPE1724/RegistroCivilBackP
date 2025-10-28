import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const logo: Content = {
	image: 'src/assets/credipoint_digital.png',
	width: 110,
	height: 40,
	margin: [20, 15]
}

const styles: StyleDictionary = {
	header: {
		fontSize: 10,
		bold: true,
		alignment: 'center',
		margin: [0, 20, 0, 20],
	},
	content: {
		fontSize: 10,
		margin: [0, 5, 0, 5],
		alignment: 'justify',
	},
};

function obtenerFechaActual(): string {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');

  return `${año}-${mes}-${dia}`;
}




interface CompromisoLugPagReportReportParams {
	Nombre: string,
	Cedula: string,
}

export const compromisoLugPagReport = (params: CompromisoLugPagReportReportParams): TDocumentDefinitions => {
	const { Nombre, Cedula } = params;

	const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [40, 40, 90, 60],
		header: [logo],
		content: [
			{
				text: 'COMPROMISO LUGAR DE PAGO',
				style: 'header',
			},
			{
				text: [`Ahora, para brindarle una mayor comodidad y ahorrándole tiempo en su proceso de pago, hemos mejorado y aumentamos los métodos o canales de pagos del crédito directo `,
					{ text: 'CrediPoint', bold: true }],
				style: 'content',
			},
			{
				text: `Lo pueden realizar de las siguientes formas.`,
				style: 'content',
			},
			{
				ol: [
					'Locales de POINT a nivel nacional, presentar cédula de ciudadanía',
					'Transferencias Bancarias a la siguientes cuentas:',
				],
				style: 'content',
			},
			{
				columns: [
					{
						width: 'auto',
						table: {
							widths: [75, 75, 75],
							body: [
								// Fila 1
								[
									{ text: 'SUPERMERCADO DE COMPUTADORAS', colSpan: 3, border: [false, false, false, false], alignment: 'center' },
									{},
									{}
								],
								// Fila 2
								[
									{ text: 'RUC:1791774582001', colSpan: 3, border: [false, false, false, false], alignment: 'center' },
									{},
									{}
								],
								// Fila 3
								[
									{ text: 'DETALLE OFICIAL DE CUENTAS BANCARIAS', colSpan: 3, alignment: 'center' },
									{},
									{}
								],
								// Fila 4: Encabezados
								[
									{ text: 'BANCO', alignment: 'center', fillColor: 'black', color: 'white' },
									{ text: 'CUENTA', alignment: 'center', fillColor: 'black', color: 'white' },
									{ text: 'TIPO CUENTA', alignment: 'center', fillColor: 'black', color: 'white' }
								],
								// Fila 5
								[
									{ text: 'PICHINCHA' },
									{ text: '3077712404' },
									{
										rowSpan: 9,
										margin: [0, 0, 0, 0],
										canvas: [
											{
												type: 'text',
												text: 'CORRIENTE',
												x: -5,     // Mueve un poco a la izquierda
												y: 120,    // 🔧 Ajusta esto según el alto (aquí hay 9 filas → y: ~130-150)
												rotate: 90,
												fontSize: 9
											}
										]
									}
								],
								// Filas 6 a 13
								...[
									['PACIFICO', '5202086'],
									['INTERNACIONAL', '360605157'],
									['GUAYAQUIL', '41205385'],
									['AUSTRO', '1017001651'],
									['BANECUADOR', '3001504981'],
									['LOJA', '290074482-1'],
									['PRODUBANCO', '0200203112-0'],
									['SOLIDARIO', '2626500036927']
								].map(([banco, cuenta]) => [
									{ text: banco },
									{ text: cuenta },
									{}
								])
							]
						},
						layout: {
							hLineWidth: (i: number) => (i === 0 || i === 1 ? 0 : 0.5),
							vLineWidth: () => 0.5
						},
						fontSize: 9
					}
				],
				margin: [100, 20, 0, 20]
			},


			{
				text: [`Los créditos de `,
					{ text: 'Banco Solidario', bold: true },
					` se deben cancelar en cualquiera de las ventanillas a nivel nacional.`
				],
				style: 'content',
			},
			{
				text: `Estamos más cerca de ti.`,
				style: 'content',
			},
			{
				text: `Acepto y me comprometo a cancelar las cuotas a través de los medios indicados en este documento.`,
				style: 'content',
				margin: [0, 5, 0, 55],
			},
			{
				text: `__________________________________
				Nombres: ${Nombre}
				CEDULA: ${Cedula}`,
				style: 'content',
				margin: [100, 5, 0, 25],
			},
			{
				text: `Fecha: ${obtenerFechaActual()}`,
				style: 'content',
			},
		],
		styles: styles,
	};
	return docDefinition;
}