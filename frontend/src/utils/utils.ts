export const formatHour = (hour: number): string => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour} ${ampm}`;
};

export const formatDateToYYYYMMDD = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().split("T")[0];
};

export const formatTimeTo12Hour = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const millisecondsToHoursAndMinutes = (
  milliseconds: number
): [number, number] => {
  const MILLISECONDS_IN_AN_HOUR = 3600000;
  const totalHours = milliseconds / MILLISECONDS_IN_AN_HOUR;
  const hours = Math.floor(totalHours);
  const remainingFractionOfHour = totalHours - hours;
  const minutes = Math.round(remainingFractionOfHour * 60);
  return [hours, minutes];
};
