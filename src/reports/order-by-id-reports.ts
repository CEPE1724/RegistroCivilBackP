import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { CurrencyFormatter, DateFormatter } from "src/helpers";
import { footerSection } from "./sections/footer.section";
import { Data } from "ejs";
import { Nomina } from "src/nomina/entities/nomina.entity";
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
        margin: [0, 30, 0, 0],
    },
    subHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 10],
    },
}

interface ReportValues {
    title?: string;
    subtitle?: string;
    data: Data
}

export const orderByIdReports = (value: ReportValues ): TDocumentDefinitions => {
    const { title, subtitle, data } = value;
    return {
        styles: styles,
        header: logo,
        pageMargins: [40, 100, 40, 60],
        footer: footerSection,
        content: [
            {
                text: 'POINT TECHNOLOGY',
                style: 'header',
            },
            {
                columns: [
                    {
                        text: '15 Month Street, Suite 100\nNew York, NY 10001\nPhone: (123) 456-7890\nEmail:'
                    },
                    {
                        text: [
                            { text: `Recibo N° 123131 \n`, bold: true },
                            `Fecha del Recibo: ${DateFormatter.getDDMMYYYY(new Date())}\nPagar antes de: ${DateFormatter.getDDMMYYYY(new Date())}\n\n`

                        ],
                        alignment: 'right',
                    },


                ]
            },

            {
                qr: 'https://www.pointtechnology.com', fit: 75, alignment: 'right'
            },
            {
                text: [
                    {
                        text: 'Cobrar a: \n',
                        style: 'subHeader'
                    },
                    `Razón social: Edison Cepeda 
                             10 de agosto de 2023 `,
                ]

            },
            // table con detalles del recibo
            {
                layout: 'headerLineOnly',
                margin: [0, 30],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripción', 'Cantidad', 'Precio Unitario', 'Total'],
                        ['1', 'Servicio de Consultoría', 2, '10', CurrencyFormatter.formatCurrency(200)],
                        ['2', 'Desarrollo de Software', 1, '5', CurrencyFormatter.formatCurrency(500)],
                        ['3', 'Mantenimiento Mensual', 3, '8',
                            {
                                text: CurrencyFormatter.formatCurrency(150),
                                alignment: 'right',
                            }
                        ],
                    ]

                }

            },
            // salto d elinea
            '\n\n',
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                [
                                    'subtotal',
                                    {
                                        text: CurrencyFormatter.formatCurrency(120),
                                        alignment: 'right',
                                    }
                                ],
                                 [
                                    {text: 'Total', bold: true},
                                    {
                                        text: CurrencyFormatter.formatCurrency(150),
                                        alignment: 'right',
                                        bold: true,
                                    }
                                ]
                            ]
                        }
                    }

                ]
            }
        ]
    }


}