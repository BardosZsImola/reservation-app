import { DateFormatProps } from "@blueprintjs/datetime";
import moment from "moment";

export const minHour = (): Date => {
  let date = new Date();
  date.setHours(12, 0, 0);
  return date;
}

export const maxHour = (): Date => {
  let date = new Date();
  date.setHours(21, 0, 0);
  return date;
}

export function getMomentFormatter(format: string): DateFormatProps {
  return {
      formatDate: (date) => moment(date).format(format),
      parseDate: (str) => moment(str, format).toDate(),
      placeholder: format,
  }
};

export const specialDateFormat = (date: Date): string => {
  return moment(date).format('YYYY/MM/DD HH:mm');
}