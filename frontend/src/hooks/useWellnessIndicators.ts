import { fetchAPI, isNotFoundError } from "@/services/apiClient";
import {
  BreathingRateLog,
  HrvLog,
  Spo2Log,
  TemperatureLog,
} from "@/types/api/wellness";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchWellnessIndicatorsByDate = async (userId: string, date: Date) => {
  const dateString = date.toISOString().split("T")[0];

  const temperaturePromise = fetchAPI<TemperatureLog>(
    `/users/${userId}/temperature/${dateString}`
  ).catch((err) => (isNotFoundError(err) ? null : Promise.reject(err)));

  const breathingRatePromise = fetchAPI<BreathingRateLog>(
    `/users/${userId}/breathing-rate/${dateString}`
  ).catch((err) => (isNotFoundError(err) ? null : Promise.reject(err)));

  const hrvPromise = fetchAPI<HrvLog>(
    `/users/${userId}/hrv/${dateString}`
  ).catch((err) => (isNotFoundError(err) ? null : Promise.reject(err)));

  const spo2Promise = fetchAPI<Spo2Log>(
    `/users/${userId}/spo2/${dateString}`
  ).catch((err) => (isNotFoundError(err) ? null : Promise.reject(err)));

  const [temperature, breathingRate, hrv, spo2] = await Promise.all([
    temperaturePromise,
    breathingRatePromise,
    hrvPromise,
    spo2Promise,
  ]);

  return { temperature, breathingRate, hrv, spo2 };
};

export const useWellnessIndicators = (
  userId: string | undefined,
  date: Date
) => {
  return useQuery({
    queryKey: ["wellnessIndicators", userId, date],
    queryFn: () => {
      return fetchWellnessIndicatorsByDate(userId!, date);
    },
    enabled: !!userId && !!date,
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
