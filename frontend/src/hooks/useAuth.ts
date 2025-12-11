// Custom hook which solely exists to talk to the API
// server for authentication purposes.

import { fetchAPI } from "@/services/apiClient";
import { UserDTO } from "@/types/api/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const fetchCurrentUser = async (): Promise<UserDTO> => {
  const endpoint = `/user/me`;
  return await fetchAPI<UserDTO>(endpoint);
};

export const useFetchCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: () => {
      return fetchCurrentUser();
    },
    retry: 0,
    placeholderData: keepPreviousData,
  });
};
