import { fetchAPI } from "@/services/apiClient";
import { User } from "@custom_types/backend/users";

export const fetchDemoUser = async () => {
  const response = await fetchAPI<User>("/users/demo");
  return response;
};
