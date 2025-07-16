import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/Point.png',
    width: 100,
    height: 25,
    //alignment: 'center',
    margin: [25, 20, 0, 20],
};

const currentDate: Content = {
    text: DateFormatter.getDDMMYYYY(new Date()),
    alignment: 'right',
    margin: [20, 40],
    width: 150,
}

interface HeaderSectionOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = (options: HeaderSectionOptions): Content => {

    const { title, subtitle, showLogo = true, showDate = true } = options;
    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ? currentDate : null;
    const headerSubtitle: Content = subtitle ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
            fontSize: 16,
            bold: true,
        },
    } : null;

    const headerTitle: Content = title ? {
        stack: [{
            text: title,
            alignment: 'center',
            margin: [0, 20, 20, 0],
            style: {
                fontSize: 20,
                bold: true,
            },
        },
        headerSubtitle,
        ],
    } : null;



    return {
        columns: [headerLogo, headerTitle]
    };
}