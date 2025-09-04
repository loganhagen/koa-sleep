export const formatMillisecondsToHoursMinutes = (ms: number): string => {
  if (ms < 0 || isNaN(ms)) {
    return "0h 0m";
  }
  const hours = Math.floor(ms / 3600000);
  const remainingMilliseconds = ms % 3600000;
  const minutes = Math.floor(remainingMilliseconds / 60000);
  return `${hours}h ${minutes}m`;
};

export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
