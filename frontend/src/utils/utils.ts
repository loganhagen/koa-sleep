import { UserDTO } from "@/types/api/user";

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
