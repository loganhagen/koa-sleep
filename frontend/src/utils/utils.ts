export const formatHour = (hour: number): string => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour} ${ampm}`;
};

export const formatTimeTo12Hour = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const formatMillisecondsToHoursMinutes = (ms: number): string => {
  if (ms < 0 || isNaN(ms)) {
    return "0h 0m";
  }
  const hours = Math.floor(ms / 3600000);
  const remainingMilliseconds = ms % 3600000;
  const minutes = Math.floor(remainingMilliseconds / 60000);
  return `${hours}h ${minutes}m`;
};
