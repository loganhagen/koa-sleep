export const formatHour = (hour: number) => {
  const h = Math.floor(hour);
  const suffix = h >= 12 ? "PM" : "AM";
  const formattedHour = ((h + 11) % 12) + 1;
  return `${formattedHour} ${suffix}`;
};

export const getWeekRange = (date: Date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1);
  start.setDate(diff);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
};
