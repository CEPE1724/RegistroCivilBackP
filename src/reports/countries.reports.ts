import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { Nomina as Data } from "src/nomina/entities/nomina.entity";
import { func } from "joi";
import { footerSection } from "./sections/footer.section";

interface ReportOptions {
    title?: string;
    subtitle?: string;
    nomina?: Data[];
}

export const getCountryReport = (

    options: ReportOptions,
): TDocumentDefinitions => {

    const { title, subtitle, nomina } = options;
    return {

        pageOrientation: 'landscape',
        header: headerSection({
            title: title ?? 'Countries Report',
            subtitle: subtitle ?? 'List of Countries',

        }),
        footer: footerSection,
        pageMargins: [40, 110, 40, 60],
        content: [{
            layout: 'customLayout01',
            table: {
                headerRows: 1,
                widths: [50, 50, 50, '*', 'auto', '*'],
                body: [
                    ['idNomina', 'NIdentificacion', 'idPersonal', 'ApellidoPaterno', 'ApellidoMaterno', 'PrimerNombre'],
                    ...nomina.map(item => [
                        item.idNomina,
                        { text: item.NIdentificacion, bold: true },
                        item.idPersonal,
                        item.ApellidoPaterno,
                        item.ApellidoMaterno,
                        item.PrimerNombre
                    ]),

                ]
            }

        },
        {
            text: 'Total: ',
            style: {
                fontSize: 18,
                bold: true,
                margin: [0, 40, 0, 0],
            }
        },
        {
            layout: 'noBorders',
            table: {
                headerRows: 1,
                widths: [50, 50, 70, '*', 'auto', '*'],
                body: [
                    [
                        {
                            text: 'Total de registros ',
                            colSpan: 2,
                            bold: true,
                        },
                        {},{},
                        {
                            text: nomina.length.toString(),
                            bold: true,

                        },
                        {},{}
                    ]
                ]

            }
        }

        ]
    }

};