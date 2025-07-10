import { Body } from "@nestjs/common";
import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";
import { headerSection } from "./sections/header.section";

interface ReportValues {
    employerName: string;
    employerPosition: string;
    companyName: string;
    employeeName: string;
   
    
}
const styles: StyleDictionary = {
    header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 60, 0, 20],
    },
    body: {
        alignment: 'justify',
        margin: [0, 0, 0, 70],
    },
    signature: {
        fontSize: 14,
        bold: true,
        alignment: 'left'
    },
    footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 0, 0, 20],
    },

}

export const getEmploymentLetterByIdReport = (values: ReportValues): TDocumentDefinitions => {
    const {
        employerName,
        employerPosition,
        companyName,
        employeeName,
    } = values;
    const docDefinition: TDocumentDefinitions = {
        styles: styles,
        pageMargins: [40, 60, 40, 60],
        header: headerSection({
            showLogo: false,
            showDate: true,
            title: 'CONSTANCIA DE EMPLEO',
        }),

        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'header',
            },
            {
       
                text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${companyName}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el [Fecha de Inicio del Empleado]. \n\n
                      Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
                      La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n
                      Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
                style: 'body',
            },

            { text: 'Atentamente', style: 'signature' },
            { text: '[Nombre del Empleador]', style: 'signature' },
            { text: '[Cargo del Empleador]', style: 'signature' },
            { text: '[Nombre de la Empresa]', style: 'signature' },
            { text: '[Fecha de Emisión]', style: 'signature' },



        ],

        footer:{
            text: 'Este documento es una constancia de empleo y no constituye un contrato laboral.',
            style: 'footer',
        }
    }

    return docDefinition;
}