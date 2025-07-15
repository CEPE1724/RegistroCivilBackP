import { Content, ContextPageSize } from "pdfmake/interfaces";


export const footerSection = (currentPage: number, pageCount: number, pageSize: ContextPageSize): Content => {
    return {
        text: `Page ${currentPage} of ${pageCount}`,
        alignment: 'right',
        fontSize: 12,
        bold: true,
        margin: [0, 15, 35, 0],
    };
}





export const footerSectionLeft = (currentPage: number, pageCount: number, Verificado: string): Content => {
  const currentDate = new Date().toLocaleString('es-EC', {
    timeZone: 'America/Guayaquil',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return {
    table: {
      widths: ['auto', '*', 'auto'],
      body: [
        [
          { text: ` ${currentPage}`, fontSize: 9, alignment: 'left' },
          { text: `Verificado por:  ${Verificado}`, fontSize: 9, alignment: 'center' },
          { text: `Fecha de Impresión: ${currentDate}`, fontSize: 9, alignment: 'center' },
          
        ]
      ]
    },
    layout: 'noBorders',
    margin: [40, 10, 40, 0]
  };
};
