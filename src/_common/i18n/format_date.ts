import * as moment from "moment";


// The data for the locale "en" is already contained in the moment core library.

const createFormat = (format: string) => (locale: string) => (date: string) =>
    moment(date).locale(locale).format(format);

const createFormatDate = createFormat("LL");
const createFormatFullDate = createFormat("LLL");
const createFormatTimeOfDay = createFormat("LT");

export {
    createFormatDate,
    createFormatFullDate,
    createFormatTimeOfDay
};

export default {
    createFormatDate,
    createFormatFullDate,
    createFormatTimeOfDay
};
