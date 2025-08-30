import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/services/apiClient";
import { useDemo } from "@/app/providers/demoProvider";
import { UserDTO, UserAPIResponse } from "@/types/api/user";

const fetchUser = async (isDemo: boolean): Promise<UserDTO> => {
  if (isDemo) {
    const endpoint = `/users/demo`;
    const response = await fetchAPI<UserAPIResponse>(endpoint);
    return response.user;
  }

  return Promise.reject(new Error("Authentication not implemented."));
};

export const useUser = () => {
  const { isDemoMode } = useDemo();

  return useQuery({
    queryKey: ["user", { isDemoMode }],
    queryFn: () => fetchUser(isDemoMode),
    enabled: isDemoMode,
  });
};
