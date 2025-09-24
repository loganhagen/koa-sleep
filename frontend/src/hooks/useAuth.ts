import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/app/providers/userProvider";
import { ApiError, fetchAPI } from "@/services/apiClient";
import { UserDTO } from "@/types/api/user";

const loginUser = async (email: string): Promise<{ userId: string }> => {
  return await fetchAPI<{ userId: string }>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

const fetchDemoUser = async (): Promise<UserDTO> => {
  const endpoint = `/user/demo%40koa`;
  return await fetchAPI<UserDTO>(endpoint);
};

export const useDemoLogin = () => {
  const router = useRouter();
  const { login } = useUser();

  return useMutation<UserDTO, Error>({
    mutationFn: fetchDemoUser,
    onSuccess: (demoUser) => {
      console.log(`Successfully fetched user ${demoUser.id}`);
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
