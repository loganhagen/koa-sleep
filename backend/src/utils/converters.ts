export function minutesToHours(minutes: number): number {
  return Number((minutes / 60).toFixed(1));
}

export function millisecondsToHours(milliseconds: number): number {
  return Number((milliseconds / 3600000).toFixed(1));
}

export function timeToMs(time: string) {
  const [hms, ms] = time.split(".").map(Number);
  const [hrs, min, secs] = time.split(":").map(Number);
}

export const convertMinutesToHHMM = (minutes: number) => {
  const hoursPart = Math.floor(minutes / 60);
  const minutesPart = minutes % 60;

  return `${hoursPart}h ${minutesPart}m`;
};
