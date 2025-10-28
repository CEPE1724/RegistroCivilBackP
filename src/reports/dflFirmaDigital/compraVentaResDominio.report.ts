import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

const styles: StyleDictionary = {
	header: {
		fontSize: 17,
		bold: true,
		alignment: 'center',
		margin: [0, 9, 0, 43],
	},
	content: {
		fontSize: 9,
		margin: [0, 5, 0, 5],
		alignment: 'justify',
		lineHeight: 1.2,
	},
	bold: {
		bold: true,
	},
};

export const compraVentaResDominioReport = () => {

	const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [40, 20, 35, 60],
		content: [
			{
				text: `CONTRATO DE COMPRA - VENTA CON RESERVA DE DOMINIO`,
				style: 'header',
			},
			{
				text: [`En la ciudad de Quito, a los .................................................................................................... comparecen a celebrar, como en efecto celebran, el presente Contrato de Compra Venta con Reserva de Dominio, las siguientes personas:`],
				style: 'content',
			},
			{
				text: [{ text: 'PRIMERA.- COMPARECIENTES.-', bold: true },
					`En adelante referido como EL VENDEDOR, la compañía SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA. (RUC No. .....................) legalmente representada por su Gerente el Ing. Eduardo José Veintimilla Tello, con domicilio en la Av. 10 de Agosto N 19-86 y Río de Janeiro de esta ciudad de Quito, y por otra parte referido como EL COMPRADOR el señor ................................................................................................................................................................................... `,
					`Ecuatoriano, mayor de edad, ocupación/profesión ................................................................................ `,
					`domiciliado en esta ciudad (calle) ................................................................................................................................................................................... A quien también se llamará deudor.`],
				style: 'content',
			},
			{
				text: [{ text: 'SEGUNDA. DESCRIPCIÓN DE LOS BIENES: EL VENDEDOR.-', bold: true },
					`Vende con Reserva de Dominio, y entrega AL COMPRADOR/DEUDOR, los bienes muebles, cuyas características y valor se describen: ................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................`],
				style: 'content',
			},
			{
				text: [{ text: 'TERCERA.- COMPRAVENTA:', bold: true },
					`El propietario vende los objetos detallados en la cláusula que anteceden al comprador .................................................................................................................................................................................................. `, `Reservándose el derecho de dominio que tiene sobre ellos la total cancelación del precio estipulado es decir, que la venta se perfeccionará en el instante en que sea cubierta la totalidad del precio pactado.`],
				style: 'content',
			},
			{
				text: [{ text: 'CUARTA.- PRECIO:', bold: true },
					`el precio pactado por los objetos materiales de la compraventa es el de ...............................................................................................................................................................................................................`],
				style: 'content',
			},
			{
				text: [{ text: 'QUINTA.- RECEPCIÓN Y DOMICILIO: EL COMPRADOR', bold: true },
					` declara que ha recibido EL BIEN/BIENES descritos en la cláusula SEGUNDA, a su entera satisfacción, y en perfecto estado de funcionamiento y se obliga a conservarlo y mantenerlo durante la vigencia de este contrato en su domicilio determinado en la comparecencia, con el compromiso irrevocable de notificar al VENDEDOR, cualquier cambio de su domicilio o residencia a más tardar dentro de los ocho días posteriores a dicho cambio; en ningún caso podrá el comprador sacar fuera del país lo que es objeto de este contrato, ni entregarlo a otras personas sin el permiso del vendedor.`],
				style: 'content',
			},
			{
				text: [{ text: 'SEXTA. OTRAS OBLIGACIONES DEL COMPRADOR.', bold: true },
					`Adicionalmente, a las otras obligaciones pactadas anteriormente, EL COMPRADOR, se obliga a: 1.- Presentar el BIEN MUEBLE, cuantas veces sea exigido por el VENDEDOR. 2.- Asegurar el bien (es) contra todo riesgo. 3.- Pagar todos los impuestos que cause la inscripción del presente contrato en el Registro Mercantil, así como el levantamiento y cancelación de la reserva de dominio. 4.- Estos últimos trámites son de responsabilidad de EL COMPRADOR. 5.- Pagar todos los costos y gastos que demande el cobro judicial y extrajudicial de los valores en mora que se encuentran pendientes de pago por parte de EL COMPRADOR.`],
				style: 'content',
			},
			{
				text: [{ text: 'SÉPTIMA.- RESERVA DE DOMINIO:', bold: true },
					`El vendedor se reserva el dominio de lo vendido hasta que el comprador haya pagado la totalidad del precio. El comprador adquirirá el dominio, esto es, será dueño de la cosa vendida únicamente cuando, haya pagado la totalidad del precio, y podrá, entonces pedir al vendedor que le otorgue el respectivo Título de Propiedad. Sin embargo, el comprador asume los riesgos que corre tal cosa desde la fecha de este contrato por haberla recibido del poder del vendedor. En consecuencia el comprador no podrá verificar contrato alguno de venta permuta, arrendamiento, prenda, etc., sobre lo que es objeto de este contrato mientras no haya pagado la totalidad del precio.`],
				style: 'content',
			},
			{
				text: [{ text: 'OCTAVA. LEGISLACIÓN.-', bold: true },
					`En todo lo no previsto en este Contrato, las partes se someten a la sección V del título Il del Libro Segundo del Código del Comercio "De la venta con reserva de Dominio" y más normas legales vigentes a la fecha de suscripción del presente Contrato.`],
				style: 'content',
			},
			{
				text: [{ text: 'NOVENA.- DOMICILIO JURISDICCIÓN Y COMPETENCIA.-', bold: true },
					`Las partes renuncian fuero y domicilio y se someten a los Jueces de lo Civil competentes del lugar donde se celebre el presente Contrato.`],
				style: 'content',
			},
			{
				text: [{ text: 'DÉCIMA.- CLÁUSULA ELEMENTAL.-', bold: true },
					`Con pleno valor vinculante y consciente de las responsabilidades que ello genera EL COMPRADOR declara bajo juramento que los recursos y fondos que emplee para pagar las cuotas mensuales así como las otras obligaciones económicas que asumen frente a EL VENDEDOR tienen y tendrán fuente y origen lícito, y que no provienen o provendrán de operaciones o actividades reprimidas por la ley, especialmente no de aquellas reprimidas por la legalización cobre substancias estupefacientes o psicotrópicas.`],
				style: 'content',
			},
			{
				text: [{ text: 'DÉCIMA PRIMERA: ADICIONES Y AUTORIZACIÓN.-', bold: true },
					`De conformidad con el Art. Innumerado Décimo Primero de la Sección V Título 11 Libro 11 del Código de Comercio vigente, EL COMPRADOR deja de manifiesto y reconoce que cuando por incumplimiento de cualquiera de una de sus obligaciones previstas en este Contrato o en la legalización vigente EL BIEN MUEBLE volviese a poder de EL VENDEDOR, el aumento del valor de BIEN MUEBLE así como todas las adiciones e incorporaciones al mismo, quedarán en beneficio de EL VENDEDOR.`],
				style: 'content',
			},
			{
				text: [{ text: 'DÉCIMA SEGUNDA: RATIFICACIÓN Y AUTORIZACIÓN.-', bold: true },
					`EL COMPRADOR autoriza a EL VENDEDOR para que, una vez que las obligaciones previstas en el presente Contrato hayan sido pagadas y canceladas en su totalidad, los documentos originales que corresponda, incluyendo el presente Contrato debidamente cancelado y las respectivas cartas de cancelación y levantamiento de la reserva de dominio, sean remitidos lugar en el cual se efectúo la compra a efectos de que EL COMPRADOR proceda, a su sola responsabilidad y costo, a realizar personalmente los trámites de cancelación y levantamiento de la reserva de dominio.`],
				style: 'content',
			},
			{
				text: [{ text: 'DÉCIMA TERCERA: CESIÓN Y ASIGNACIÓN.-', bold: true },
					`EL COMPRADOR autoriza a EL VENDEDOR para que a la sola voluntad de este y sin requerimiento de notificación alguna a EL COMPRADOR, ceda, transfiera, asigne, enajene o negocie a cualquier título o modalidad el presente Contrato, y los consiguientes derechos y créditos contenidos por el mismo, en cualquier tiempo, a favor de cualquier persona natural o jurídica, pública o privada. En este sentido y al declararse notificado, EL COMPRADOR desde ya acepta tales cesiones, transferencias, asignaciones, enajenaciones y negociaciones, a los efectos previstos por los Artículos 1841 al 1849 de la codificación vigente del Código Civil, así como a los demás efectos legales y de todo otro orden que procedan. Así, EL COMPRADOR para todos los fines legales del caso, y con pleno valor legal vinculante: (a) reconoce como válidas las referidas cesiones, transferencias, asignaciones, enajenaciones y negociaciones; (b) renuncia a cualquier derecho que tuviese de requerir notificación judicial u otra de las cesiones, transferencias. asignaciones, enajenaciones y negociaciones que EL VENDEDOR haga o pueda hacer respecto de este Contrato; y (c) se compromete a realizar los pagos contemplados en el presente Contrato al nuevo acreedor del mismo, al solo requerimiento de este, sin alegar ineficacia alguna de las cesiones, transferencias, asignaciones, enajenaciones y negociaciones de este Contrato por falta de notificación y/o aceptación de las mismas.

					Las partes se ratifican en el contenido de este Contrato de Compra Venta con Reserva de Dominio, y autorizan a EL VENDEDOR para que realice cuanto trámite sea necesario para obtener la inscripción del presente Contrato en el Registro Mercantil.

					De conformidad con las disposiciones y las cláusulas que anteceden, las partes suscriben este documento en tres ejemplares de igual tenor y valor, en la ciudad y la fecha arriba indicadas.`],
				style: 'content',
			},
			{
				text: [`VENDEDOR
					SUPERMERCADO DE COMPUTADORAS CIA. LTDA.`],
				style: 'content',
				margin: [0, 45, 0, 5],
			},
			{
				text: [{ text: '', bold: true },
					`COMPRADOR




					f)

					CI.`],
				style: 'content',
				margin: [0, 50, 0, 5],
			},


		],
		styles: styles,
	};
	return docDefinition;
}