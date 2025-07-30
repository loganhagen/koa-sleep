export const formatHour = (hour: number) => {
  const h = Math.floor(hour);
  const suffix = h >= 12 ? "PM" : "AM";
  const formattedHour = ((h + 11) % 12) + 1;
  return `${formattedHour} ${suffix}`;
};
