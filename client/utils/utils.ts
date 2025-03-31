export function minutesToHours(minutes: number): number {
  return Number((minutes / 60).toFixed(1));
}

export function millisecondsToHours(milliseconds: number): number {
  return Number((milliseconds / 3600000).toFixed(1));
}
