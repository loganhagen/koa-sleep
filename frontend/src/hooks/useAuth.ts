import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/app/providers/userProvider";
import { ApiError, fetchAPI } from "@/services/apiClient";
import { User } from "@/types/api/user";

const fetchDemoUser = async (): Promise<User> => {
  const endpoint = `/users/demo`;
  return await fetchAPI<User>(endpoint);
};

export const useDemoLogin = () => {
  const router = useRouter();
  const { login } = useUser();

  return useMutation<User, Error>({
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
