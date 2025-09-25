import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, fetchAPI } from "@/services/apiClient";
import { UserDTO } from "@/types/api/user";
import { useUser } from "@/providers/userProvider";

const loginUser = async (email: string): Promise<{ userId: string }> => {
  return await fetchAPI<{ userId: string }>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

const fetchCurrentUser = async (): Promise<UserDTO> => {
  const endpoint = `/user/me`;
  return await fetchAPI<UserDTO>(endpoint);
};

const performDemoLogin = async (): Promise<UserDTO> => {
  await loginUser("demo@koa");
  return await fetchCurrentUser();
};

export const useDemoLogin = () => {
  const router = useRouter();
  const { login } = useUser();

  return useMutation<UserDTO, Error>({
    mutationFn: performDemoLogin,
    onSuccess: (demoUser) => {
      login(demoUser);
      router.push("/home");
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        console.error(`API Error Status: ${error.status}`);
        console.error(`Error Code: ${error.errorBody.code}`);
        console.error(`Error Message: ${error.errorBody.message}`);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    },
  });
};

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
