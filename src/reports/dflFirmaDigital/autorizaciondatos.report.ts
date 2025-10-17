import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter, DateFormatterHour } from 'src/helpers';
import { footerSection, footerSectionLeft } from '../sections/footer.section';

const logo: Content = {
    image: 'src/assets/credipoint_digital.png',
    width: 80,
    height: 50,
    margin: [20, 30]
}

const styles: StyleDictionary = {
    header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 20, 0, 10],
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

interface AutorizacionDatosReportParams {
    ciudad : string,
    dia : string,
    mes : string,
    anio : string,
    ApellidoPaterno: string,
    ApellidoMaterno: string,
    PrimerNombre: string,
    SegundoNombre: string,
    Cedula: string
}

export const autorizacionDatosReport = (params: AutorizacionDatosReportParams): TDocumentDefinitions => {
    const { ciudad, dia, mes, anio, ApellidoPaterno, ApellidoMaterno, PrimerNombre, SegundoNombre, Cedula } = params;
    
    const docDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [40, 80, 40, 60],
        header: [logo],
        content: [
            {
                text: 'AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES',
                style: 'header',
            },
            {
                text: `Yo, ${ApellidoPaterno} ${ApellidoMaterno} ${PrimerNombre} ${SegundoNombre}, con cédula de ciudadanía número ${Cedula}, por medio de la presente autorizo de manera libre, voluntaria, expresa e informada a CREDIPOINT S.A., en adelante LA EMPRESA, para que realice el tratamiento de mis datos personales, en los términos y condiciones establecidos en la Ley Orgánica de Protección de Datos Personales (LOPD) y su reglamento.`,
                style: 'content',
            },
            {
                text: `La presente autorización comprende el tratamiento de mis datos personales para las siguientes finalidades:`,
                style: 'content',
            },
            {
                ul: [
                    'Verificación de identidad y antecedentes.',
                    'Evaluación crediticia y análisis de riesgo.',
                    'Gestión y administración de productos y servicios financieros.',
                    'Cumplimiento de obligaciones legales y regulatorias.',
                    'Envío de comunicaciones relacionadas con productos, servicios, promociones y eventos de LA EMPRESA.',
                ],
                style: 'content',
            },
            {
                text: `Entiendo que LA EMPRESA adoptará las medidas de seguridad necesarias para proteger mis datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción. Asimismo, reconozco que tengo derecho a acceder, rectificar, cancelar y oponerme al tratamiento de mis datos personales, así como a revocar esta autorización en cualquier momento, mediante comunicación escrita dirigida a LA EMPRESA.`,
                style: 'content',
            },
            {
                text: `La presente autorización tiene una vigencia de dos (2) años a partir de la fecha de su firma, salvo que revoque mi consentimiento con anterioridad.`,
                style: 'content',
            },
            {
                text: `En constancia de lo anterior, firmo la presente autorización en la ciudad de ${ciudad}, a los ${dia} días del mes de ${mes} del año ${anio}.`,
                style: 'content',
            },
            {
                text: '______________________________',
                style: 'content',
            },
            {
                text: `${ApellidoPaterno} ${ApellidoMaterno} ${PrimerNombre} ${SegundoNombre}`,
                style: 'content',
            },
            {
                text: `Cédula de ciudadanía No. ${Cedula}`,
                style: 'content',
            },
        ],
        styles: styles,
    };
    return docDefinition;
}