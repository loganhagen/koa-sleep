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
