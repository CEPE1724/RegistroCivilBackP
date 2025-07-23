

import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter, DateFormatterHour } from 'src/helpers';
import { footerSection, footerSectionLeft } from './sections/footer.section';

const logo: Content = {
    image: 'src/assets/credipoint_digital.png',
    width: 80,
    height: 50,
    margin: [20, 30]
}
const parentescoMap: Record<number, string> = {
    1: 'ABUELO/ABUELA',
    2: 'AMIGO / AMIGA',
    3: 'COMPAÑERO DE TRABAJO',
    4: 'CONOCIDO/VECINO',
    5: 'CONVIVIENTE',
    6: 'CUÑADO / CUÑADA',
    7: 'CÓNYUGE',
    8: 'HIJO/HIJA',
    9: 'HERMANO / HERMANA',
    10: 'MADRE',
    11: 'NIETO / NIETA',
    12: 'NO DEFINIDO',
    13: 'NUERA',
    14: 'PADRE',
    15: 'PRIMO / PRIMA',
    16: 'SOBRINO / SOBRINA',
    17: 'SUEGRO/SUEGRA',
    18: 'TIO / TIA',
    19: 'YERNO',
    20: 'CLIENTE',
    21: 'OTRA PERSONA'
};
export function getParentescoNombre(idParentesco: number): string {
    return parentescoMap[idParentesco] || 'DESCONOCIDO';
}
interface Referencia {
    observacionMaestro: string;
    telefonoMaestro: string;
    parentesco: number;
    fechaVerificacion: Date;
    observacionesDetalle: string;
}
interface ReportValues {
    title?: string;
    subtitle?: string;
    data: {
        Nombre: string;
        Cedula: string;
        Celular: string;
        Fecha: Date;
        Afiliacion: string;
        Direccion: string;
        ReferenciaUbicacion: string;
        EmpresaTrabaja: string;
        Cargo: string;
        Ingresos: number,
        TelefonoTitular: string; // Optional field for phone number of the titular
        InformeTitular: string; // Optional field for observations of the titular

        FechaVeriTitular: Date; // Optional field for the date of verification of the titular
        TelefonoNegocio: string; // Optional field for phone number of the business
        ContactoNegocio: string; // Optional field for contact of the business
        cargoNegocio: number; // Optional field for the position of the business
        InformeNegocio: string; // Optional field for observations of the business
        CargoFamiliares?: number; // Optional field for the position of family members
        AnalistaAprueba?: string; // Optional field for the analyst who approves the report
    };
    referencias?: Referencia[]; // Optional field for references
}

const styles: StyleDictionary = {
    header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 0],
        alignment: 'center',
    },
    subHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 5, 0, 5],
    },
}


export const phoneVerificationReport = (value: ReportValues): TDocumentDefinitions => {
    const { title, subtitle, data, referencias } = value;

    return {
        styles: styles,
        pageMargins: [40, 40, 40, 60],
        
        footer: (currentPage: number, pageCount: number) => footerSectionLeft(currentPage, pageCount, data.AnalistaAprueba),
  
        content: [
            /* TITULO */
            {
                text: title || 'Phone Verification Report',
                style: 'header',
            },


            // Aquí viene la tabla con bordes
            {
                style: 'tableExample',
                table: {

                    widths: [99, '*', 60, 70],
                    body: [
                        [
                            { text: 'Nombre:', bold: true, },
                            { text: data.Nombre, bold: true, alignment: 'left' },
                            { text: `N. Cedula:`, bold: true, alignment: 'left' },
                            { text: `${data.Cedula}`, bold: true, alignment: 'right' }

                        ],
                        [
                            { text: 'Dirección:', bold: true },
                            { text: data.Direccion, alignment: 'left' },
                            { text: 'Celular:', bold: true, alignment: 'left' },
                            { text: data.Celular, alignment: 'right' }
                        ],
                        [
                            { text: `Referencia Ubicación:\n\n${data.ReferenciaUbicacion.toUpperCase()}`, colSpan: 3, bold: true },
                            {}, {}, {}
                        ],
                        [
                            { text: 'Empresa Trabaja:', bold: true },
                            { text: data.EmpresaTrabaja.toUpperCase() },
                            {},
                            {}
                        ],
                        [
                            { text: 'Cargo::', bold: true },
                            { text: data.Cargo, },
                            { text: `Fecha:`, bold: true, alignment: 'left' },
                            { text: DateFormatter.getDDMMYYYY(data.Fecha), alignment: 'right' },

                        ],
                        [
                            { text: 'Ingresos:', bold: true },
                            { text: data.Ingresos },
                            { text: 'IESS:', bold: true, alignment: 'left' },
                            { text: data.Afiliacion, alignment: 'left' }
                        ],
                    ]
                },
                layout: {
                    hLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.body.length) ? 1 : 0;
                    },
                    vLineWidth: function (i: number, node: any) {
                        return (i === 0 || i === node.table.widths.length) ? 1 : 0;
                    },
                    hLineColor: () => '#000',
                    vLineColor: () => '#000',
                    paddingLeft: () => 5,
                    paddingRight: () => 5,
                    paddingTop: () => 4,
                    paddingBottom: () => 4,
                },
                margin: [0, 20, 0, 0]
            },
            // Línea horizontal debajo de la tabla
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0, // 515 es aproximadamente el ancho total de la página con márgenes estándar
                        lineWidth: 1,
                        lineColor: '#000000'
                    }
                ],
                margin: [0, 10, 0, 10] // Espaciado arriba y abajo
            },
            // referencia Domicilio negrita y subrayada
            {
                text: 'REFERENCIAS DOMICILIO',
                style: 'subHeader',
                decoration: 'underline',
            },

            // TABLA CON TELEFONO CONTACTO CARGO, ESTADO GESTION FECHA
            {
                style: 'tableExample',
                table: {
                    widths: [57, '*', 40, 90, 90],
                    body: [
                        [
                            { text: 'Teléfono', bold: true, alignment: 'left', fontSize: 10 },
                            { text: 'Contacto', bold: true, fontSize: 10 },
                            { text: 'Cargo', bold: true, fontSize: 10 },
                            { text: 'Estado de Gestión', bold: true, fontSize: 10 },
                            { text: 'Fecha', bold: true, fontSize: 10 }
                        ],
                        [
                            { text: data.TelefonoTitular, alignment: 'left', fontSize: 10 }, // Teléfono del titular
                            { text: data.Nombre, alignment: 'left', fontSize: 10 },
                            { text: 'CLIENTE', alignment: 'left', fontSize: 10 }, // Estado de gestión
                            { text: 'CONTACTADO', alignment: 'left', fontSize: 10 }, // Estado de gestión
                            { text: DateFormatterHour.getDDMMYYYYWithTime(data.FechaVeriTitular), alignment: 'left', fontSize: 9 }, // Fecha

                        ]
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        // Solo dibujar la línea debajo de la primera fila (índice 1)
                        return i === 1 ? 1 : 0;
                    },
                    vLineWidth: () => 0, // No dibujar líneas verticales
                    hLineColor: () => '#000',
                    paddingLeft: () => 5,
                    paddingRight: () => 5,
                    paddingTop: () => 4,
                    paddingBottom: () => 4,
                },
                margin: [0, 0, 0, 0]
            },
            // observacion o telefonica
            {
                text: data.InformeTitular ? ` ${data.InformeTitular}` : 'Observaciones: No hay observaciones', fontSize: 10,
            },
            // Línea horizontal debajo de la tabla
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0, // 515 es aproximadamente el ancho total de la página con márgenes estándar
                        lineWidth: 1,
                        lineColor: '#000000'
                    }
                ],
                margin: [0, 5, 0, 0] // Espaciado arriba y abajo
            },
            // Línea horizontal debajo de la tabla
            
            // Línea horizontal debajo de la tabla
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0, // 515 es aproximadamente el ancho total de la página con márgenes estándar
                        lineWidth: 1,
                        lineColor: '#000000'
                    }
                ],
                margin: [0, 10, 0, 0] // Espaciado arriba y abajo
            },
            {
                text: 'REFERENCIAS LABORALES',
                style: 'subHeader',
                decoration: 'underline',
            },

            // TABLA CON TELEFONO CONTACTO CARGO, ESTADO GESTION FECHA
            {
                style: 'tableExample',
                table: {
                    widths: [57, '*', 'auto', 90, 90],
                    body: [
                        [
                            { text: 'Teléfono', bold: true, alignment: 'left', fontSize: 10 },
                            { text: 'Contacto', bold: true, fontSize: 10 },
                            { text: 'Cargo', bold: true, fontSize: 10 },
                            { text: 'Estado de Gestión', bold: true, fontSize: 10 },
                            { text: 'Fecha', bold: true, fontSize: 10 }
                        ],
                        [
                            { text: data.TelefonoNegocio || '', alignment: 'left', fontSize: 10 }, // Teléfono del negocio
                            { text: data.ContactoNegocio || '', alignment: 'left', fontSize: 10 }, // Contacto del negocio
                            { text: getParentescoNombre(data.cargoNegocio) || '', alignment: 'left', fontSize: 10 }, // Cargo del negocio
                            { text: 'CONTACTADO', alignment: 'left', fontSize: 10 }, // Estado de gestión
                            { text: DateFormatterHour.getDDMMYYYYWithTime(data.FechaVeriTitular), alignment: 'left', fontSize: 9 }, // Fecha

                        ]
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        // Solo dibujar la línea debajo de la primera fila (índice 1)
                        return i === 1 ? 1 : 0;
                    },
                    vLineWidth: () => 0, // No dibujar líneas verticales
                    hLineColor: () => '#000',
                    paddingLeft: () => 5,
                    paddingRight: () => 5,
                    paddingTop: () => 4,
                    paddingBottom: () => 4,
                },
                margin: [0, 0, 0, 0]
            },
            // observacion o telefonica
            {
                text: data.InformeNegocio ? ` ${data.InformeNegocio}` : 'Observaciones: No hay observaciones',
                fontSize: 10,
            },
            // Línea horizontal debajo de la tabla
           
            // Línea horizontal debajo de la tabla
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0, // 515 es aproximadamente el ancho total de la página con márgenes estándar
                        lineWidth: 1,
                        lineColor: '#000000'
                    }
                ],
                margin: [0, 10, 0, 0] // Espaciado arriba y abajo
            },
            // Línea horizontal debajo de la tabla
            {
                canvas: [
                    {
                        type: 'line',
                        x1: 0, y1: 0,
                        x2: 515, y2: 0, // 515 es aproximadamente el ancho total de la página con márgenes estándar
                        lineWidth: 1,
                        lineColor: '#000000'
                    }
                ],
                margin: [0, 10, 0, 0] // Espaciado arriba y abajo
            },

            // Referencias section
            {
                text: 'REFERENCIAS PERSONALES, FAMILIARES',
                style: 'subHeader',
                decoration: 'underline',
            },

            // Tabla de referencias
            {
                style: 'tableExample',
                table: {
                    widths: [57, '*', 'auto', 90, 90],
                    body: [
                        [
                            { text: 'Teléfono', bold: true, alignment: 'left', fontSize: 10 },
                            { text: 'Contacto', bold: true, fontSize: 10 },
                            { text: 'Cargo', bold: true, fontSize: 10 },
                            { text: 'Estado de Gestión', bold: true, fontSize: 10 },
                            { text: 'Fecha', bold: true, fontSize: 10 }
                        ],
                        ...referencias.flatMap(ref => [
                            [
                                { text: ref.telefonoMaestro || '', alignment: 'left', fontSize: 10 },
                                { text: ref.observacionMaestro || '', alignment: 'left', fontSize: 10 },
                                { text: getParentescoNombre(ref.parentesco) || '', alignment: 'left', fontSize: 10 },
                                { text: 'CONTACTADO', alignment: 'left', fontSize: 10 },
                                { text: DateFormatterHour.getDDMMYYYYWithTime(ref.fechaVerificacion), alignment: 'left', fontSize: 9 }
                            ],
                            [
                                { text: `${ref.observacionesDetalle || ''}`, colSpan: 5, fontSize: 9, margin: [0, 0, 0, 5] },
                                {}, {}, {}, {}
                            ]
                        ])
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        // Dibuja la línea superior, las del encabezado y cada 2 filas de datos (pares después del header)
                        if (i === 0 || i === 1) return 1;
                        return i % 2 === 1 ? 1 : 0;
                    },
                    vLineWidth: () => 0, // sin líneas verticales
                    hLineColor: () => '#aaa',
                    paddingLeft: () => 5,
                    paddingRight: () => 5,
                    paddingTop: () => 4,
                    paddingBottom: () => 4,
                },
                margin: [0, 10, 0, 0]
            }


        ],
    };
}

