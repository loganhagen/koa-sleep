export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserAPIResponse {
  user: UserDTO;
}
