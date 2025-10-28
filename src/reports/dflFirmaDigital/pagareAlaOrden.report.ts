import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';


const styles: StyleDictionary = {

	content: {
		fontSize: 7,
		margin: [0, 5, 0, 0],
		alignment: 'justify',
	},
	bold: {
		bold: true,
	},
};

interface PagareALaOrdenReportParams {
	TasaNominal: string,
	TasaEfectiva: string,
	Nombre: string,
	Cedula: string,
	Celular: string,
	TasaNominal2: string,
	TasaEfectiva2: string,
	Total: number,
	TotalLetras: string,
	NumCuotas: number,
	ValorCuotas: number,
	Cuotaletras: string,
	PrimerPago: Date,
	UltimoPago: Date,
	CiuMesAnio: string
}



export const PagareALaOrdenReport = (params: PagareALaOrdenReportParams): TDocumentDefinitions => {
	const { TasaNominal, TasaEfectiva, Nombre, Cedula, TasaNominal2, TasaEfectiva2, Total, TotalLetras, NumCuotas, ValorCuotas, Cuotaletras, PrimerPago, UltimoPago, CiuMesAnio } = params;

	function formatearFecha(fecha: Date): string {
		return fecha.toLocaleDateString('es-ES', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	}

	const docDefinition: TDocumentDefinitions = {
		pageSize: 'A4',
		pageMargins: [25, 15, 15, 20],
		content: [
			{
				columns: [
					{ width: '*', text: '' },

					{
						width: 'auto',
						text: 'PAGARE A LA ORDEN CON VENCIMIENTOS SUCESIVOS',
						alignment: 'center',
						bold: true,
						fontSize: 10,
						margin: [0, 0, 30, 0]
					},
					{
						width: 'auto',
						text: `TASA NOMINAL ANUAL:		${TasaNominal}\nTASA EFECTIVA ANUAL: 	${TasaEfectiva}\nPOR.-US$		${Total}`,
						alignment: 'right',
						fontSize: 8,
					}
				]
			},
			{
				text: `Debo(emos) y pagaré(mos) en esta ciudad o en el lugar que se me(nos) reconvenga, a la orden de SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA, (en adelante simplemente el Acreedor), la suma de ${TotalLetras} dólares de los Estados Unidos de América (US$ ${Total}), Dejo(amos) expresa constancia de que la obligación contenida en este pagaré ha sido pactada con la tasa de interés nominal del ${TasaNominal2}% anual, equivalente a la tasa de interés efectiva de ${TasaEfectiva2}, siendo de mi(nuestra) cuenta todos los tributos que cause este pagaré. `,
				style: 'content',
			},
			{
				text: `Me (nos) obligo(amos) a pagar la suma señalada más los respectivos intereses, mediante ${NumCuotas} pagos, en dividendos mensuales de (US$ ${ValorCuotas}), ${Cuotaletras} dólares de los Estados Unidos de América dividendos que se vencen entre el ${formatearFecha(PrimerPago)} y el ${formatearFecha(UltimoPago)}, Inclusive.`,
				style: 'content',
			},
			{
				text: `El valor de cada dividendo comprende una cuota de capital y una de Intereses, y deberá ser pagado en los vencimientos previstos.`,
				style: 'content',
			},
			{
				text: `En caso de mora en el pago de cualquiera de los dividendos señalados en este pagaré a la orden, pagaré (mos) adicionalmente, desde la fecha de vencimiento de cada dividenda hasta la completa cancelación del mismo, el máximo interés moratorio vigente a la fecha del vencimiento respectivo, calculado de acuerdo a lo dispuesto en las leyes y regulaciones pertinentes, sobre el valor del capital vencido y no pagado.`,
				style: 'content',
			},
			{
				text: `Además, en caso de mora en el pago del total o de parte de uno o más de los dividendos antes Indicados, o de cualquier otra obligación adeudada por ml(nosotros) a favor del Acreedor, reconozco(cemos) el derecho del Acreedor para la aceleración o anticipación de los vencimientos de los dividendos por vencer, por lo cual el Acreedor podrá declarar de plazo vencido anticipadamente la totalidad de la obligación constante en este pagarė, y requerir judicial o extrajudicialmente el pago del valor total de este pagaré, incluidos capital. Intereses corrientes, los correspondientes intereses de mora, costas y honorarios de abogado y/o de cobranzas. La sola afirmación del Acreedor será prueba suficiente para la mora y la declaratoria de vencimiento anticipado del plazo. Al efecto renuncio (amos) al derecho del plazo que el Acreedor me(nos) ha concedido.`,
				style: 'content',
			},
			{
				text: `Me(nos) obligo(amos) también a pagar todos los gastos judiciales y extrajudiciales, y honorarios profesionales que ocasione su cobro, siendo suficiente prueba para establecer tales gastos y montos la sola aseveración del Acreedor. El pago no podrá hacerse por partes ni aún por mis(nuestros) herederos o sucesores. Al fiel cumplimiento de lo estipulado me(nos) obligo(amos) con todos mis (nuestros) bienes presentes y futuros.`,
				style: 'content',
			},
			{
				text: `Autorizo (amos) expresamente al Acreedor para que obtenga de y/o valide con cualquier fuente de información, incluida la Central de Riesgos y Burós de Información Crediticia autorizados a operar en el país, personas naturales y jurídicas, establecimientos de comercio, personas señaladas como mis(nuestras) referencias personales, Instituciones financieras, de crédito, de cobranza, compañías de Informes, compañías emisoras o administradoras de tarjetas de crédito y otras entidades, sobre mi(nuestro) comportamiento crediticio, manejo de cuentas corrientes, de ahorro, tarjetas de crédito, etc., y en general al cumplimiento de mis(nuestras) obligaciones y demás activos, pasivos y datos personales. De igual forma, el Acreedor queda expresamente autorizado para que pueda utilizar, transferir o entregar dicha información a las mismas personas o entidades, así como para que pueda hacer público mi(nuestro) comportamiento crediticio.`,
				style: 'content',
			},
			{
				text: `Además faculto(amos) al Acreedor para que al vencimiento de cada uno de los dividendos de esta obligación pueda debitar de cualquier valor, depósito o inversión que yo(nosotros) mantenga (mos) en el Acreedor, sin previo aviso e incluso mediante precancelación, la cantidad de dinero necesaria para cancelar o abonar a esta obligación y los intereses, costos y gastos generados directa o indirectamente por la misma o por su ejecución o cobro, y sin para ello deba dar aviso alguno o recibir nuevas autorizaciones.`,
				style: 'content',
			},
			{
				text: `En caso de transferencia del presente pagaré, el endosatario queda expresamente facultado para realizar las mismas actividades establecidas para el Acreedor.`,
				style: 'content',
			},
			{
				text: `Para el caso de juicio hago(cemos) una renuncia general de domicilio y quedo(amos) sometido(s) a los jueces o tribunales del lugar donde me(nos) encuentre (mos), o a los de la ciudad donde suscribo(mos) este pagaré a la orden, o a los de la Ciudad que elija el Acreedor al momento de demandar, y al trámite ejecutivo o verbal sumario a elección del Acreedor o del último endosatario del documento. Sin protesto. Eximo(mimos) al Acreedor y a los endosatarios de obligación de presentación para el pago y de aviso por falta del mismo.`,
				style: 'content',
			},
			{
				text: `${CiuMesAnio}`,
				style: 'content',
				margin: [0, 5, 0, 30],
			},
			{
				text: `_________________________________________________________________________
				Nombres: ${Nombre}
				C.I. ${Cedula}
				Dirección: 
				VISTO BUENO
				${CiuMesAnio}`,
				style: 'content',
				margin: [0, 5, 0, 25],
			},
			{
				text: `_________________________________________________________________________
				Nombres: ${Nombre}
				C.I. ${Cedula}`,
				style: 'content',
			},
			{
				text: `POR AVAL me (nos) constituyo (Irnos) solidariamente responsable(s) con el suscriptor(es) por el cumplimiento de todas las obligaciones constantes en el pagaré que antecede. Renuncio(amos) a los beneficios de domicilio, fuero, orden, excusión y división y quedo (amos) sometidos a los jueces de la ciudad de QUITO y el juicio ejecutivo o verbal sumario a elección del demandante. Exímese de presentación para el pago. Sin protesto.`,
				style: 'content',
				margin: [0, 5, 0, 10],
			},
			{
				text: `En ____________________, a los _________________ dias del mes de __________________  del  ____________________`,
				style: 'content',
				margin: [0, 5, 0, 20],
			},
			{
				columns: [
					{
						width: '*',
						text: `Garante solidario f.  __________________________________________________
						Nombres:
						C.l.`,
						style: 'content',
					},
					{
						width: '*',
						text: `Garante solidario f.  __________________________________________________
						Nombres:
						C.l.`,
						style: 'content',
					},
				],
				margin: [0, 5, 0, 10],
			},
			{
				text: `Paguese a la orden de _______________________________________________ , por valor recibido y con nuestra responsabilidad, en QUITO a los _________________________________
				Atentamente,`,
				style: 'content',
				margin: [0, 5, 0, 40],
			},
			{
				text: `SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA
				R.U.C: 1791774582001`, bold: true, fontSize: 7
			},
		],
		styles: styles,
	};
	return docDefinition;
}