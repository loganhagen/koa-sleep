import { SleepData } from "../../../types/UI/sleep";
import { Sleep, SleepResponse } from "../../../types/API/sleep";

export const fetchSleepData = async () => {
  try {
    const res = await fetch("http://localhost:3001/sleep-endpoint");
    if (!res) {
      throw new Error("Failed to fetch from endpoint.");
    }
    const data = (await res.json()) as SleepResponse;
    return createSleepDataUI(data);
  } catch (error) {
    return error;
  }
};

const createSleepDataUI = (sleepResponse: SleepResponse): SleepData => {
  const data = sleepResponse.sleep[0] as Sleep;
  return {
    duration: data.duration,
    efficiency: 0,
    wake: 0,
    light: 0,
    deep: 0,
  };
};
