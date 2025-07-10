import { options } from "joi";
import type { TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportOptions {
    name: string;
}

export const getHelloWorldReport = (options:ReportOptions ): TDocumentDefinitions => {

    const { name } = options;
    const docDefinition: TDocumentDefinitions = {
        
    content: [ `Hola Mundo ${name}` ],
    };
    return docDefinition;
};