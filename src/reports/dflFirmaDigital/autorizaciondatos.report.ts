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
    ciudad: string,
    dia: string,
    mes: string,
    anio: string,
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
        pageMargins: [80, 150, 72, 72],
        header: {
            margin: [72, 50, 72, 20],
            table: {
                widths: ['40%', '60%'],
                body: [
                    [
                        {
                            image: 'src/assets/point.png',
                            width: 120,
                            height: 50,
                            alignment: 'left',
                            margin: [0, 0, 0, 0],
                        },
                        {
                            fontSize: 15,
                            bold: true,
                            text: 'AUTORIZACIÓN PARA REVISIÓN DE INFORMACIÓN CREDITICIA Y DEPÓSITOS',
                            style: 'header',
                            alignment: 'left',
                            margin: [0, 10, 10, 0],
                        },
                    ],
                ],
            },
            layout: {
                hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 1 : 0;
                },
                vLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 1 : 0;
                },
                hLineColor: function (i, node) {
                    return (i === 5 || i === node.table.body.length) ? 'black' : null;
                },
                vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : null;
                },
            },
        },

        content: [
            {
                text: `En la ciudad de ${ciudad}, a ${dia} de ${mes} de ${anio}`,
                style: 'content',
                lineHeight: 1.5,
            },
            {
                text: `Yo, ${ApellidoPaterno} ${ApellidoMaterno} ${PrimerNombre} ${SegundoNombre}, con cédula de ciudadanía N.- ${Cedula}, de manera libre y voluntaria autorizo a SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA, para que acceda, revise y/o analice mi información crediticia que incluye el estado y evolución de los pagos y retrasos que consten en cualquier entidad u organismo público o privado de registros crediticios, incluido cualquier Buró de Información de Créditos o Central de riesgos.`,
                style: 'content',
                lineHeight: 1.5,
            },
            {
                text: `Adicional autorizo expresamente a SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA, para que acceda, solicite, revise y/o analice los depósitos que mantenga bajo cualquier modalidad en cualquier entidad financiera del Ecuador o del exterior.`,
                style: 'content',
                lineHeight: 1.5,
            },
            {
                text: `Esta información deberá ser utilizada exclusivamente para el cumplimiento de las normas legales de prevención de lavado de activos y financiamiento de delitos incluido el terrorismo.`,
                style: 'content',
                lineHeight: 1.5,
            },
            {
                text: `En virtud de la autorización otorgada renuncio expresamente a iniciar o continuar cualquier tipo de acción administrativa o judicial en contra de SUPERMERCADO DE COMPUTADORAS COMPUBUSSINES CIA. LTDA, o en contra de sus Directivos, profesionales contratados o empleados por el uso de información referida en este documento.`,
                style: 'content',
                lineHeight: 1.5,
            },
            {
                text: 'Atentamente:',
                style: 'content',
                margin: [0, 20, 0, 5],
                lineHeight: 1.5,
            },
            {
                text: '______________________________',
                style: 'content',
                lineHeight: 1.5,
            },
            {
                text: 'FIRMA',
                style: 'content',
                lineHeight: 1.5,
            },
            {
                text: `${ApellidoPaterno} ${ApellidoMaterno} ${PrimerNombre} ${SegundoNombre}`,
                style: 'content',
            
            },
            {
                text: `CC: ${Cedula}`,
                style: 'content',
                
            },
        ],
        styles: styles,
    };
    return docDefinition;
}