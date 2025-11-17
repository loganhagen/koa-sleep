import { ApiError, fetchAPI } from "@/services/apiClient";
import { UserDTO } from "@/types/api/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
