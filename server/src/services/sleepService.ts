import { SleepData, SleepResponse, Sleep, Summary } from "../types/types";
import { millisecondsToHours, minutesToHours } from "../utils/utils";

let products = [{id:1, name: "example product"}];

export const fetchSleepData = async () => {
    return products;
};
