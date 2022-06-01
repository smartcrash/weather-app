
export const isUndefined = (o: any): o is undefined => o === undefined

export const isEmpty = <T extends { length: number }>(o: T) => o.length === 0

/**
 * Change the timezone of a given date
 * @param date
 * @param timezoneOffset Timezone offset in sesconds
 * @returns {Date}
 */
export const toZonedTime = (date: Date, timezoneOffset: number): Date => {
  const dt = new Date(date.valueOf());

  dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
  dt.setSeconds(dt.getSeconds() + timezoneOffset);

  return dt;
};
