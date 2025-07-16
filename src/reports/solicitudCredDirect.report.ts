import type { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { WebSolicitudgrande } from 'src/web_solicitudgrande/entities/web_solicitudgrande.entity';


export const CreditoDirectoReport = (data: WebSolicitudgrande): TDocumentDefinitions => {

	const styles: StyleDictionary = {
		sectionTitle: {
			fontSize: 10,
			bold: true,
			margin: [0, 10, 0, 5],
			fillColor: '#f0f0f0'
		},
		fieldLabel: {
			fontSize: 8,
			bold: true,
			margin: [0, 2, 0, 2]
		},
		fieldValue: {
			fontSize: 8,
			margin: [0, 2, 0, 2]
		},
		tableHeader: {
			fontSize: 8,
			bold: true,
			fillColor: '#e0e0e0',
			alignment: 'center'
		},
		tableCell: {
			fontSize: 8,
			margin: [2, 2, 2, 2]
		},
		checkboxLabel: {
			fontSize: 8,
			margin: [0, 1, 0, 1]
		},
		smallText: {
			fontSize: 7,
			margin: [0, 1, 0, 1]
		}
	};


	const docDefinition: TDocumentDefinitions = {
		pageMargins: [40, 60, 40, 60],
		header: headerSection({showDate: false, title: 'SOLICITUD CREDITO DIRECTO'}),
		content: [
			// Informacion compra
			{
				table: {
					widths: ['15%', '20%', '15%', '20%', '15%', '15%'],
					body: [
						[
							{text: 'FECHA INGRESO:', style: 'fieldLabel'},
							{text: '16/07/2025', style: 'fieldValue'},
							{text: 'N° OPERACION:', style: 'fieldLabel'},
							{text: `9999`.trim(), style: 'fieldValue'},
							{text: 'TIPO TARJETA', style: 'fieldLabel'},
							{text: `NIC`.trim(), style: 'fieldValue'}
						],
						[
							{text: 'MONTO:', style: 'fieldLabel'},
							{text: '1,799,500', style: 'fieldValue'},
							{text: 'PLAZO:', style: 'fieldLabel'},
							{text: '18', style: 'fieldValue'},
							{text: 'FECHA PAGO:', style: 'fieldLabel'},
							{text: '16/07/2025', style: 'fieldValue'}
						],
					]
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => '#cccccc',
					vLineColor: () => '#cccccc'
				},
				margin: [0, 5, 0, 10]
			},
			



			// Sección de Información Personal
			{
				table: {
					widths: ['*'],
					body: [
						[{text: 'INFORMACIÓN PERSONAL', style: 'sectionTitle', alignment: 'center'}]
					]
				},
				layout: 'noBorders'
			},
			
			// Datos básicos en tabla
			{
				table: {
					widths: ['15%', '20%', '15%', '20%', '15%', '15%', '15%', '20%'],
					body: [
						[
							{text: 'NÚMERO DE DOCUMENTO:', style: 'fieldLabel'},
							{text: `${data.Cedula}`, style: 'fieldValue'},
							{text: 'NOMBRES:', style: 'fieldLabel'},
							{text: `${data.PrimerNombre || ''} ${data.SegundoNombre || ''}`.trim(), style: 'fieldValue'},
							{text: 'APELLIDO PATERNO:', style: 'fieldLabel'},
							{text: `PrimerApellido `.trim(), style: 'fieldValue'},
							{text: 'APELLIDO MATERNO:', style: 'fieldLabel'},
							{text: `SegundoApellido`.trim(), style: 'fieldValue'}
						],
						[
							{text: 'NACIONALIDAD:', style: 'fieldLabel'},
							{text: 'ECUADOR', style: 'fieldValue'},
							{text: 'LUGAR DE NACIMIENTO:', style: 'fieldLabel'},
							{text: 'Quito', style: 'fieldValue'},
							{text: 'SEXO:', style: 'fieldLabel'},
							{text: 'masc', style: 'fieldValue'},
							{text: 'FECHA NACIMIENTO:', style: 'fieldLabel'},
							{text: '16/07/2025', style: 'fieldValue'}
						],
						[
							{text: 'PROFESION:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'NÚMERO DEPENDIENTES:', style: 'fieldLabel'},
							{text: `${data.idEdoCivil}`, style: 'fieldValue'},
							{text: 'PROFESIÓN:', style: 'fieldLabel'},
							{text: 'ninguna', style: 'fieldValue'},
							{text: 'PROFESIÓN:', style: 'fieldLabel'},
							{text: 'ninguna', style: 'fieldValue'}
						]
					]
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => '#cccccc',
					vLineColor: () => '#cccccc'
				},
				margin: [0, 5, 0, 10]
			},

			// Checkboxes de estado civil
			{
				columns: [
					{
						width: '*',
						text: [
							{text: 'SOLTERO: ', style: 'checkboxLabel'},
							{text: data.idEdoCivil === 1 ? '☑' : '', fontSize: 10},
							{text: '  CASADO: ', style: 'checkboxLabel'},
							{text: data.idEdoCivil === 2 ? '☑' : '', fontSize: 10},
							{text: '  DIVORCIADO: ', style: 'checkboxLabel'},
							{text: data.idEdoCivil === 3 ? '☑' : '', fontSize: 10},
							{text: '  UNIÓN LIBRE: ', style: 'checkboxLabel'},
							{text: data.idEdoCivil === 4 ? '☑' : '', fontSize: 10},
							{text: '  VIUDO: ', style: 'checkboxLabel'},
							{text: data.idEdoCivil === 5 ? '☑' : '', fontSize: 10}
						]
					}
				],
				margin: [0, 0, 0, 10]
			},

			// Dirección
			{
				table: {
					widths: ['15%', '25%', '15%', '25%', '20%'],
					body: [
						[
							{text: 'PROVINCIA:', style: 'fieldLabel'},
							{text: 'PICHINCHA', style: 'fieldValue'},
							{text: 'CANTÓN:', style: 'fieldLabel'},
							{text: 'QUITO', style: 'fieldValue'},
							{text: 'PARROQUIA:', style: 'fieldLabel'}
						],
						[
							{text: 'QUITO', style: 'fieldValue'},
							{text: 'SECTOR:', style: 'fieldLabel'},
							{text: 'DISTRITO METROPOLITANO', style: 'fieldValue'},
							{text: 'BARRIO:', style: 'fieldLabel'},
							{text: 'QUITO', style: 'fieldValue'}
						]
					]
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => '#cccccc',
					vLineColor: () => '#cccccc'
				},
				margin: [0, 0, 0, 10]
			},

			// Dirección detallada
			{
				table: {
					widths: ['15%', '25%', '15%', '25%', '20%'],
					body: [
						[
							{text: 'CALLE PRIN:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'NÚMERO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'CALLE SEC:', style: 'fieldLabel'}
						],
						[
							{text: '', style: 'fieldValue'},
							{text: 'TELÉFONO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'EMAIL:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'}
						],
						[
							{text: 'CARACTERÍSTICAS DE LA VIVIENDA:', style: 'fieldLabel', colSpan: 5},
							{}, {}, {}, {}
						],
						[
							{text: '', style: 'fieldValue', colSpan: 5},
							{}, {}, {}, {}
						]
					]
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => '#cccccc',
					vLineColor: () => '#cccccc'
				},
				margin: [0, 0, 0, 15]
			},

			// Referencias
			{
				table: {
					widths: ['*'],
					body: [
						[{text: 'REFERENCIAS', style: 'sectionTitle', alignment: 'center'}]
					]
				},
				layout: 'noBorders'
			},

			{
				table: {
					widths: ['30%', '20%', '20%', '30%'],
					body: [
						[
							{text: 'NOMBRES Y APELLIDOS', style: 'tableHeader'},
							{text: 'TELÉFONO', style: 'tableHeader'},
							{text: 'CELULAR', style: 'tableHeader'},
							{text: 'PARENTESCO', style: 'tableHeader'}
						],
						[
							{text: '', style: 'tableCell'},
							{text: '', style: 'tableCell'},
							{text: '', style: 'tableCell'},
							{text: '', style: 'tableCell'}
						],
						[
							{text: '', style: 'tableCell'},
							{text: '', style: 'tableCell'},
							{text: '', style: 'tableCell'},
							{text: '', style: 'tableCell'}
						]
					]
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => '#cccccc',
					vLineColor: () => '#cccccc'
				},
				margin: [0, 5, 0, 15]
			},

			// Información del Crédito
			{
				table: {
					widths: ['*'],
					body: [
						[{text: 'INFORMACIÓN DEL CRÉDITO', style: 'sectionTitle', alignment: 'center'}]
					]
				},
				layout: 'noBorders'
			},

			{
				table: {
					widths: ['15%', '20%', '15%', '20%', '15%', '15%'],
					body: [
						[
							{text: 'FECHA:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'NÚMERO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'OFICINA:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'}
						],
						[
							{text: 'MONTO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'PLAZO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'CUOTAS:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'}
						]
					]
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => '#cccccc',
					vLineColor: () => '#cccccc'
				},
				margin: [0, 5, 0, 15]
			},

			// Información Laboral
			{
				table: {
					widths: ['*'],
					body: [
						[{text: 'INFORMACIÓN LABORAL', style: 'sectionTitle', alignment: 'center'}]
					]
				},
				layout: 'noBorders'
			},

			{
				table: {
					widths: ['15%', '35%', '15%', '35%'],
					body: [
						[
							{text: 'EMPRESA:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'TIEMPO TRABAJO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'}
						],
						[
							{text: 'CARGO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'TIPO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'}
						],
						[
							{text: 'FECHA INGRESO:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'},
							{text: 'DIRECCIÓN:', style: 'fieldLabel'},
							{text: '', style: 'fieldValue'}
						]
					]
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => '#cccccc',
					vLineColor: () => '#cccccc'
				},
				margin: [0, 5, 0, 15]
			},

			// Información Financiera
			{
				table: {
					widths: ['*'],
					body: [
						[{text: 'INFORMACIÓN FINANCIERA', style: 'sectionTitle', alignment: 'center'}]
					]
				},
				layout: 'noBorders'
			},

			{
				table: {
					widths: ['25%', '25%', '25%', '25%'],
					body: [
						[
							{text: 'INGRESOS', style: 'tableHeader'},
							{text: 'EGRESOS', style: 'tableHeader'},
							{text: 'ACTIVOS', style: 'tableHeader'},
							{text: 'PASIVOS', style: 'tableHeader'}
						],
						[
							{text: '0.00', style: 'tableCell'},
							{text: '0.00', style: 'tableCell'},
							{text: '0.00', style: 'tableCell'},
							{text: '0.00', style: 'tableCell'}
						],
						[
							{text: 'SUELDO:', style: 'fieldLabel'},
							{text: '0.00', style: 'fieldValue'},
							{text: 'PATRIMONIO:', style: 'fieldLabel'},
							{text: '0.00', style: 'fieldValue'}
						]
					]
				},
				layout: {
					hLineWidth: () => 0.5,
					vLineWidth: () => 0.5,
					hLineColor: () => '#cccccc',
					vLineColor: () => '#cccccc'
				},
				margin: [0, 5, 0, 15]
			},

			// Firmas
			{
				table: {
					widths: ['50%', '50%'],
					body: [
						[
							{
								text: [
									'\n\n\n',
									{text: '____________________________\n', alignment: 'center'},
									{text: 'FIRMA DEL SOLICITANTE', style: 'fieldLabel', alignment: 'center'}
								],
								border: [false, false, false, false]
							},
							{
								text: [
									'\n\n\n',
									{text: '____________________________\n', alignment: 'center'},
									{text: 'FIRMA DEL OFICIAL', style: 'fieldLabel', alignment: 'center'}
								],
								border: [false, false, false, false]
							}
						]
					]
				},
				layout: 'noBorders',
				margin: [0, 20, 0, 0]
			}
		],
		styles: styles
	};

	return docDefinition;
};
