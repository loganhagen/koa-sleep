export const formatMillisecondsToHoursMinutes = (ms: bigint): string => {
  if (ms < 0n) {
    return "0h 0m";
  }

  const hours = ms / 3600000n;
  const remainingMilliseconds = ms % 3600000n;
  const minutes = remainingMilliseconds / 60000n;

  return `${hours}h ${minutes}m`;
};

export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
