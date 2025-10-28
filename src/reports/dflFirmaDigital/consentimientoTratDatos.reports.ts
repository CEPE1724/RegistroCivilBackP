import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';


const styles: StyleDictionary = {
	header: {
		fontSize: 12,
		bold: true,
		alignment: 'center',
		margin: [0, 0, 0, 20],
	},
	content: {
		fontSize: 11,
		margin: [0, 5, 0, 10],
		alignment: 'justify',
	},
	bold: {
		bold: true,
	},
};

interface ConsentimientoTratDatosReportParams {
	Nombre: string,
	Cedula: string,
	Celular: string
}

export const ConsentimientoTratDatosReport = (params: ConsentimientoTratDatosReportParams): TDocumentDefinitions => {
	const { Nombre, Cedula, Celular } = params;

	const date = new Date();
	const pad = (n: number) => n.toString().padStart(2, '0');
	const dateStr = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

	const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [65, 47, 60, 50],
		content: [
			{
				text: `Consentimiento informado para el tratamiento de datos personales y autorización para el tratamiento a 
				SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA`,
				style: 'header',
			},
			{
				text: [`Por medio de la presente, yo ${Nombre}, con cédula de ciudadania No. ${Cedula}, declaro haber sido adecuadamente informado sobre las finalidades específicas para las cuales he proporcionado voluntariamente mis datos personales a `,
				{ text: 'SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA', bold: true },
					', y ratifico que otorgo mi consentimiento libre, voluntario, previo, informado, expreso e inequívoco, para que ',
				{ text: 'SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA', bold: true },
					' trate mis datos personales, incluyendo la recopilación, almacenamiento, análisis, actualización, procesamiento, transferencia y eliminación, los cuales serán utilizados con la finalidad de evaluar la concertación de negocios, mi conducta comercial o mi capacidad de pago, prestarme el servicio requerido, concluir la adquisición de los productos requeridos, y realizar las correspondientes acciones de cobranza frente a las obligaciones crediticias en firme que tenga con dicha compañía o en virtud de la relación comercial existente.'],
				style: 'content',
			},
			{
				text: [`Los datos objeto de tratamiento no serán utilizados para finalidades distintas o incompatibles con las arriba mencionadas y que motivaron su obtención. Los datos que he entregado a `,
					{ text: 'SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA', bold: true },
					` son proporcionales, pertinentes y mínimos con respecto de la finalidad para la cual se recaban, y podrán ser transferidos a ___________________________________ para la ejecución de obligaciones crediticias existentes.`],
				style: 'content',
			},
			{
				text: [`Entiendo y acepto que los datos personales que he proporcionado a `,
					{ text: 'SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA', bold: true },
					` serán utilizados para procesos pre-contractuales, contractuales y post-contractuales, comerciales, y financieros, entre los que se incluye expresamente la facultad de transferir los datos relacionados con obligaciones crediticias pendientes a Instituciones Financieras, mediante el proceso legal de compra-venta de cartera.`],
				style: 'content',
			},
			{
				text: [`Consecuentemente, autorizo expresamente a `,
					{ text: 'SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA', bold: true },
					` a compartir mis datos personales relacionados con obligaciones crediticias vencidas y exigibles con terceros, sean estos persona natural o jurídica, pública o privada que `,
					{ text: 'SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA', bold: true },
					` determine, para su tratamiento de acuerdo con las finalidades descritas.`],
				style: 'content',
			},
			{
				text: [`Reconozco y declaro que `,
					{ text: 'SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA', bold: true },
					` no me ha solicitado ningún dato sensible de salud, limitándose a recopilar y tratar los datos personales pertinentes para la oferta comercial que yo he requerida`],
				style: 'content',
			},
			{
				text: `Los datos personales serán conservados por el tiempo necesario para el cumplimiento de las finalidades para las cuales fueron recopilados y para el cumplimiento de las obligaciones legales y contractuales o para la defensa en procedimientos judiciales. La Compañía será responsable de establecer todas las medidas técnicas y organizativas para garantizar la seguridad de la información recabada`,
				style: 'content',
				margin: [0, 5, 0, 200],
			},
			{
				text: [`Reconozco que he sido informado en el momento de la recolección de mis datos personales, sobre su incorporación la base preparada por el responsable, para su legítimo tratamiento. Como usuario, he sido informado sobre mis derechos de acceso, rectificación, actualización, oposición o eliminación, los cuales pueden ser ejercidos en cualquier momento, para lo que será necesario una petición formal ante `,
					{ text: 'SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA', bold: true },
					`. Esta autorización podrá ser revocada, rectificada o actualizada en cualquier momento mediante comunicación escrita, telefónica o electrónica dirigida a`,
					{ text: 'CLAUDIA SOLEDAD JARA ORNA.', bold: true }],
				style: 'content',
				margin: [0, 47, 0, 10]
			},
			{
				text: `Dado en QUITO, el ${dateStr}`,
				style: 'content',
				margin: [0, 5, 0, 200]
			},
			{
				text: `Firma:
					Nombre: ${Nombre}
				Cédula de ciudadanía: ${Cedula}
				Número de teléfono: ${Celular}`,
				style: 'content',
			},
		],
		styles: styles,
	};
	return docDefinition;
}