// Custom hook which solely exists to talk to the API
// server for authentication purposes.

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, fetchAPI } from "@/services/apiClient";
import { UserDTO } from "@/types/api/user";
import { useUser } from "@/providers/userProvider";

const logoutUser = async () => {
  return await fetchAPI("/auth/logout", { method: "POST" });
};

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      router.push("/");
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed", error);
      logout();
      router.push("/");
      queryClient.clear();
    },
  });
};
