import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';


const styles: StyleDictionary = {
	header: {
		fontSize: 12,
		bold: true,
		alignment: 'center',
		margin: [0, 20, 0, 45],
	},
	content: {
		fontSize: 11,
		margin: [0, 5, 0, 5],
		alignment: 'justify',
	},
};

interface actaEntregaDocsReportParams {
	Nombre: string,
	Cedula: string,
	Celular: string,
	nombreVendedor: string,
	CedulaVendedor: number,
	Fecha: Date
}



export const actaEntregaDocsReport = (params: actaEntregaDocsReportParams): TDocumentDefinitions => {
	const { Nombre, Cedula, nombreVendedor, CedulaVendedor, Fecha } = params;

	function formatearFecha(fechaStr: Date): string {
  const fecha = new Date(fechaStr);

  if (isNaN(fecha.getTime())) {
    throw new Error('Fecha inválida');
  }

  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();

  return `${horas}:${minutos} horas de fecha ${dia}/${mes}/${anio}`;
}


	const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [50, 17, 70, 20],
		content: [
			{
				text: 'ACTA ENTREGA RECEPCIÓN DE DOCUMENTOS DE CRÉDITO',
				style: 'header',
			},
			{
				text: `Mediante la presente acta, se deja constancia que la compañía SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CÍA. LTDA., a las ${formatearFecha(Fecha)} entrega al señor/a ${Nombre} copias de todos los documentos que sirvieron para otorgar su crédito para adquisición de productos mediante compra en uno de los distintos locales comerciales a nivel nacional de acuerdo a las siguientes especificaciones:`,
				style: 'content',
				margin: [0, 5, 0, 30],
			},
			{
				stack: [
					'☐ Pagaré a la orden',
					'☐ Tabla de amortización',
					'☐ Gastos de cobranza',
					'☐ Declaración y compromiso',
					'☐ Contrato con reserva de dominio',
					'☐ Compromiso lugar de pago',
					'☐ Autorización de revisión de buró',
					'☐ Consentimiento informado para el tratamiento de datos personales en obligaciones de crédito',
					
				],
				style: 'content',
				margin: [0, 5, 0, 15],
			},
			{
				text: `De igual manera, el cliente mediante el presente documento, deja constancia y autoriza expresamente la compañía SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CÍA. LTDA., para que esta a través de su personal pueda contactarlos de manera telefónica, visitas en persona al domicilio o lugar de trabajo, mensajes de texto, WhatsApp o correo electrónico, incluso fines de semana o feriados. Para constancia de que se reciben los documentos antes mencionados y los productos a entera satisfacción del cliente, firman las partes:`,
				style: 'content',
				margin: [0, 5, 0, 50],
			},
			{
				columns: [
					{
						width: '*',
						text: `Entregue conforme:`,
						style: 'content',
					},
					{
						width: '*',
						text: `Recibí conforme:`,
						style: 'content',
					},
				],
				margin: [0, 5, 0, 85],
			},
			{
				columns: [
					{
						width: '*',
						text: `Firma: _______________________________________
						Nombre: ${nombreVendedor}
						Cargo: VENDEDOR
						Cédula: ${CedulaVendedor}`,
						style: 'content',
						fontSize: 9
					},
					{
						width: '*',
						text: `Firma: _______________________________________
						Nombre: ${Nombre}
						Cargo: CLIENTE
						Cédula: ${Cedula}`,
						style: 'content',
						fontSize: 9
					},
				],
				margin: [0, 5, 0, 10],
			},			
		],
		styles: styles,
	};
	return docDefinition;
}