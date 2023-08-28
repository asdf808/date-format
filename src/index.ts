interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
}

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  const padDate = (date: string | number, length = 2) => {
    return isPad ? date.toString().padStart(length, "0") : date.toString();
  };

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const dataValue = {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
  const dateStr = {
    yyyy: padDate(year, 4),
    MM: padDate(month),
    dd: padDate(day),
    hh: padDate(hour),
    mm: padDate(minute),
    ss: padDate(second),
  };
  if (formatter === "date") {
    return `${dateStr.yyyy}-${dateStr.MM}-${dateStr.dd}`;
  }
  if (formatter === "datetime") {
    return `${dateStr.yyyy}-${dateStr.MM}-${dateStr.dd} ${dateStr.hh}:${dateStr.mm}:${dateStr.ss}`;
  }
  if (typeof formatter === "string") {
    return Object.keys(dateStr).reduce((result, key) => {
      return result.replace(key, dateStr[key as keyof typeof dateStr]);
    }, formatter);
  }
  if (typeof formatter === "function") {
    return formatter({ ...dataValue, ...dateStr });
  }
  return "";
}
