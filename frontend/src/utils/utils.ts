export const formatHour = (hour: number): string => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour} ${ampm}`;
};

export const getWeekRange = (date: Date): string => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const startMonth = startOfWeek.toLocaleString("default", { month: "short" });
  const endMonth = endOfWeek.toLocaleString("default", { month: "short" });

  if (startMonth === endMonth) {
    return `${startMonth} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}`;
  } else {
    return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}`;
  }
};

export const formatDate = (oldDate: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(oldDate);
};

export const formatDateToYYYYMMDD = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().split("T")[0];
};

export const formatTimeTo12Hour = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "n/a";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const millisecondsToHours = (milliseconds: number): string => {
  if (!milliseconds || milliseconds <= 0) {
    return "";
  }

  const MILLISECONDS_IN_AN_HOUR = 3600000;
  return parseFloat(
    (milliseconds / MILLISECONDS_IN_AN_HOUR).toString()
  ).toFixed(2);
};
