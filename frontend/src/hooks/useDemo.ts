import { fetchCurrentUser } from "@/providers/userProvider";
import { ApiError, fetchAPI } from "@/services/apiClient";
import { UserDTO } from "@/types/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const demoLogin = async () => {
  const res = await fetch("/api/demo/login");
};

const demoLogout = async () => {
  await fetchAPI("/demo/logout", { method: "POST" });
};

export const useDemoLogin = () => {
  return useMutation({
    mutationFn: demoLogin,
    onSuccess: () => {
      demoLogin();
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

export const useDemoLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: demoLogout,
    onSuccess: () => {
      demoLogout();
      router.push("/");
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed", error);
      demoLogout();
      router.push("/");
      queryClient.clear();
    },
  });
};
