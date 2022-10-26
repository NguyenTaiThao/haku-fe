import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

export const safeParseISO = (str: string) => parseISO(str.replaceAll("/", "-"));

export const convertToDate = (date: string | Date) =>
  date instanceof Date ? date : safeParseISO(date);

export const formatShortDate = (date: Date | string) => {
  return `${convertToDate(date).getDate()} (${format(convertToDate(date), "E", {
    locale: ja,
  })})`;
};

export const formatFullDate = (date: Date | string) => {
  return format(convertToDate(date), "PPP", {
    locale: ja,
  });
};

export const formatISODate = (date: Date | string, separator = "-") =>
  format(convertToDate(date), ["yyyy", "MM", "dd"].join(separator));

export const formatDateTime = (date: Date | string) => {
  return format(convertToDate(date), "yyyy/MM/dd HH:mm:ss");
};
