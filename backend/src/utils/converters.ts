export function minutesToHours(minutes: number): number {
  return Number((minutes / 60).toFixed(1));
}

export function millisecondsToHours(milliseconds: number): number {
  return Number((milliseconds / 3600000).toFixed(1));
}

export const millisecondsToHHMM = (milliseconds: number): string => {
  if (milliseconds < 0) {
    return "0h 0m";
  }

  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export function timeToMs(time: string) {
  const [hms, ms] = time.split(".").map(Number);
  const [hrs, min, secs] = time.split(":").map(Number);
}

export const convertMinutesToHHMM = (minutes: number) => {
  const hoursPart = Math.floor(minutes / 60);
  const minutesPart = minutes % 60;

  return `${hoursPart}h ${minutesPart}m`;
};

export const isValidDateString = (dateString: string): boolean => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false;
  }

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const reconstructedDateString = `${year}-${String(month).padStart(
    2,
    "0"
  )}-${String(day).padStart(2, "0")}`;

  return dateString === reconstructedDateString;
};
